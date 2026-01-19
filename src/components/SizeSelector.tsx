'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { product } from '@/data/product';

interface SizeSelectorProps {
    selectedSize: string;
    onSizeChange: (size: string) => void;
}

export default function SizeSelector({ selectedSize, onSizeChange }: SizeSelectorProps) {
    const [showSizeGuide, setShowSizeGuide] = useState(false);

    // Simulate some sizes being out of stock
    const outOfStock = ['UK 6', 'UK 11'];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-rajdhani font-semibold text-lg text-white">
                    Select Size
                </h3>
                <button
                    onClick={() => setShowSizeGuide(true)}
                    className="font-inter text-sm text-pumaRed hover:text-pumaGold transition-colors underline underline-offset-2"
                >
                    Size Guide
                </button>
            </div>

            {/* Size Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {product.buyNowSection.sizes.map((size) => {
                    const isOutOfStock = outOfStock.includes(size);
                    const isSelected = selectedSize === size;

                    return (
                        <motion.button
                            key={size}
                            whileHover={!isOutOfStock ? { scale: 1.05, y: -2 } : {}}
                            whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
                            onClick={() => !isOutOfStock && onSizeChange(size)}
                            disabled={isOutOfStock}
                            className={`
                relative py-3 px-2 rounded-lg font-inter text-sm font-medium
                transition-all duration-300 border
                ${isSelected
                                    ? 'bg-pumaRed text-white border-pumaRed shadow-lg shadow-pumaRed/30'
                                    : isOutOfStock
                                        ? 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed'
                                        : 'bg-white/5 text-white border-white/20 hover:border-pumaRed hover:bg-pumaRed/10'
                                }
              `}
                        >
                            {size}

                            {/* Out of Stock Indicator */}
                            {isOutOfStock && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-px bg-white/30 rotate-45 transform origin-center" />
                                </div>
                            )}

                            {/* Selected Indicator */}
                            {isSelected && (
                                <motion.div
                                    layoutId="selectedSize"
                                    className="absolute inset-0 rounded-lg border-2 border-pumaRed"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Selected Size Display */}
            <AnimatePresence mode="wait">
                {selectedSize && (
                    <motion.p
                        key={selectedSize}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 font-inter text-sm text-white/60"
                    >
                        Selected: <span className="text-pumaRed font-semibold">{selectedSize}</span>
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Size Guide Modal */}
            <AnimatePresence>
                {showSizeGuide && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowSizeGuide(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-pumaGray border border-white/10 rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-rajdhani font-bold text-2xl text-white">Size Guide</h3>
                                <button
                                    onClick={() => setShowSizeGuide(false)}
                                    className="text-white/60 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="py-3 px-2 text-left font-rajdhani font-semibold text-white">UK</th>
                                            <th className="py-3 px-2 text-left font-rajdhani font-semibold text-white">US</th>
                                            <th className="py-3 px-2 text-left font-rajdhani font-semibold text-white">EU</th>
                                            <th className="py-3 px-2 text-left font-rajdhani font-semibold text-white">CM</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-inter text-white/70">
                                        {[
                                            { uk: 6, us: 7, eu: 40, cm: 25 },
                                            { uk: 7, us: 8, eu: 41, cm: 26 },
                                            { uk: 8, us: 9, eu: 42, cm: 27 },
                                            { uk: 9, us: 10, eu: 43, cm: 28 },
                                            { uk: 10, us: 11, eu: 44, cm: 29 },
                                            { uk: 11, us: 12, eu: 45, cm: 30 },
                                            { uk: 12, us: 13, eu: 46, cm: 31 },
                                        ].map((row) => (
                                            <tr key={row.uk} className="border-b border-white/5">
                                                <td className="py-3 px-2">{row.uk}</td>
                                                <td className="py-3 px-2">{row.us}</td>
                                                <td className="py-3 px-2">{row.eu}</td>
                                                <td className="py-3 px-2">{row.cm}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-6 text-xs text-white/40 font-inter">
                                Tip: For running shoes, we recommend ordering half a size up from your usual size for optimal comfort.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
