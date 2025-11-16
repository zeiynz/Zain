'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from '@/components/ui/ProjectCard';
import clsx from 'clsx';

interface Project {
    id: string;
    title: string;
    description: string;
    featured?: boolean;
    tags: string[];
    image?: string;
    github?: string;
    live?: string;
}

const FEATURED_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'Lazain Bleu',
        description: 'Lazain Bleu is a modern full-stack e-commerce platform built for premium brands. It’s fast, scalable, and designed for long-term maintainability.',
        featured: true,
        tags: ['TypeScript', 'Next.js', 'Tailwind CSS'],
        image: '/assets/lazainbleu.png',
        github: 'https://github.com/lazainbleu',
        live: 'https://lazainbleu.com',
    },
    {
        id: '2',
        title: 'Gizify',
        description: 'Gizify is an AI-based mobile application for nutrition monitoring in pregnant women and healthy recipe recommendations aimed at preventing stunting. Our goal is to help users maintain a balanced diet effortlessly through smart technology.',
        featured: true,
        tags: ['React Native', 'TypeScript', 'Express.js'],
        image: '/assets/gizify.png',
        github: 'https://github.com/Gizify',
        live: 'https://play.google.com/store/apps/details?id=com.farach.Gizify',
    },
    {
        id: '3',
        title: 'PetWell',
        description: 'Petwell: Easy Care for Your Pets. An app that uses camera-based disease detection and offers vet consultations via chat. It also helps you find nearby veterinarians with a user-friendly interface, ensuring your pets get the best care effortlessly. ',
        featured: true,
        tags: ['Kotlin', 'Express.js', 'Jupyter Notebook'],
        image: '/assets/petwell.png',
        github: 'https://github.com/ENTS-H108',
        live: 'https://design-system.dev',
    },
];

const PROJECTS: Project[] = [
    {
        id: '4',
        title: 'Spiderverse Ui',
        description: 'A modern animated landing page built with Next.js and TypeScript, featuring clean components, smooth transitions, and optimized performance.',
        tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
        github: 'https://github.com/zeiynz/spiderverse-ui',
        live: '',
    },
    {
        id: '5',
        title: 'Personal Notes Starter',
        description: 'A lightweight personal notes app built with modern web technologies, featuring clean UI, fast performance, and easy customization for personal productivity.',
        tags: ['React', 'Vite', 'JavaScript',],
        github: 'https://github.com/zeiynz/Personal-Notes-Starter',
        live: '',
    },
    {
        id: '6',
        title: 'Bookshelf API',
        description: 'A RESTful API for managing book collections. Supports CRUD operations, data validation, and modular architecture for scalability and maintainability.',
        tags: ['Node.js', 'Hapi.js', 'Joi', 'Postman'],
        github: 'https://github.com/zeiynz/Bookshelf-Api',
        live: '',
    },
    {
        id: '7',
        title: 'Linktree',
        description: 'A simple and responsive personal link page built with HTML and CSS to showcase multiple social links in one place.',
        tags: ['HTML', 'CSS'],
        github: 'https://github.com/zeiynz/linktree',
        live: '',
    },
];

export default function Projects() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        checkScroll();
        const container = scrollContainerRef.current;
        container?.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        return () => {
            container?.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = 400;
        const currentScroll = scrollContainerRef.current.scrollLeft;
        const targetScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

        scrollContainerRef.current.scrollTo({
            left: targetScroll,
            behavior: 'smooth',
        });
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Featured Project Section */}
            <section id="projects" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Featured Works</h2>
                    <p className="mt-3 max-w-2xl text-lg text-neutral-400">
                        Showcase of my best projects and recent work
                    </p>
                </div>

                <div className="relative">
                    {/* Navigation Buttons */}
                    <div className="absolute -left-2 top-1/2 z-20 -translate-y-1/2 sm:left-0">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            aria-label="Scroll left"
                            className={clsx(
                                'group rounded-full p-2.5 backdrop-blur-sm transition-all duration-300 border border-neutral-700/50',
                                canScrollLeft
                                    ? 'bg-neutral-800/40 hover:border-neutral-600 hover:bg-neutral-700/60'
                                    : 'bg-neutral-900/20 opacity-30'
                            )}
                        >
                            <ChevronLeft
                                size={18}
                                className={clsx('transition-colors duration-300', canScrollLeft ? 'text-neutral-300' : 'text-neutral-600')}
                            />
                        </button>
                    </div>

                    <div className="absolute -right-2 top-1/2 z-20 -translate-y-1/2 sm:right-0">
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            aria-label="Scroll right"
                            className={clsx(
                                'group rounded-full p-2.5 backdrop-blur-sm transition-all duration-300 border border-neutral-700/50',
                                canScrollRight
                                    ? 'bg-neutral-800/40 hover:border-neutral-600 hover:bg-neutral-700/60'
                                    : 'bg-neutral-900/20 opacity-30'
                            )}
                        >
                            <ChevronRight
                                size={18}
                                className={clsx('transition-colors duration-300', canScrollRight ? 'text-neutral-300' : 'text-neutral-600')}
                            />
                        </button>
                    </div>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth px-4 sm:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {FEATURED_PROJECTS.map((project) => (
                            <div key={project.id} className="min-w-[80%] sm:min-w-[70%] flex-shrink-0">
                                <ProjectCard project={project} featured />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid Section */}
            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Other Projects</h2>
                    <p className="mt-3 max-w-2xl text-lg text-neutral-400">
                        Explore my portfolio of web applications and digital solutions
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} featured={false} />
                    ))}
                </div>
            </section>
        </div>
    );
}