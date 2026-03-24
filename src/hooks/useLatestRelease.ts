import { useEffect, useState } from "react";

const RELEASES_API_URL = "https://api.github.com/repos/LettuceAI/app/releases?per_page=40";

export type ReleaseChannel = "release" | "dev";
export type ReleaseFamily = "android" | "desktop";

export interface PlatformDownloads {
  android?: string;
  windows?: {
    cpu?: string;
    cuda?: string;
    vulkan?: string;
  };
  linux?: {
    cpu?: string;
    cuda?: string;
    vulkan?: string;
  };
  macos?: {
    cpu?: string;
    metal?: string;
  };
}

export interface ReleaseInfo {
  version: string;
  tag: string;
  isPrerelease: boolean;
  publishedAt: string;
  downloads: PlatformDownloads;
  releaseUrl: string;
  loading: boolean;
  error: string | null;
}

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type GitHubRelease = {
  tag_name: string;
  prerelease: boolean;
  draft: boolean;
  published_at: string;
  assets: ReleaseAsset[];
  html_url: string;
};

const EMPTY_RELEASE: ReleaseInfo = {
  version: "",
  tag: "",
  isPrerelease: false,
  publishedAt: "",
  downloads: {},
  releaseUrl: "",
  loading: true,
  error: null,
};

function getPrefix(family: ReleaseFamily, channel: ReleaseChannel): string {
  return `${family}-${channel}-`;
}

function parseVersion(tag: string, family: ReleaseFamily, channel: ReleaseChannel): string {
  const prefix = getPrefix(family, channel);
  if (!tag.startsWith(prefix)) return tag;

  const payload = tag.slice(prefix.length);
  if (channel === "dev") {
    const match = payload.match(/^(\d+)-(\d+)-([a-z0-9]+)$/i);
    if (!match) return payload;
    return `0.1.${match[1]}-dev.${match[3]}`;
  }

  return payload;
}

function scoreTag(tag: string, family: ReleaseFamily, channel: ReleaseChannel): number[] | null {
  const prefix = getPrefix(family, channel);
  if (!tag.startsWith(prefix)) return null;

  const payload = tag.slice(prefix.length);
  if (channel === "dev") {
    const match = payload.match(/^(\d+)-(\d+)-([a-z0-9]+)$/i);
    if (!match) return null;
    return [Number.parseInt(match[1], 10), Number.parseInt(match[2], 10)];
  }

  const match = payload.match(/^\d+(?:\.\d+){2,3}$/);
  if (!match) return null;
  return payload.split(".").map((segment) => Number.parseInt(segment, 10));
}

function compareScore(left: number[], right: number[]): number {
  const size = Math.max(left.length, right.length);
  for (let index = 0; index < size; index += 1) {
    const leftPart = left[index] ?? 0;
    const rightPart = right[index] ?? 0;
    if (leftPart > rightPart) return 1;
    if (leftPart < rightPart) return -1;
  }
  return 0;
}

function mapAssets(assets: ReleaseAsset[]): PlatformDownloads {
  const downloads: PlatformDownloads = {};

  for (const asset of assets) {
    const name = asset.name.toLowerCase();

    if (name.endsWith(".apk")) {
      downloads.android = asset.browser_download_url;
      continue;
    }

    if (name === "windows-cpu.zip") {
      downloads.windows ??= {};
      downloads.windows.cpu = asset.browser_download_url;
      continue;
    }

    if (name === "windows-cuda.zip") {
      downloads.windows ??= {};
      downloads.windows.cuda = asset.browser_download_url;
      continue;
    }

    if (name === "windows-vulkan.zip") {
      downloads.windows ??= {};
      downloads.windows.vulkan = asset.browser_download_url;
      continue;
    }

    if (name === "linux-cpu.zip") {
      downloads.linux ??= {};
      downloads.linux.cpu = asset.browser_download_url;
      continue;
    }

    if (name === "linux-cuda.zip") {
      downloads.linux ??= {};
      downloads.linux.cuda = asset.browser_download_url;
      continue;
    }

    if (name === "linux-vulkan.zip") {
      downloads.linux ??= {};
      downloads.linux.vulkan = asset.browser_download_url;
      continue;
    }

    if (name === "macos-cpu.dmg") {
      downloads.macos ??= {};
      downloads.macos.cpu = asset.browser_download_url;
      continue;
    }

    if (name === "macos-metal.dmg") {
      downloads.macos ??= {};
      downloads.macos.metal = asset.browser_download_url;
    }
  }

  return downloads;
}

function hasFamilyDownloads(downloads: PlatformDownloads, family: ReleaseFamily): boolean {
  if (family === "android") return typeof downloads.android === "string";
  return Boolean(
    downloads.windows?.cpu ||
      downloads.windows?.cuda ||
      downloads.windows?.vulkan ||
      downloads.linux?.cpu ||
      downloads.linux?.cuda ||
      downloads.linux?.vulkan ||
      downloads.macos?.cpu ||
      downloads.macos?.metal,
  );
}

export function useLatestRelease(options?: {
  family?: ReleaseFamily;
  channel?: ReleaseChannel;
  releaseTag?: string;
}): ReleaseInfo {
  const family = options?.family ?? "desktop";
  const channel = options?.channel ?? "release";
  const releaseTag = options?.releaseTag?.trim() || undefined;
  const [release, setRelease] = useState<ReleaseInfo>(EMPTY_RELEASE);

  useEffect(() => {
    let cancelled = false;

    async function fetchRelease() {
      try {
        const response = await fetch(RELEASES_API_URL, {
          headers: { Accept: "application/vnd.github+json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch releases");
        }

        const releases: GitHubRelease[] = await response.json();
        const candidates = releases.filter((entry) => {
          if (entry.draft) return false;
          return channel === "dev" ? entry.prerelease : !entry.prerelease;
        });

        let selected: GitHubRelease | undefined;
        if (releaseTag) {
          selected = candidates.find((entry) => entry.tag_name === releaseTag);
        }

        if (!selected) {
          let bestScore: number[] | null = null;
          for (const candidate of candidates) {
            const score = scoreTag(candidate.tag_name, family, channel);
            if (!score) continue;

            const downloads = mapAssets(candidate.assets ?? []);
            if (!hasFamilyDownloads(downloads, family)) continue;

            if (!bestScore || compareScore(score, bestScore) > 0) {
              bestScore = score;
              selected = candidate;
            }
          }
        }

        if (!selected) {
          throw new Error("No matching release found");
        }

        const downloads = mapAssets(selected.assets ?? []);
        if (!hasFamilyDownloads(downloads, family)) {
          throw new Error("Matching release has no downloadable assets");
        }

        if (!cancelled) {
          setRelease({
            version: parseVersion(selected.tag_name, family, channel),
            tag: selected.tag_name,
            isPrerelease: selected.prerelease,
            publishedAt: selected.published_at,
            downloads,
            releaseUrl: selected.html_url,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setRelease({
            ...EMPTY_RELEASE,
            loading: false,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }
    }

    void fetchRelease();

    return () => {
      cancelled = true;
    };
  }, [channel, family, releaseTag]);

  return release;
}
