'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { product } from '@/data/product';

export default function ProductShoeScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const animationFrameRef = useRef<number>();
    const currentFrameRef = useRef(0);
    const particlesRef = useRef<Particle[]>([]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 119]);

    const frameCount = 120;

    // Particle class for effects
    interface Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        alpha: number;
        color: string;
        life: number;
        maxLife: number;
    }

    // Initialize particles
    useEffect(() => {
        const createParticles = () => {
            const particles: Particle[] = [];
            for (let i = 0; i < 30; i++) {
                particles.push({
                    x: Math.random() * (canvasSize.width || 800),
                    y: Math.random() * (canvasSize.height || 600),
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: -Math.random() * 1 - 0.5,
                    size: Math.random() * 3 + 1,
                    alpha: Math.random() * 0.5 + 0.2,
                    color: Math.random() > 0.5 ? '#E42A2A' : '#FFB300',
                    life: Math.random() * 100,
                    maxLife: 100 + Math.random() * 100,
                });
            }
            particlesRef.current = particles;
        };
        createParticles();
    }, [canvasSize]);

    // Load images
    useEffect(() => {
        const loadImages = () => {
            const loadedImages: HTMLImageElement[] = [];
            let loaded = 0;

            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                img.src = `${product.folderPath}/${i}.webp`;
                img.onload = () => {
                    loaded++;
                    setLoadedCount(loaded);
                    if (loaded === 1 && canvasRef.current) {
                        // Set canvas size based on first image
                        setCanvasSize({ width: img.width, height: img.height });
                    }
                };
                img.onerror = () => {
                    loaded++;
                    setLoadedCount(loaded);
                };
                loadedImages[i - 1] = img;
            }
            setImages(loadedImages);
        };

        loadImages();
    }, []);

    // Handle canvas resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && canvasSize.width > 0) {
                const container = canvasRef.current.parentElement;
                if (container) {
                    const scale = Math.min(
                        container.clientWidth / canvasSize.width,
                        container.clientHeight / canvasSize.height
                    );
                    canvasRef.current.style.width = `${canvasSize.width * scale}px`;
                    canvasRef.current.style.height = `${canvasSize.height * scale}px`;
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [canvasSize]);

    // Draw frame and particles
    const drawFrame = useCallback((frame: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas || images.length === 0) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw current frame
        const img = images[Math.min(Math.max(Math.floor(frame), 0), images.length - 1)];
        if (img && img.complete && img.naturalWidth > 0) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        // Draw particles
        particlesRef.current.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.alpha * (1 - particle.life / particle.maxLife);
            ctx.fill();
            ctx.globalAlpha = 1;

            // Update particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life++;

            // Reset particle
            if (particle.life > particle.maxLife || particle.y < 0) {
                particle.x = Math.random() * canvas.width;
                particle.y = canvas.height + 10;
                particle.life = 0;
                particle.alpha = Math.random() * 0.5 + 0.2;
            }
        });
    }, [images]);

    // Animation loop
    useEffect(() => {
        const unsubscribe = frameIndex.on('change', (v) => {
            currentFrameRef.current = v;
        });

        const animate = () => {
            drawFrame(currentFrameRef.current);
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            unsubscribe();
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [frameIndex, drawFrame]);

    // Set canvas dimensions
    useEffect(() => {
        if (canvasRef.current && canvasSize.width > 0) {
            canvasRef.current.width = canvasSize.width;
            canvasRef.current.height = canvasSize.height;
        }
    }, [canvasSize]);

    const loadProgress = Math.round((loadedCount / frameCount) * 100);

    return (
        <div ref={containerRef} className="h-[500vh] relative">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {/* Loading Indicator */}
                {loadedCount < frameCount && (
                    <div className="absolute inset-0 flex items-center justify-center bg-pumaBlack z-20">
                        <div className="text-center">
                            <div className="relative w-32 h-32 mb-4">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="60"
                                        stroke="rgba(228, 42, 42, 0.2)"
                                        strokeWidth="8"
                                        fill="none"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="60"
                                        stroke="#E42A2A"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeDasharray={`${loadProgress * 3.77} 377`}
                                        strokeLinecap="round"
                                        className="transition-all duration-300"
                                    />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center font-rajdhani font-bold text-2xl text-white">
                                    {loadProgress}%
                                </span>
                            </div>
                            <p className="font-inter text-white/60 text-sm">Loading Experience...</p>
                        </div>
                    </div>
                )}

                {/* Canvas Container */}
                <div className="canvas-container relative w-full h-full flex items-center justify-center">
                    <canvas
                        ref={canvasRef}
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                        style={{
                            filter: 'drop-shadow(0 0 60px rgba(228, 42, 42, 0.3))',
                        }}
                    />

                    {/* Glow Effect */}
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.3, 0.6, 0.3]),
                        }}
                        className="absolute inset-0 bg-gradient-radial from-pumaRed/10 via-transparent to-transparent pointer-events-none"
                    />
                </div>
            </div>
        </div>
    );
}
