import { fetchPortfolioRepos } from '@/lib/github';
import ProjectsGrid from "@/components/ProjectsGrid";

export const revalidate = 60 * 60;

export default async function Projects() {
    const projects = await fetchPortfolioRepos();
    return <ProjectsGrid initialProjects={projects} />;
}