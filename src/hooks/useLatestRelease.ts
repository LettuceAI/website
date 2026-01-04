import { useState } from "react";

interface PlatformDownloads {
  android?: string;
  windows?: {
    msi?: string;
    exe?: string;
  };
  linux?: {
    appImage?: string;
    rpm?: string;
    deb?: string;
  };
}

interface ReleaseInfo {
  version: string;
  isPrerelease: boolean;
  publishedAt: string;
  downloads: PlatformDownloads;
  releaseUrl: string;
  loading: boolean;
  error: string | null;
}
/*
interface ReleaseAsset {
    name: string;
    browser_download_url: string;
    size: number;
}


interface GitHubRelease {
    tag_name: string;
    name: string;
    prerelease: boolean;
    published_at: string;
    assets: ReleaseAsset[];
    html_url: string;
}*/

export function useLatestRelease(): ReleaseInfo {
  const [release] = useState<ReleaseInfo>({
    version: "v1.0.0",
    isPrerelease: false,
    publishedAt: "2026-01-04T20:11:00Z",
    downloads: {
      android:
        "https://github.com/LettuceAI/mobile-app/releases/download/1.0.0/lettuceai-1-0-1-android.apk",
      windows: {
        exe: "https://github.com/LettuceAI/mobile-app/releases/download/1.0.0/lettuceai_1.0.0-beta-2_x64_en-US.exe",
        msi: "https://github.com/LettuceAI/mobile-app/releases/download/1.0.0/lettuceai_1.0.0-beta-2_x64_en-US.msi",
      },
      linux: {
        deb: "https://github.com/LettuceAI/mobile-app/releases/download/1.0.0/lettuceai_1.0.0-beta-2_amd64.deb",
        rpm: "https://github.com/LettuceAI/mobile-app/releases/download/1.0.0/lettuceai_1.0.0-beta-2.x86_64.rpm",
      },
    },
    releaseUrl: "https://github.com/LettuceAI/mobile-app/releases/tag/1.0.0",
    loading: false,
    error: null,
  });

  return release;
}

/*export function useLatestRelease(owner: string, repo: string): ReleaseInfo {
    const [release, setRelease] = useState<ReleaseInfo>({
        version: "",
        isPrerelease: false,
        publishedAt: "",
        downloads: {},
        releaseUrl: "",
        loading: true,
        error: null,
    });

    useEffect(() => {
        async function fetchRelease() {
            try {
                const response = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}/releases`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch releases");
                }

                const releases: GitHubRelease[] = await response.json();

                if (releases.length === 0) {
                    throw new Error("No releases found");
                }

                const latest = releases[0];

                const downloads: PlatformDownloads = {};

                for (const asset of latest.assets) {
                    const name = asset.name.toLowerCase();

                    // Android
                    if (name.endsWith(".apk")) {
                        downloads.android = asset.browser_download_url;
                    }

                    // Windows
                    if (name.endsWith(".msi")) {
                        downloads.windows ??= {};
                        downloads.windows.msi = asset.browser_download_url;
                    } else if (name.endsWith(".exe")) {
                        downloads.windows ??= {};
                        downloads.windows.exe = asset.browser_download_url;
                    }

                    // Linux
                    if (name.endsWith(".appimage")) {
                        downloads.linux ??= {};
                        downloads.linux.appImage = asset.browser_download_url;
                    } else if (name.endsWith(".rpm")) {
                        downloads.linux ??= {};
                        downloads.linux.rpm = asset.browser_download_url;
                    } else if (name.endsWith(".deb")) {
                        downloads.linux ??= {};
                        downloads.linux.deb = asset.browser_download_url;
                    }
                }

                setRelease({
                    version: latest.tag_name,
                    isPrerelease: latest.prerelease,
                    publishedAt: latest.published_at,
                    downloads,
                    releaseUrl: latest.html_url,
                    loading: false,
                    error: null,
                });
            } catch (err) {
                setRelease({
                    version: "",
                    isPrerelease: false,
                    publishedAt: "",
                    downloads: {},
                    releaseUrl: "",
                    loading: false,
                    error: err instanceof Error ? err.message : "Unknown error",
                });
            }
        }

        fetchRelease();
    }, [owner, repo]);

    return release;
}
*/
