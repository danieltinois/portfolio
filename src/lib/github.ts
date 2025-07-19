import { Octokit } from 'octokit';

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: 'portfolio-fetch',
});

export interface Project {
    slug: string;
    name: string;
    description: string;
    techs: string[];
    repo: string;
    demo?: string;
    cover: string;
}

export async function fetchPortfolioRepos(): Promise<Project[]> {
    const username = process.env.GITHUB_USERNAME!;
    const res = await octokit.request('GET /users/{username}/repos', {
        username,
        per_page: 100,
        mediaType: { previews: ['mercy-preview'] },
    });

    return res.data
        .map((r) => {
            const topics: string[] = (r as any).topics ?? [];
            if (!topics.includes('portfolio')) return null;
            const og = (r as any).open_graph_image_url as string | undefined;

            return {
                slug: r.name,
                name: r.name.replace(/-/g, ' '),
                description: r.description ?? '',
                techs: topics.filter((t) => t !== 'portfolio'),
                repo: r.html_url,
                demo: r.homepage || undefined,
                cover: og ?? '/projects/placeholder.png',
            };
        })
        .filter(Boolean) as Project[];
}