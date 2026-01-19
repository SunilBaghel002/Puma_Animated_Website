'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, useSpring, motion, MotionValue, animate } from 'framer-motion';
import { product } from '@/data/product';

export default function ProductShoeScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [displayFrame, setDisplayFrame] = useState(0);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastScrollProgressRef = useRef(0);
    const totalFrames = 120;

    // Scroll Progress - tracks scroll within the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the progress for smoother animation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map progress (0-1) to frame index (0-119)
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, totalFrames - 1]);

    // Handle scroll stop and auto-complete animation
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (progress) => {
            lastScrollProgressRef.current = progress;

            // Clear any existing timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // If not auto-playing, update display frame from scroll
            if (!isAutoPlaying) {
                setDisplayFrame(Math.floor(progress * (totalFrames - 1)));
            }

            // Set a timeout to detect when scrolling stops
            scrollTimeoutRef.current = setTimeout(() => {
                // User stopped scrolling - check if we should auto-complete
                if (progress > 0.5 && progress < 1) {
                    // Scroll more than 50% - animate to 100%
                    autoAnimateTo(1);
                } else if (progress > 0 && progress <= 0.5) {
                    // Scroll less than 50% - animate back to 20%
                    autoAnimateTo(0.2);
                }
            }, 300); // Wait 300ms after scroll stops
        });

        return () => {
            unsubscribe();
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [scrollYProgress, isAutoPlaying]);

    // Auto-animate to target progress
    const autoAnimateTo = useCallback((targetProgress: number) => {
        if (!containerRef.current || isAutoPlaying) return;

        setIsAutoPlaying(true);

        const startProgress = lastScrollProgressRef.current;
        const startFrame = Math.floor(startProgress * (totalFrames - 1));
        const targetFrame = Math.floor(targetProgress * (totalFrames - 1));

        // Animate the display frame
        animate(startFrame, targetFrame, {
            duration: Math.abs(targetFrame - startFrame) * 0.02, // ~20ms per frame
            ease: "easeOut",
            onUpdate: (value) => {
                setDisplayFrame(Math.floor(value));
            },
            onComplete: () => {
                setIsAutoPlaying(false);
                // Scroll to the target position
                if (containerRef.current) {
                    const containerRect = containerRef.current.getBoundingClientRect();
                    const containerTop = containerRect.top + window.scrollY;
                    const containerHeight = containerRect.height;
                    const windowHeight = window.innerHeight;
                    const scrollableDistance = containerHeight - windowHeight;
                    const targetScrollY = containerTop + (scrollableDistance * targetProgress);

                    window.scrollTo({
                        top: targetScrollY,
                        behavior: 'instant'
                    });
                }
            }
        });
    }, [isAutoPlaying]);

    // Preload all images
    useEffect(() => {
        let isMounted = true;
        const loadImages = async () => {
            const loaded: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= totalFrames; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = `${product.folderPath}/${i}.jpg`;
                    img.onload = () => resolve();
                    img.onerror = () => {
                        console.warn(`Failed to load image: ${img.src}`);
                        resolve();
                    };
                    loaded.push(img);
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            if (isMounted) {
                setImages(loaded);
                setIsLoaded(true);
            }
        };

        loadImages();
        return () => { isMounted = false; };
    }, []);

    // Canvas Drawing Logic
    useEffect(() => {
        let animationFrameId: number;

        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx || !isLoaded || images.length === 0) return;

            // Use displayFrame when auto-playing, otherwise use scroll-driven frame
            const currentFrame = isAutoPlaying
                ? displayFrame
                : Math.floor(frameIndex.get());

            const img = images[Math.max(0, Math.min(currentFrame, images.length - 1))] || images[0];

            if (!img || !img.complete) return;

            // Handle resize
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Draw image (contain mode)
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.85;
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        const loop = () => {
            render();
            animationFrameId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isLoaded, images, frameIndex, isAutoPlaying, displayFrame]);

    return (
        <div ref={containerRef} className="h-[300vh] relative bg-black">
            {/* Loading indicator */}
            {!isLoaded && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-pumaRed border-t-transparent rounded-full animate-spin mb-4" />
                        <span className="text-white font-rajdhani text-2xl uppercase tracking-widest">Loading Assets...</span>
                    </div>
                </div>
            )}

            {/* Sticky container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain relative z-0"
                />

                {/* Gradient overlays */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-5 pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black/50 to-transparent z-5 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black/50 to-transparent z-5 pointer-events-none" />

                {/* Text Overlays */}
                <ProductTextOverlays scrollYProgress={scrollYProgress} />

                {/* Auto-play indicator */}
                {isAutoPlaying && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-pumaRed/80 px-4 py-2 rounded-full z-20">
                        <span className="text-white text-sm font-rajdhani uppercase tracking-widest">Auto-playing...</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// Text Overlays Component
interface ProductTextOverlaysProps {
    scrollYProgress: MotionValue<number>;
}

function ProductTextOverlays({ scrollYProgress }: ProductTextOverlaysProps) {
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.20, 0.25], [1, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
    const opacity2 = useTransform(scrollYProgress, [0.30, 0.40, 0.45, 0.50], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.30, 0.50], [-50, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.70, 0.75], [0, 1, 1, 0]);
    const scale3 = useTransform(scrollYProgress, [0.55, 0.75], [0.8, 1.1]);
    const opacity4 = useTransform(scrollYProgress, [0.80, 0.90, 0.95, 1], [0, 1, 1, 0]);
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center h-screen w-full">
            {/* Section 1 - Hero */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute text-center flex flex-col items-center"
            >
                <div className="mb-4 px-4 py-1 bg-pumaRed/20 border border-pumaRed/50 rounded-full backdrop-blur-md">
                    <span className="text-pumaRed text-xs font-bold tracking-widest uppercase">New Release</span>
                </div>
                <h2
                    className="text-7xl md:text-[10rem] font-rajdhani font-bold uppercase italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 leading-[0.85] drop-shadow-2xl"
                    style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}
                >
                    {product.name}
                </h2>
                <h3 className="text-2xl md:text-5xl font-rajdhani font-bold text-white uppercase mt-4 tracking-tighter">
                    {product.section1.title}
                </h3>
                <p className="text-lg md:text-2xl font-inter font-light mt-6 text-gray-300 tracking-widest uppercase max-w-xl mx-auto leading-relaxed">
                    {product.section1.subtitle}
                </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: scrollIndicatorOpacity }}
                className="absolute bottom-12 flex flex-col items-center gap-2"
            >
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-pumaRed to-transparent" />
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: opacity2, x: x2 }}
                className="absolute left-10 md:left-20 top-1/3 max-w-xl"
            >
                <div className="h-1 w-20 bg-pumaRed mb-6" />
                <h3 className="text-5xl md:text-7xl font-rajdhani font-bold uppercase text-white leading-none">
                    {product.section2.title}
                </h3>
                <p className="text-lg md:text-xl font-inter text-gray-300 mt-4 leading-relaxed">
                    {product.section2.subtitle}
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                style={{ opacity: opacity3, scale: scale3 }}
                className="absolute right-10 md:right-20 bottom-1/3 max-w-xl text-right"
            >
                <h3 className="text-5xl md:text-7xl font-rajdhani font-bold uppercase text-white leading-none">
                    {product.section3.title}
                </h3>
                <p className="text-lg md:text-xl font-inter text-gray-300 mt-4 leading-relaxed">
                    {product.section3.subtitle}
                </p>
                <div className="h-1 w-20 bg-pumaGold mt-6 ml-auto" />
            </motion.div>

            {/* Section 4 */}
            <motion.div
                style={{ opacity: opacity4 }}
                className="absolute bottom-20 text-center w-full"
            >
                <h2 className="text-6xl md:text-8xl font-rajdhani font-bold uppercase italic text-white tracking-tighter">
                    {product.section4.title}
                </h2>
            </motion.div>
        </div>
    );
}
