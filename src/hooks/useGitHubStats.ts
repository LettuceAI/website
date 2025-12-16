import { useState, useEffect } from 'react';

interface GitHubStats {
    stars: number;
    commits: number;
    loading: boolean;
    error: string | null;
}

export function useGitHubStats(owner: string, repo: string): GitHubStats {
    const [stats, setStats] = useState<GitHubStats>({
        stars: 0,
        commits: 0,
        loading: true,
        error: null,
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const repoResponse = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}`
                );

                if (!repoResponse.ok) {
                    throw new Error('Failed to fetch repo data');
                }

                const repoData = await repoResponse.json();

                const commitsResponse = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`
                );

                let commitCount = 0;

                if (commitsResponse.ok) {
                    const linkHeader = commitsResponse.headers.get('Link');
                    if (linkHeader) {
                        const match = linkHeader.match(/page=(\d+)>; rel="last"/);
                        if (match) {
                            commitCount = parseInt(match[1], 10);
                        }
                    }
                }

                setStats({
                    stars: repoData.stargazers_count || 0,
                    commits: commitCount,
                    loading: false,
                    error: null,
                });
            } catch (err) {
                setStats({
                    stars: 0,
                    commits: 0,
                    loading: false,
                    error: err instanceof Error ? err.message : 'Unknown error',
                });
            }
        }

        fetchStats();
    }, [owner, repo]);

    return stats;
}
