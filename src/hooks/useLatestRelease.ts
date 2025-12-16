import { useState, useEffect } from 'react';

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
}

interface ReleaseInfo {
    version: string;
    isPrerelease: boolean;
    publishedAt: string;
    downloadUrl: string | null;
    releaseUrl: string;
    loading: boolean;
    error: string | null;
}

export function useLatestRelease(owner: string, repo: string): ReleaseInfo {
    const [release, setRelease] = useState<ReleaseInfo>({
        version: '',
        isPrerelease: false,
        publishedAt: '',
        downloadUrl: null,
        releaseUrl: '',
        loading: true,
        error: null,
    });

    useEffect(() => {
        async function fetchRelease() {
            try {
                // Fetch all releases (includes pre-releases)
                const response = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}/releases`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch releases');
                }

                const releases: GitHubRelease[] = await response.json();

                if (releases.length === 0) {
                    throw new Error('No releases found');
                }

                // Get the latest release (first in the list)
                const latest = releases[0];

                // Find APK asset
                const apkAsset = latest.assets.find(
                    (asset) => asset.name.endsWith('.apk')
                );

                setRelease({
                    version: latest.tag_name,
                    isPrerelease: latest.prerelease,
                    publishedAt: latest.published_at,
                    downloadUrl: apkAsset?.browser_download_url || null,
                    releaseUrl: latest.html_url,
                    loading: false,
                    error: null,
                });
            } catch (err) {
                setRelease({
                    version: '',
                    isPrerelease: false,
                    publishedAt: '',
                    downloadUrl: null,
                    releaseUrl: '',
                    loading: false,
                    error: err instanceof Error ? err.message : 'Unknown error',
                });
            }
        }

        fetchRelease();
    }, [owner, repo]);

    return release;
}
