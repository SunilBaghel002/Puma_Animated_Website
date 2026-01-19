'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    const footerLinks = {
        brand: {
            title: 'Brand Story',
            links: ['Our History', 'Athletes', 'Sustainability', 'Innovation Lab', 'Careers'],
        },
        shop: {
            title: 'Shop',
            links: ['Men', 'Women', 'Kids', 'Sports', 'Accessories', 'Sale'],
        },
        support: {
            title: 'Support',
            links: ['Contact Us', 'Size Guide', 'Shipping', 'Returns', 'Track Order', 'FAQ'],
        },
    };

    const socialIcons = [
        { name: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
        { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
        { name: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
        { name: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
    ];

    return (
        <footer className="relative bg-[#0A0A0A] pt-20 pb-8 overflow-hidden">
            {/* Diagonal Red Stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pumaRed via-pumaGold to-pumaRed" />

            {/* Diagonal Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(228, 42, 42, 0.5) 20px, rgba(228, 42, 42, 0.5) 40px)'
                }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <svg
                                width="40"
                                height="28"
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
                            <span className="font-rajdhani font-bold text-2xl tracking-widest text-white">PUMA</span>
                        </div>
                        <p className="text-white/60 font-inter text-sm leading-relaxed mb-6 max-w-sm">
                            Forever Faster. Since 1948, PUMA has been pushing the boundaries of sport and style.
                            The Velocity X represents our commitment to innovation and athletic excellence.
                        </p>

                        {/* Newsletter */}
                        <div className="mb-8">
                            <h4 className="font-rajdhani font-semibold text-white mb-3">Stay Updated</h4>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-2 text-white text-sm font-inter focus:outline-none focus:border-pumaRed transition-colors"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-pumaRed text-white px-6 py-2 font-rajdhani font-semibold text-sm diagonal-clip hover:bg-pumaRed/80 transition-colors"
                                >
                                    Subscribe
                                </motion.button>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {socialIcons.map((icon) => (
                                <motion.a
                                    key={icon.name}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pumaRed/20 hover:border-pumaRed/50 transition-all"
                                >
                                    <svg className="w-5 h-5 text-white/70 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={icon.path} />
                                    </svg>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.values(footerLinks).map((section) => (
                        <div key={section.title}>
                            <h4 className="font-rajdhani font-bold text-white text-lg mb-6 relative">
                                {section.title}
                                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-pumaRed" />
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-white/60 hover:text-pumaRed font-inter text-sm transition-colors inline-block"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/40 font-inter text-sm">
                            © 2024 PUMA SE. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-white/40 hover:text-white font-inter text-sm transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-white/40 hover:text-white font-inter text-sm transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-white/40 hover:text-white font-inter text-sm transition-colors">
                                Cookie Settings
                            </a>
                        </div>
                    </div>
                </div>

                {/* Forever Faster Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-12 text-center"
                >
                    <span className="font-rajdhani font-bold text-6xl md:text-8xl text-white/5 tracking-widest">
                        FOREVER FASTER
                    </span>
                </motion.div>
            </div>
        </footer>
    );
}
