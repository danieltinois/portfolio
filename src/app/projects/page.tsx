import { fetchPortfolioRepos } from '@/lib/github';
import ProjectsGrid from "@/components/ProjectsGrid";

export const revalidate = 3600;

export default async function Projects() {
    const projects = await fetchPortfolioRepos();
    return <ProjectsGrid initialProjects={projects} />;
}