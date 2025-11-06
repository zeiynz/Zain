'use client';

import { useState } from 'react';
import clsx from 'clsx';

export default function Footer() {
    const year = new Date().getFullYear();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <footer className="relative py-10 px-6 mt-20 overflow-hidden bg-gradient-to-b from-transparent via-zinc-950/30 to-zinc-950/60">
            {/* Animated background gradient */}
            <div
                className={clsx(
                    'absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none',
                    isHovered && 'opacity-100'
                )}
                style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(91, 71, 224, 0.1) 0%, transparent 70%)',
                }}
            />

            {/* Animated divider line from top */}
            <div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"
                style={{
                    animation: 'shimmer 3s ease-in-out infinite',
                }}
            />

            <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
                {/* Tagline */}
                <p
                    className="text-zinc-400 text-sm transition-all duration-500"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Built & designed by{' '}
                    <span
                        className={clsx(
                            'font-medium transition-all duration-300 cursor-pointer inline-block',
                            isHovered
                                ? 'drop-shadow-lg'
                                : 'text-zinc-300'
                        )}
                        style={{
                            color: isHovered ? '#5b47e0' : 'currentColor',
                            animation: isHovered ? 'pulse-glow 1.5s ease-in-out infinite' : 'none',
                        }}
                    >
                        Zain S.
                    </span>
                </p>

                {/* Copyright */}
                <p
                    className={clsx(
                        'text-xs transition-all duration-500',
                        isHovered ? 'text-zinc-500' : 'text-zinc-600'
                    )}
                >
                    &copy; {year} All rights reserved.
                </p>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                        style={{
                            left: `${30 + i * 20}%`,
                            top: `${40 + i * 15}%`,
                            animation: `float 3s ease-in-out ${i * 0.2}s infinite`,
                        }}
                    />
                ))}
            </div>

            <style>{`
        @keyframes shimmer {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 0 rgba(91, 71, 224, 0));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(91, 71, 224, 0.6));
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          50% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.8;
          }
          90% {
            opacity: 0.5;
          }
        }
      `}</style>
        </footer>
    );
}