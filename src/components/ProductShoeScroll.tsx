'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { product } from '@/data/product';

export default function ProductShoeScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [canvasSize, setCanvasSize] = useState({ width: 1920, height: 1080 });
    const animationFrameRef = useRef<number>();

    const frameCount = 120;
    // More scroll height = more frames per screen of scrolling
    // With 800vh, each frame gets about 6.67vh of scroll distance
    const scrollHeight = '800vh';

    // Load images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loaded = 0;

        console.log(`Loading ${frameCount} images from ${product.folderPath}`);

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = `${product.folderPath}/${i}.jpg`;

            img.onload = () => {
                loaded++;
                setLoadedCount(loaded);
                // Set canvas size based on first loaded image
                if (loaded === 1) {
                    console.log(`First image loaded: ${img.width}x${img.height}`);
                    setCanvasSize({ width: img.width, height: img.height });
                }
            };

            img.onerror = () => {
                console.error(`Failed to load image ${i}.jpg`);
                loaded++;
                setLoadedCount(loaded);
            };

            loadedImages[i - 1] = img;
        }

        setImages(loadedImages);
    }, []);

    // Handle scroll - recalculated for full 120 frame coverage
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !stickyRef.current) return;

            const container = containerRef.current;
            const sticky = stickyRef.current;

            // Get the bounding rect of the container
            const containerRect = container.getBoundingClientRect();
            const stickyRect = sticky.getBoundingClientRect();

            // Calculate how much of the container has been scrolled through
            // containerRect.top starts positive (below viewport), goes negative (scrolled past)
            // We start animating when container top reaches viewport top (containerRect.top = 0)
            // We end when container bottom reaches viewport bottom

            const containerTop = containerRect.top;
            const containerHeight = containerRect.height;
            const viewportHeight = window.innerHeight;

            // Total scrollable distance within the container
            // This is the container height minus one viewport (since sticky takes one viewport)
            const scrollableDistance = containerHeight - viewportHeight;

            // How far we've scrolled into the container (0 when top of container hits top of viewport)
            const scrolledIntoContainer = -containerTop;

            // Progress from 0 to 1
            let progress = scrolledIntoContainer / scrollableDistance;
            progress = Math.max(0, Math.min(1, progress));

            // Map progress to frame index (0 to frameCount-1)
            const frameIndex = Math.round(progress * (frameCount - 1));

            setCurrentFrame(frameIndex);
        };

        // Use both scroll and requestAnimationFrame for smooth updates
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Draw current frame on canvas
    const drawFrame = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas || images.length === 0) return;

        const frameToShow = Math.min(Math.max(currentFrame, 0), images.length - 1);
        const img = images[frameToShow];

        if (img && img.complete && img.naturalWidth > 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    }, [images, currentFrame]);

    // Animation loop for smooth rendering
    useEffect(() => {
        const animate = () => {
            drawFrame();
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [drawFrame]);

    // Set canvas dimensions when size is determined
    useEffect(() => {
        if (canvasRef.current && canvasSize.width > 0) {
            canvasRef.current.width = canvasSize.width;
            canvasRef.current.height = canvasSize.height;
        }
    }, [canvasSize]);

    const loadProgress = Math.round((loadedCount / frameCount) * 100);
    const isLoading = loadedCount < frameCount;

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: scrollHeight }}
        >
            <div
                ref={stickyRef}
                className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-pumaBlack"
            >
                {/* Loading Indicator */}
                {isLoading && (
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
                            <p className="font-inter text-white/40 text-xs mt-2">{loadedCount} / {frameCount} images</p>
                        </div>
                    </div>
                )}

                {/* Canvas Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <canvas
                        ref={canvasRef}
                        className="max-w-[90vw] max-h-[80vh] object-contain"
                        style={{
                            filter: 'drop-shadow(0 0 60px rgba(228, 42, 42, 0.3))',
                            width: 'min(80vw, 1200px)',
                            height: 'auto',
                            aspectRatio: `${canvasSize.width} / ${canvasSize.height}`,
                        }}
                    />

                    {/* Frame indicator */}
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                        <span className="font-mono text-pumaRed text-lg font-bold">
                            {currentFrame + 1}
                        </span>
                        <span className="font-mono text-white/60 text-sm">
                            /{frameCount}
                        </span>
                    </div>

                    {/* Scroll hint at the start */}
                    {currentFrame === 0 && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-white/40"
                            >
                                <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                                <span className="font-inter text-xs uppercase tracking-widest">Scroll to Rotate</span>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Glow Effect */}
                    <motion.div
                        animate={{
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="absolute inset-0 bg-gradient-radial from-pumaRed/10 via-transparent to-transparent pointer-events-none"
                    />
                </div>
            </div>
        </div>
    );
}
