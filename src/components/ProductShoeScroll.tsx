'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring, motion, MotionValue } from 'framer-motion';
import { product } from '@/data/product';

export default function ProductShoeScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
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

    // Canvas Drawing Logic - runs on every animation frame
    useEffect(() => {
        let animationFrameId: number;

        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx || !isLoaded || images.length === 0) return;

            // Get current frame from the motion value
            const currentFrame = Math.floor(frameIndex.get());
            const img = images[currentFrame] || images[0];

            if (!img || !img.complete) return;

            // Handle resize - set canvas to window size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Draw image (contain mode with 0.85 scale to leave room for text)
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.85;
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        // Render loop for smooth animation
        const loop = () => {
            render();
            animationFrameId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isLoaded, images, frameIndex]);

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

            {/* Sticky container - stays fixed while scrolling */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Canvas for shoe animation */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain relative z-0"
                />

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-5 pointer-events-none" />

                {/* Side gradients for polish */}
                <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black/50 to-transparent z-5 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black/50 to-transparent z-5 pointer-events-none" />

                {/* Text Overlays */}
                <ProductTextOverlays scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}

// Text Overlays Component
interface ProductTextOverlaysProps {
    scrollYProgress: MotionValue<number>;
}

function ProductTextOverlays({ scrollYProgress }: ProductTextOverlaysProps) {
    // Section 1: Start immediately (0-25%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.20, 0.25], [1, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

    // Section 2: 30-50%
    const opacity2 = useTransform(scrollYProgress, [0.30, 0.40, 0.45, 0.50], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.30, 0.50], [-50, 0]);

    // Section 3: 55-75%
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.70, 0.75], [0, 1, 1, 0]);
    const scale3 = useTransform(scrollYProgress, [0.55, 0.75], [0.8, 1.1]);

    // Section 4: 80-100%
    const opacity4 = useTransform(scrollYProgress, [0.80, 0.90, 0.95, 1], [0, 1, 1, 0]);

    // Scroll indicator opacity
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
