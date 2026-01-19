'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductShoeScroll from '@/components/ProductShoeScroll';
import SizeSelector from '@/components/SizeSelector';
import ParticleBackground from '@/components/ParticleBackground';
import { product } from '@/data/product';

export default function Home() {
    const [selectedSize, setSelectedSize] = useState('');
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <main className="relative bg-pumaBlack min-h-screen">
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

            {/* Scrollytelling Section with Shoe Animation - Text overlays integrated */}
            <ProductShoeScroll />

            {/* Product Details Section */}
            <ProductDetailsSection />

            {/* Performance Stats Section */}
            <PerformanceStatsSection />

            {/* Featured Products Section */}
            <FeaturedProductsSection />

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
                        {/* Product Detail Image */}
                        <div className="aspect-square bg-gradient-to-br from-pumaGray to-pumaBlack rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative group">
                            <img
                                src={`${product.folderPath}/60.jpg`}
                                alt={product.detailsSection.imageAlt}
                                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-radial from-pumaRed/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

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

// Featured Products Section
function FeaturedProductsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    // Different shoe products with unique images
    const featuredProducts = [
        {
            id: 1,
            name: 'Velocity X',
            category: 'Running',
            price: '₹14,999',
            image: '/images/shoes/velocity-red.png',
            color: 'Red/Black'
        },
        {
            id: 2,
            name: 'Deviate Nitro',
            category: 'Performance',
            price: '₹16,999',
            image: '/images/shoes/deviate-blue.png',
            color: 'Blue/White'
        },
        {
            id: 3,
            name: 'Liberate Nitro',
            category: 'Training',
            price: '₹12,999',
            image: '/images/shoes/training-black.png',
            color: 'Black/Gold'
        },
        {
            id: 4,
            name: 'Velocity Pro',
            category: 'Elite',
            price: '₹19,999',
            image: '/images/shoes/elite-white.png',
            color: 'White/Red'
        },
        {
            id: 5,
            name: 'Fast-R Nitro',
            category: 'Racing',
            price: '₹15,999',
            image: '/images/shoes/racing-green.png',
            color: 'Green/Black'
        },
        {
            id: 6,
            name: 'Magnify Nitro',
            category: 'Cushioned',
            price: '₹13,999',
            image: '/images/shoes/cushioned-grey.png',
            color: 'Grey/Volt'
        },
    ];

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-pumaBlack via-[#0d0d0d] to-pumaBlack" />

            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(228,42,42,0.1) 50px, rgba(228,42,42,0.1) 100px)'
                }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12 bg-pumaRed" />
                        <span className="font-inter text-pumaRed text-sm tracking-widest uppercase">Collection</span>
                        <div className="h-px w-12 bg-pumaRed" />
                    </div>
                    <h2 className="font-rajdhani font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                        Explore More Styles
                    </h2>
                    <p className="font-inter text-white/60 text-lg max-w-2xl mx-auto">
                        Discover our complete range of high-performance running shoes designed for every type of runner.
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProducts.map((shoe, index) => (
                        <motion.div
                            key={shoe.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="group cursor-pointer"
                        >
                            <div className="relative bg-gradient-to-br from-zinc-900 to-black rounded-2xl overflow-hidden border border-white/5 hover:border-pumaRed/30 transition-all duration-500">
                                {/* Image Container */}
                                <div className="aspect-square relative overflow-hidden">
                                    <img
                                        src={shoe.image}
                                        alt={shoe.name}
                                        className="w-full h-full object-contain p-6 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 bg-pumaRed/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <span className="font-inter text-xs font-bold text-white uppercase tracking-wider">{shoe.category}</span>
                                    </div>

                                    {/* Quick View Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <button className="bg-white text-black font-rajdhani font-bold px-6 py-2 rounded-full uppercase text-sm hover:bg-pumaRed hover:text-white transition-colors">
                                            Quick View
                                        </button>
                                    </motion.div>
                                </div>

                                {/* Product Info */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-rajdhani font-bold text-xl text-white group-hover:text-pumaRed transition-colors">
                                                {shoe.name}
                                            </h3>
                                            <p className="font-inter text-white/50 text-sm">{shoe.color}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-rajdhani font-bold text-lg text-pumaGold">{shoe.price}</p>
                                        </div>
                                    </div>

                                    {/* Add to Cart Row */}
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-pumaRed" />
                                            <div className="w-3 h-3 rounded-full bg-black border border-white/20" />
                                            <div className="w-3 h-3 rounded-full bg-white" />
                                        </div>
                                        <button className="font-inter text-sm text-white/60 hover:text-pumaRed transition-colors flex items-center gap-2">
                                            Add to Cart
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <button className="btn-aggressive text-lg px-12 py-4">
                        View All Products
                    </button>
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
                        {/* Product Image */}
                        <div className="aspect-square bg-gradient-to-br from-pumaGray to-pumaBlack rounded-3xl flex items-center justify-center overflow-hidden border border-white/10 relative group">
                            <img
                                src={`${product.folderPath}/90.jpg`}
                                alt="Velocity X Product"
                                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
                            />

                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-radial from-pumaRed/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
