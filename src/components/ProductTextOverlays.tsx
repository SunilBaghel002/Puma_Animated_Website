'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { product } from '@/data/product';

export default function ProductTextOverlays() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const sections = [
        { data: product.section1, start: 0.0, peak: 0.12, end: 0.25 },
        { data: product.section2, start: 0.25, peak: 0.37, end: 0.5 },
        { data: product.section3, start: 0.5, peak: 0.62, end: 0.75 },
        { data: product.section4, start: 0.75, peak: 0.87, end: 1.0 },
    ];

    return (
        <div ref={containerRef} className="absolute inset-0 h-[500vh] pointer-events-none z-10">
            {sections.map((section, index) => (
                <TextSection
                    key={index}
                    title={section.data.title}
                    subtitle={section.data.subtitle}
                    scrollYProgress={scrollYProgress}
                    start={section.start}
                    peak={section.peak}
                    end={section.end}
                    index={index}
                />
            ))}
        </div>
    );
}

interface TextSectionProps {
    title: string;
    subtitle: string;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
    start: number;
    peak: number;
    end: number;
    index: number;
}

function TextSection({ title, subtitle, scrollYProgress, start, peak, end, index }: TextSectionProps) {
    const opacity = useTransform(
        scrollYProgress,
        [start, start + 0.05, peak, end - 0.05, end],
        [0, 1, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [start, peak, end],
        [100, 0, -100]
    );

    const scale = useTransform(
        scrollYProgress,
        [start, peak, end],
        [0.9, 1, 0.9]
    );

    // Diagonal line animation
    const lineWidth = useTransform(
        scrollYProgress,
        [start, peak, end],
        ['0%', '100%', '0%']
    );

    const positions = [
        'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center',
        'top-1/2 left-8 md:left-16 -translate-y-1/2 text-left',
        'top-1/2 right-8 md:right-16 -translate-y-1/2 text-right',
        'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center',
    ];

    return (
        <div className="sticky top-0 h-screen flex items-center justify-center">
            <motion.div
                style={{ opacity, y, scale }}
                className={`absolute ${positions[index]} max-w-2xl px-4`}
            >
                {/* Diagonal Accent Line */}
                <motion.div
                    style={{ width: lineWidth }}
                    className={`h-1 bg-gradient-to-r from-pumaRed to-pumaGold mb-4 ${index === 2 ? 'ml-auto' : index === 0 || index === 3 ? 'mx-auto' : ''
                        }`}
                />

                {/* Title */}
                <h2 className="font-rajdhani font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-tight text-shadow-athletic">
                    {title.split('').map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03, duration: 0.3 }}
                            className="inline-block"
                            style={{
                                textShadow: char === '.' ? '0 0 30px rgba(228, 42, 42, 0.8)' : undefined,
                                color: char === '.' ? '#E42A2A' : undefined
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </h2>

                {/* Subtitle */}
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="font-inter text-lg md:text-xl lg:text-2xl text-white/70 mt-4 leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Decorative Element */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [peak - 0.05, peak, peak + 0.05], [0, 1, 0]) }}
                    className={`absolute ${index === 2 ? '-right-4 md:-right-8' : '-left-4 md:-left-8'
                        } top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-pumaRed to-transparent`}
                />
            </motion.div>
        </div>
    );
}
