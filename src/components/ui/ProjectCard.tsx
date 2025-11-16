'use client';

import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        description: string;
        tags: string[];
        image?: string;
        github?: string;
        live?: string;
    };
    featured: boolean;
}

export default function ProjectCard({ project, featured }: ProjectCardProps) {
    const [isHovering, setIsHovering] = useState(false);

    if (featured) {
        return (
            <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group relative overflow-hidden rounded-2xl"
            >
                {/* Background Image Container */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-900 rounded-2xl">
                    {project.image && (
                        <img
                            src={project.image}
                            alt={project.title}
                            className={clsx(
                                'h-full w-full object-cover transition-transform duration-700',
                                isHovering ? 'scale-110' : 'scale-100'
                            )}
                        />
                    )}

                    {/* Overlay */}
                    <div
                        className={clsx(
                            'absolute inset-0 transition-all duration-500',
                            isHovering
                                ? 'bg-black/40'
                                : 'bg-gradient-to-t from-black via-black/50 to-transparent'
                        )}
                    />

                    {/* Border light accent */}
                    <div className="absolute inset-0 border border-neutral-700/0 transition-colors duration-500 group-hover:border-neutral-600/50" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                    <div />
                    <div className="space-y-3 sm:space-y-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <h3
                                className={clsx(
                                    'text-2xl sm:text-3xl font-bold text-white transition-all duration-500',
                                    isHovering ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-100'
                                )}
                            >
                                {project.title}
                            </h3>
                        </div>

                        {/* Description */}
                        <p
                            className={clsx(
                                'text-sm leading-relaxed text-neutral-300 transition-all duration-500',
                                'max-h-0 overflow-hidden', // Menghilangkan deskripsi saat tidak hover
                                isHovering ? 'max-h-20 opacity-100' : 'opacity-0'
                            )}
                        >
                            {project.description}
                        </p>

                        {/* Tags and Links */}
                        <div
                            className={clsx(
                                'flex items-end justify-between transition-all duration-500',
                                isHovering ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            )}
                        >
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 3).map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-block rounded-full border border-neutral-600/50 bg-neutral-900/60 px-2.5 py-1 text-xs font-medium text-neutral-300 backdrop-blur-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action Links */}
                            <div className="flex gap-3">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/link flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/60 transition-all duration-300 hover:border-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/20"
                                        aria-label="GitHub"
                                    >
                                        <Github
                                            size={18}
                                            className="text-neutral-300 transition-colors duration-300 group-hover/link:text-white"
                                        />
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/link flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/60 transition-all duration-300 hover:border-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/20"
                                        aria-label="Live Project"
                                    >
                                        <ExternalLink
                                            size={18}
                                            className="text-neutral-300 transition-colors duration-300 group-hover/link:text-white"
                                        />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Regular card (non-featured)
    return (
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-neutral-800/50 transition-all duration-300 hover:border-neutral-700 h-full flex flex-col"
        >
            {/* Image Container */}
            {project.image && (
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900 rounded-t-2xl">
                    <img
                        src={project.image}
                        alt={project.title}
                        className={clsx(
                            'w-full h-full object-cover transition-transform duration-700',
                            isHovering ? 'scale-105' : 'scale-100'
                        )}
                    />
                    <div
                        className={clsx(
                            'absolute inset-0 transition-all duration-500',
                            isHovering ? 'bg-black/20' : 'bg-black/40'
                        )}
                    />
                </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
                <div className="space-y-3">
                    <h3
                        className={clsx(
                            'text-2xl font-bold transition-colors duration-300',
                            isHovering ? 'text-blue-300' : 'text-white'
                        )}
                    >
                        {project.title}
                    </h3>
                    <p
                        className={clsx(
                            'text-sm leading-relaxed transition-colors duration-300',
                            isHovering ? 'text-neutral-300' : 'text-neutral-400'
                        )}
                    >
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                            key={idx}
                            className={clsx(
                                'inline-block rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 border',
                                isHovering
                                    ? 'border-neutral-600/80 bg-neutral-800/60 text-neutral-200'
                                    : 'border-neutral-700/50 bg-neutral-900/50 text-neutral-400'
                            )}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-neutral-800/50 mt-auto">
                    <span className="text-xs text-neutral-500">View Project:</span>
                    <div className="flex gap-3 ml-auto">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/50 transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <Github
                                    size={14}
                                    className="text-neutral-400 group-hover/link:text-neutral-200"
                                />
                            </a>
                        )}
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800/50 transition-all duration-300"
                                aria-label="Live Project"
                            >
                                <ExternalLink
                                    size={14}
                                    className="text-neutral-400 group-hover/link:text-neutral-200"
                                />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div
                className={clsx(
                    'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 rounded-2xl',
                    isHovering && 'opacity-100'
                )}
                style={{
                    background:
                        'radial-gradient(circle at top right, rgba(59, 130, 246, 0.08), transparent 70%)',
                }}
            />
        </div>
    );
}