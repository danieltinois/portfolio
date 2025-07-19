"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import {Project} from "@/lib/github";



interface Props {
    project: Project;
    onOpen?: (p: Project) => void;
}

export default function ProjectCard({ project, onOpen }: Props) {
    return (
        <motion.div
            whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
            transition={{ type: 'spring', stiffness: 250, damping: 18 }}
            className="group flex flex-col rounded-xl bg-gray-50 shadow-md cursor-pointer overflow-hidden"
            onClick={() => onOpen?.(project)}
        >
            <Image
                src={project.cover}
                alt={project.name}
                width={800}
                height={450}
                className="aspect-video object-cover transition group-hover:scale-105"
            />

            <div className="flex-1 p-4 flex flex-col gap-2">
                <h3 className="font-rubik text-xl font-semibold text-primary">
                    {project.name}
                </h3>
                <p className="text-sm line-clamp-3">{project.description}</p>

                <ul className="flex flex-wrap gap-2 pt-2">
                    {project.techs.map((t) => (
                        <li
                            key={t}
                            className="rounded bg-gray-200 px-2 py-0.5 text-xs font-medium"
                        >
                            {t}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto flex gap-3 pt-4">
                    {project.repo && (
                        <Link
                            href={project.repo}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 text-sm hover:text-primary"
                        >
                            <Github size={18} />
                            Repo
                        </Link>
                    )}
                    {project.demo && (
                        <Link
                            href={project.demo}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 text-sm hover:text-primary"
                        >
                            <ExternalLink size={18} />
                            Demo
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
}