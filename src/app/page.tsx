'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductShoeScroll from '@/components/ProductShoeScroll';
import ProductTextOverlays from '@/components/ProductTextOverlays';
import SizeSelector from '@/components/SizeSelector';
import ParticleBackground from '@/components/ParticleBackground';
import { product } from '@/data/product';

export default function Home() {
    const [selectedSize, setSelectedSize] = useState('');
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <main className="relative bg-pumaBlack min-h-screen overflow-x-hidden">
            {/* Scroll Progress Bar */}
            <motion.div
                style={{ scaleX: smoothProgress }}
                className="scroll-progress"
            />

            {/* Particle Background */}
            <ParticleBackground />

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <HeroSection />

            {/* Scrollytelling Section with Shoe Animation */}
            <section className="relative">
                <ProductShoeScroll />
                <ProductTextOverlays />
            </section>

            {/* Product Details Section */}
            <ProductDetailsSection />

            {/* Performance Stats Section */}
            <PerformanceStatsSection />

            {/* Buy Now Section */}
            <BuyNowSection selectedSize={selectedSize} onSizeChange={setSelectedSize} />

            {/* Footer */}
            <Footer />
        </main>
    );
}

// Hero Section Component
function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true });

    const title = 'VELOCITY X';

    return (
        <section
            ref={containerRef}
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-pumaBlack via-pumaBlack to-pumaRed/20" />

            {/* Diagonal Pattern */}
            <div className="absolute inset-0 diagonal-pattern opacity-50" />

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                {/* Pre-title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-4"
                >
                    <span className="font-inter text-pumaGold text-sm tracking-[0.3em] uppercase">
                        Introducing the All-New
                    </span>
                </motion.div>

                {/* Main Title with Letter Animation */}
                <h1 className="font-rajdhani font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-4 perspective-1000">
                    {title.split('').map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 50, rotateX: -90 }}
                            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                            transition={{
                                duration: 0.5,
                                delay: 0.5 + i * 0.05,
                                ease: [0.215, 0.61, 0.355, 1]
                            }}
                            className="inline-block text-shadow-athletic"
                            style={{
                                color: char === 'X' ? '#E42A2A' : 'white',
                                textShadow: char === 'X' ? '0 0 40px rgba(228, 42, 42, 0.8)' : undefined,
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </h1>

                {/* Subtitle */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="font-rajdhani font-semibold text-3xl md:text-5xl text-white/90 mb-6"
                >
                    {product.subName}
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="font-inter text-white/60 text-lg max-w-xl mx-auto mb-8"
                >
                    {product.description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.8 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-aggressive text-lg px-12 py-4"
                    >
                        Explore Now
                    </motion.button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 2.2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-2 text-white/40"
                    >
                        <span className="font-inter text-xs tracking-widest uppercase">Scroll</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>

            {/* Side Accents */}
            <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '30%' } : {}}
                transition={{ duration: 1, delay: 1 }}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-1 bg-gradient-to-b from-transparent via-pumaRed to-transparent"
            />
            <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '30%' } : {}}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute right-8 top-1/2 -translate-y-1/2 w-1 bg-gradient-to-b from-transparent via-pumaRed to-transparent"
            />
        </section>
    );
}

// Product Details Section
function ProductDetailsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-pumaBlack via-pumaGray/50 to-pumaBlack" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Placeholder for product detail image */}
                        <div className="aspect-square bg-gradient-to-br from-pumaGray to-pumaBlack rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                            <div className="text-center p-8">
                                <svg className="w-24 h-24 mx-auto mb-4 text-pumaRed/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="font-inter text-white/40 text-sm">
                                    {product.detailsSection.imageAlt}
                                </p>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-pumaRed/50" />
                            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-pumaRed/50" />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -top-4 -right-4 bg-pumaRed rounded-full px-4 py-2 shadow-lg shadow-pumaRed/30"
                        >
                            <span className="font-rajdhani font-bold text-white text-sm">NEW</span>
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Section Label */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-12 bg-pumaRed" />
                            <span className="font-inter text-pumaRed text-sm tracking-widest uppercase">Technology</span>
                        </div>

                        {/* Title */}
                        <h2 className="font-rajdhani font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                            {product.detailsSection.title}
                        </h2>

                        {/* Description */}
                        <p className="font-inter text-white/70 text-lg leading-relaxed mb-8">
                            {product.detailsSection.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-4 mb-8">
                            {product.features.map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-2 h-2 bg-pumaRed rounded-full" />
                                    <span className="font-inter text-white/80">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-3">
                            {product.buyNowSection.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full font-inter text-sm text-white/70"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Performance Stats Section
function PerformanceStatsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-pumaBlack" />
            <div className="absolute inset-0 bg-diagonal-lines opacity-30" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-rajdhani font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                        {product.performanceSection.title}
                    </h2>
                    <p className="font-inter text-white/60 text-lg max-w-2xl mx-auto">
                        {product.performanceSection.description}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {product.techSpecs.map((spec, index) => (
                        <motion.div
                            key={spec.label}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                            className="relative group"
                        >
                            <div className="bg-gradient-to-br from-pumaGray/50 to-pumaBlack p-8 rounded-2xl border border-white/10 hover:border-pumaRed/50 transition-all duration-500">
                                {/* Stat Value with Counter Animation */}
                                <CounterStat
                                    value={spec.value}
                                    isInView={isInView}
                                    delay={0.5 + index * 0.2}
                                />

                                {/* Label */}
                                <p className="font-inter text-white/60 text-lg mt-2">{spec.label}</p>

                                {/* Progress Bar */}
                                <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: '100%' } : {}}
                                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                                        className="h-full bg-gradient-to-r from-pumaRed to-pumaGold"
                                    />
                                </div>

                                {/* Corner Accent */}
                                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                                    <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-pumaRed/50 group-hover:border-pumaRed transition-colors" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { label: 'Energy Return', value: '85%' },
                        { label: 'Ground Contact', value: '-12%' },
                        { label: 'Stability Index', value: '9.4' },
                        { label: 'Durability', value: '500km+' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center p-6 bg-white/5 rounded-xl border border-white/5">
                            <p className="font-rajdhani font-bold text-2xl md:text-3xl text-pumaRed mb-1">
                                {stat.value}
                            </p>
                            <p className="font-inter text-white/50 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// Counter Stat Component
function CounterStat({ value, isInView, delay }: { value: string; isInView: boolean; delay: number }) {
    const [displayValue, setDisplayValue] = useState('0');
    const numericValue = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/\d/g, '');

    useEffect(() => {
        if (!isInView) return;

        const timeout = setTimeout(() => {
            let start = 0;
            const duration = 1500;
            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * numericValue);

                setDisplayValue(current.toString());

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setDisplayValue(numericValue.toString());
                }
            };

            requestAnimationFrame(animate);
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [isInView, numericValue, delay]);

    return (
        <div className="stat-number">
            {displayValue}
            <span className="text-2xl text-white/60">{suffix}</span>
        </div>
    );
}

// Buy Now Section
function BuyNowSection({
    selectedSize,
    onSizeChange
}: {
    selectedSize: string;
    onSizeChange: (size: string) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-pumaBlack via-pumaGray/30 to-pumaBlack" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Product Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Placeholder for product image */}
                        <div className="aspect-square bg-gradient-to-br from-pumaGray to-pumaBlack rounded-3xl flex items-center justify-center overflow-hidden border border-white/10">
                            <div className="text-center">
                                <svg className="w-40 h-40 mx-auto text-pumaRed/30" viewBox="0 0 512 250" fill="currentColor">
                                    <path d="M196.71,10.39c-1.69,8.99-3.37,17.99-5.06,26.98c-7.82,41.72-15.58,83.45-23.54,125.14c-1.59,8.35-3.18,15.34-11.77,20.11c-15.61,8.66-31.02,17.69-46.41,26.74c-2.24,1.32-4.09,3.28-6.12,4.95c1.41,1.43,2.44,3.32,4.27,4.21c12.57,6.13,25.24,12.06,37.9,18.02c2.45,1.16,4.96,2.19,7.86,3.47c1.46-7.15,2.81-13.67,4.11-20.2c6.67-33.47,13.31-66.95,20.02-100.41c1.17-5.84,2.62-11.63,3.83-17.46c0.58-2.79,1.93-4.1,4.83-4.46c21.72-2.66,43.43-5.41,65.14-8.15c6.12-0.77,12.21-1.73,18.35-2.36c3.11-0.32,4.88-1.37,5.58-4.53c2.92-13.23,6.09-26.4,9.23-39.58c0.52-2.17,1.27-4.28,2.05-6.86c-2.13,0-3.77,0-5.41,0c-26.88,0-53.75,0.08-80.63-0.07C195.14,35.88,193.46,19.14,196.71,10.39z" />
                                    <path d="M378.05,77.55c-0.49,2.54-0.85,5.12-1.49,7.62c-6.08,23.78-12.25,47.54-18.33,71.32c-0.93,3.64-1.54,7.36-2.47,11c-0.42,1.64-0.44,3.79-1.5,4.86c-1.19,1.2-3.33,1.75-5.14,1.96c-8.65,1.01-17.33,1.76-26,2.61c-17.14,1.68-34.27,3.41-51.42,5.04c-5.35,0.51-6.51,1.61-7.62,6.92c-2.71,13.02-5.52,26.02-8.25,39.04c-0.41,1.95-0.61,3.94-1.03,6.72c2.3,0,4.16,0,6.02,0c23.93,0,47.86-0.04,71.79,0.04c4.82,0.02,8.15-1.62,10.75-5.62c6.07-9.36,12.45-18.5,18.69-27.74c0.57-0.84,1.06-1.74,1.77-2.91c-4.06,0-7.64,0-11.72,0c1.09-5.86,2.05-11.38,3.17-16.86c0.26-1.27,0.88-2.67,1.75-3.59c5.55-5.87,11.23-11.62,16.89-17.38c5.14-5.23,10.26-10.5,15.52-15.6c0.96-0.93,2.48-1.79,3.72-1.77c15.14,0.21,30.28,0.63,45.42,0.97c5.38,0.12,10.75,0.24,16.13,0.35c0.18,0,0.35-0.1,0.94-0.29c0.31-1.45,0.76-3.02,0.99-4.63c1.55-10.88,3.02-21.78,4.55-32.66c0.61-4.33,1.3-8.64,1.95-12.97c-31.38,0-62.27,0-93.54,0c0.83-3.87,1.53-7.35,2.33-10.8c1.2-5.17,2.52-10.31,3.71-15.48c0.43-1.86,0.95-3.39,3.41-3.4c12.78-0.08,25.55-0.36,38.33-0.44c13.27-0.08,26.55-0.04,39.82-0.02c1.79,0,3.58,0.16,5.79,0.27c0.82-4.35,1.58-8.42,2.36-12.49c1.24-6.53,2.52-13.05,3.74-19.58c0.61-3.28,1.12-6.58,1.8-10.65c-2.05,0-3.59,0-5.13,0c-27.71,0-55.42-0.02-83.13,0.03c-2.1,0-3.55,0.32-4.35,2.79C382.9,48.39,380.41,62.89,378.05,77.55z" />
                                </svg>
                                <p className="font-rajdhani font-bold text-3xl text-white/20 mt-4">VELOCITY X</p>
                            </div>
                        </div>

                        {/* Floating Price Tag */}
                        <motion.div
                            animate={{ rotate: [0, 5, 0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute -top-6 -right-6 bg-pumaRed rounded-2xl p-4 shadow-2xl shadow-pumaRed/30"
                        >
                            <p className="font-inter text-white/70 text-sm line-through">{product.originalPrice}</p>
                            <p className="font-rajdhani font-bold text-2xl text-white">{product.price}</p>
                        </motion.div>
                    </motion.div>

                    {/* Purchase Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        {/* Product Name */}
                        <div className="mb-8">
                            <h2 className="font-rajdhani font-bold text-5xl md:text-6xl text-white mb-2">
                                PUMA {product.name}
                            </h2>
                            <p className="font-inter text-white/60 text-lg">{product.description}</p>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-8">
                            <SizeSelector selectedSize={selectedSize} onSizeChange={onSizeChange} />
                        </div>

                        {/* Add to Cart Button */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!selectedSize}
                            className={`w-full py-5 font-rajdhani font-bold text-xl uppercase tracking-wider rounded-xl transition-all duration-300 ${selectedSize
                                    ? 'bg-pumaRed text-white hover:shadow-xl hover:shadow-pumaRed/30 animate-pulse-glow'
                                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                                }`}
                        >
                            {selectedSize ? `Add to Cart - ${product.price}` : 'Select a Size'}
                        </motion.button>

                        {/* Quick Buy */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!selectedSize}
                            className="w-full mt-4 py-4 bg-white/5 border border-white/20 text-white font-rajdhani font-semibold text-lg uppercase tracking-wider rounded-xl hover:border-pumaGold hover:bg-pumaGold/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Buy Now
                        </motion.button>

                        {/* Shipping & Returns */}
                        <div className="mt-8 space-y-4">
                            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                <svg className="w-6 h-6 text-pumaGold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                                <div>
                                    <p className="font-inter font-medium text-white text-sm">Free Express Delivery</p>
                                    <p className="font-inter text-white/50 text-sm">{product.buyNowSection.shippingPromise}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                <svg className="w-6 h-6 text-pumaGold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <div>
                                    <p className="font-inter font-medium text-white text-sm">30-Day Returns</p>
                                    <p className="font-inter text-white/50 text-sm">{product.buyNowSection.returnPolicy}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
