'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FramerWrapper from '@/components/animation/FramerWrapper';
import Heading from '@/components/Heading';
import { Badge } from '@/components/ui/badge';
import { FolderGit2 } from 'lucide-react';
import type { Project } from '@/lib/github';
import ProjectCard from "@/components/ui/projectCard";
import ProjectModal from "@/components/ui/projectModal";

interface Props { initialProjects: Project[] }

export default function ProjectsGrid({ initialProjects }: Props) {
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <div className="relative flex flex-col items-start gap-6 overflow-hidden">
            {/* título */}
            <Badge variant="secondary" className="gap-1.5 py-1 text-sm sm:text-base">
                <FolderGit2 className="h-4 w-4" />
                Projetos
            </Badge>

            <Heading>Alguns Trabalhos Recentes 🚀</Heading>

            {/* grid */}
            <FramerWrapper y={100} delay={0.3} className="grid gap-6 sm:grid-cols-2">
                {initialProjects.map((p) => (
                    <ProjectCard key={p.slug} project={p} onOpen={setSelected} />
                ))}
            </FramerWrapper>

            {/* modal com animação de saída */}
            <AnimatePresence>
                {selected && (
                    <ProjectModal
                        key={selected.slug}
                        project={selected}
                        onClose={() => setSelected(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}