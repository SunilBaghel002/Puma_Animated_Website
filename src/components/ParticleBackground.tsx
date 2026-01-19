'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
}

export default function ParticleBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Generate particles
    const particles = useMemo(() => {
        const particleArray: Particle[] = [];
        for (let i = 0; i < 50; i++) {
            particleArray.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 1,
                duration: Math.random() * 20 + 10,
                delay: Math.random() * 10,
                color: Math.random() > 0.7 ? '#FFB300' : '#E42A2A',
            });
        }
        return particleArray;
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none overflow-hidden z-0"
        >
            {/* Gradient Background */}
            <motion.div
                style={{
                    opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]),
                }}
                className="absolute inset-0 bg-gradient-radial from-pumaRed/5 via-transparent to-transparent"
            />

            {/* Floating Particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        filter: `blur(${particle.size > 3 ? 1 : 0}px)`,
                    }}
                    initial={{ y: '100vh', opacity: 0 }}
                    animate={{
                        y: [null, '-100vh'],
                        opacity: [0, 0.6, 0.6, 0],
                        x: [0, Math.sin(particle.id) * 50, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}

            {/* Ember/Spark Effects */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`spark-${i}`}
                    className="absolute w-1 h-1 bg-pumaGold rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        filter: 'blur(0.5px)',
                        boxShadow: '0 0 6px #FFB300',
                    }}
                    initial={{ y: '100vh', opacity: 0, scale: 0 }}
                    animate={{
                        y: [null, '-110vh'],
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 0.5, 0],
                        rotate: [0, 360, 720],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 8,
                        delay: Math.random() * 15,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}

            {/* Diagonal Lines Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(228, 42, 42, 1) 30px, rgba(228, 42, 42, 1) 31px)',
                }}
            />

            {/* Reactive Glow based on scroll */}
            <motion.div
                style={{
                    scale: useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1]),
                    opacity: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.1, 0.3, 0.3, 0.1]),
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-pumaRed/30 via-pumaRed/5 to-transparent blur-3xl"
            />
        </div>
    );
}
