'use client';

import React, { useState, forwardRef, InputHTMLAttributes } from 'react';
// IconSax
import { Eye } from 'iconsax-reactjs';
// Framer Motion
import { motion, AnimatePresence } from 'framer-motion';
// Components
import TextBox from './TextBox';
// I18n
import { useLocale } from 'next-intl';

interface PasswordTextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    touched?: boolean;
    className?: string;
}

const PasswordTextBox = forwardRef<HTMLInputElement, PasswordTextBoxProps>(
    ({ label, error, touched, className, value, ...rest }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const locale = useLocale();
        const isEnglish = locale === 'en';

        return (
            <div className="relative w-full">
                <TextBox
                    ref={ref}
                    label={label}
                    error={error}
                    touched={touched}
                    type={showPassword ? 'text' : 'password'}
                    className={`${className ?? ''}`}
                    value={value}
                    {...rest}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-3.5 z-10 outline-none ${isEnglish ? 'right-3' : 'left-3'}`}
                    tabIndex={-1}
                >
                    <div className="relative">
                        <Eye size={20} variant="Linear" className={`${error && touched ? 'text-danger-400' : 'text-tertiary-500'}`} />
                        <AnimatePresence>
                            {!showPassword && (
                                <motion.svg
                                    width="18"
                                    height="18"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        pointerEvents: 'none',
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                >
                                    <motion.line
                                        x1="17"
                                        y1="3"
                                        x2="3"
                                        y2="17"
                                        stroke={error && touched ? '#87172294' : '#7575757b'}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        className="rounded-full"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        exit={{ pathLength: 0, opacity: 0 }}
                                        transition={{
                                            pathLength: { duration: 0.35, ease: 'easeInOut', delay: 0 },
                                            opacity: { duration: 0.2, ease: 'easeInOut', delay: 0 }
                                        }}
                                    />
                                </motion.svg>
                            )}
                        </AnimatePresence>
                    </div>
                </button>
            </div>
        );
    }
);

PasswordTextBox.displayName = 'PasswordTextBox';

export default PasswordTextBox;