'use client';

import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, X } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/github';

interface Props {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
    if (!project) return null;

    return (
        <Dialog open static onClose={onClose} className="fixed inset-0 z-[100]">
            {/* overlay com fade */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="min-h-screen flex items-center justify-center bg-black/60 p-4"
            >
                {/* painel com slide-up + scale */}
                <motion.div
                    initial={{ y: 60, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 60, opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="w-full max-w-3xl rounded-lg bg-white shadow-xl overflow-hidden"
                >
                    {/* header */}
                    <div className="relative">
                        <Image
                            src={project.cover}
                            alt={project.name}
                            width={1200}
                            height={600}
                            className="object-cover w-full h-56 sm:h-72"
                            priority
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 rounded-full bg-white p-1 shadow"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* body */}
                    <div className="p-6 flex flex-col gap-4">
                        <Dialog.Title className="text-2xl font-bold">
                            {project.name}
                        </Dialog.Title>

                        <p className="text-neutral-700 leading-relaxed">
                            {project.description}
                        </p>

                        {project.repo && (
                            <Link
                                href={project.repo}
                                target="_blank"
                                className="inline-flex items-center gap-2 text-primary underline"
                            >
                                <Github size={18} />
                                Ver no GitHub
                            </Link>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </Dialog>
    );
}