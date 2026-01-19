'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'backdrop-blur-xl bg-black/80 border-b border-pumaRed/20'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        {/* Puma Leaping Cat SVG */}
                        <svg
                            width="48"
                            height="32"
                            viewBox="0 0 512 250"
                            fill="currentColor"
                            className="text-pumaRed"
                        >
                            <path d="M196.71,10.39c-1.69,8.99-3.37,17.99-5.06,26.98c-7.82,41.72-15.58,83.45-23.54,125.14
                c-1.59,8.35-3.18,15.34-11.77,20.11c-15.61,8.66-31.02,17.69-46.41,26.74c-2.24,1.32-4.09,3.28-6.12,4.95
                c1.41,1.43,2.44,3.32,4.27,4.21c12.57,6.13,25.24,12.06,37.9,18.02c2.45,1.16,4.96,2.19,7.86,3.47
                c1.46-7.15,2.81-13.67,4.11-20.2c6.67-33.47,13.31-66.95,20.02-100.41c1.17-5.84,2.62-11.63,3.83-17.46
                c0.58-2.79,1.93-4.1,4.83-4.46c21.72-2.66,43.43-5.41,65.14-8.15c6.12-0.77,12.21-1.73,18.35-2.36
                c3.11-0.32,4.88-1.37,5.58-4.53c2.92-13.23,6.09-26.4,9.23-39.58c0.52-2.17,1.27-4.28,2.05-6.86c-2.13,0-3.77,0-5.41,0
                c-26.88,0-53.75,0.08-80.63-0.07C195.14,35.88,193.46,19.14,196.71,10.39z"/>
                            <path d="M378.05,77.55c-0.49,2.54-0.85,5.12-1.49,7.62c-6.08,23.78-12.25,47.54-18.33,71.32
                c-0.93,3.64-1.54,7.36-2.47,11c-0.42,1.64-0.44,3.79-1.5,4.86c-1.19,1.2-3.33,1.75-5.14,1.96c-8.65,1.01-17.33,1.76-26,2.61
                c-17.14,1.68-34.27,3.41-51.42,5.04c-5.35,0.51-6.51,1.61-7.62,6.92c-2.71,13.02-5.52,26.02-8.25,39.04
                c-0.41,1.95-0.61,3.94-1.03,6.72c2.3,0,4.16,0,6.02,0c23.93,0,47.86-0.04,71.79,0.04c4.82,0.02,8.15-1.62,10.75-5.62
                c6.07-9.36,12.45-18.5,18.69-27.74c0.57-0.84,1.06-1.74,1.77-2.91c-4.06,0-7.64,0-11.72,0c1.09-5.86,2.05-11.38,3.17-16.86
                c0.26-1.27,0.88-2.67,1.75-3.59c5.55-5.87,11.23-11.62,16.89-17.38c5.14-5.23,10.26-10.5,15.52-15.6
                c0.96-0.93,2.48-1.79,3.72-1.77c15.14,0.21,30.28,0.63,45.42,0.97c5.38,0.12,10.75,0.24,16.13,0.35c0.18,0,0.35-0.1,0.94-0.29
                c0.31-1.45,0.76-3.02,0.99-4.63c1.55-10.88,3.02-21.78,4.55-32.66c0.61-4.33,1.3-8.64,1.95-12.97
                c-31.38,0-62.27,0-93.54,0c0.83-3.87,1.53-7.35,2.33-10.8c1.2-5.17,2.52-10.31,3.71-15.48c0.43-1.86,0.95-3.39,3.41-3.4
                c12.78-0.08,25.55-0.36,38.33-0.44c13.27-0.08,26.55-0.04,39.82-0.02c1.79,0,3.58,0.16,5.79,0.27
                c0.82-4.35,1.58-8.42,2.36-12.49c1.24-6.53,2.52-13.05,3.74-19.58c0.61-3.28,1.12-6.58,1.8-10.65c-2.05,0-3.59,0-5.13,0
                c-27.71,0-55.42-0.02-83.13,0.03c-2.1,0-3.55,0.32-4.35,2.79C382.9,48.39,380.41,62.89,378.05,77.55z"/>
                        </svg>
                        <div className="flex flex-col">
                            <span className="font-rajdhani font-bold text-xl tracking-widest text-white">
                                PUMA VELOCITY
                            </span>
                            <span className="text-xs text-pumaGold font-inter tracking-wider">
                                FOREVER FASTER
                            </span>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Men', 'Women', 'Sports', 'Kids'].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="font-inter text-sm text-white/80 hover:text-pumaRed transition-colors relative group"
                            >
                                {link}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pumaRed transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-aggressive hidden sm:block"
                    >
                        Shop Now
                    </motion.button>

                    {/* Mobile Menu */}
                    <button className="md:hidden text-white p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
