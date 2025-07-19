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
        mediaType: { previews: ['mercy-preview'] }, // para vir topics
    });

    return res.data
        .filter((r) => r.topics?.includes('portfolio'))
        .map((r) => {
            const og = (r as any).open_graph_image_url as string | undefined; // 1️⃣
            const rawCover = `https://raw.githubusercontent.com/${username}/${r.name}/main/cover.png`; // 2️⃣
            const localCover = `/projects/${r.name}.png`; // 3️⃣
            const placeholder = '/projects/placeholder.png'; // 4️⃣

            return {
                slug: r.name,
                name: r.name.replace(/-/g, ' '),
                description: r.description ?? '',
                techs: r.topics.filter((t) => t !== 'portfolio'),
                repo: r.html_url,
                demo: r.homepage || undefined,
                cover: og || rawCover || localCover || placeholder,
            };
        });
}