import { createPortal } from 'react-dom';
import { FC, ReactNode, useEffect, useRef } from 'react';
// Iconsax
import { CloseSquare } from 'iconsax-reactjs';
// Framer Motion
import { motion, AnimatePresence } from 'framer-motion';
// Function
import getScrollbarWidth from "@/functions/getScrollbarWidth";
// Next Intl
import { useLocale } from 'next-intl';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    className?: string;
    containerClassName?: string;
    children: ReactNode;
    title?: string;
    headerContent?: ReactNode;
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
};

const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, className = '', containerClassName = '', children, title, headerContent }) => {
    const modalContentRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const isEnglish = locale === 'en';

    useEffect(() => {
        const header = document.getElementById("header_dashboard");

        const updateScrollbar = () => {
            const scrollBarWidth = getScrollbarWidth();
            document.body.style.overflowY = "hidden";
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            if (header) header.style.paddingRight = `${scrollBarWidth}px`;
        };

        if (isOpen) {
            updateScrollbar();
            window.addEventListener("resize", updateScrollbar);
        } else {
            document.body.style.overflowY = "";
            document.body.style.paddingRight = "";
            if (header) header.style.paddingRight = "";
        }

        return () => {
            document.body.style.overflowY = "";
            document.body.style.paddingRight = "";
            if (header) header.style.paddingRight = "";
            window.removeEventListener("resize", updateScrollbar);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !modalContentRef.current) return;

        const updateAlignment = () => {
            const modalHeight = modalContentRef.current!.offsetHeight;
            const viewportHeight = window.innerHeight;
            const wrapper = document.getElementById("modal_wrapper");
            if (wrapper) {
                wrapper.style.alignItems = modalHeight > viewportHeight ? "flex-start" : "center";
            }
        };

        updateAlignment();

        const resizeObserver = new ResizeObserver(updateAlignment);
        resizeObserver.observe(modalContentRef.current);
        window.addEventListener('resize', updateAlignment);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateAlignment);
        };
    }, [isOpen]);

    const closeModal = () => {
        setIsOpen(false);
    };

    if (typeof window === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="backdrop"
                    id="modal_wrapper"
                    className={`fixed inset-0 z-40 flex justify-center items-center overflow-y-auto md:p-5 ${containerClassName}`}
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={closeModal}
                    style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                >
                    <motion.div
                        ref={modalContentRef}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.1 }}
                        onClick={(e) => e.stopPropagation()}
                        className={`
                            ${className} bg-background md:rounded-3xl w-[300px] mx-auto overflow-hidden relative
                        `}
                    >
                        {
                            title && (
                                <div className='fcc p-3 border-b border-tertiary-100'>
                                    <span className='font-bold text-tertiary-800'>{title}</span>
                                </div>
                            )
                        }
                        <span onClick={closeModal} className={`absolute top-2 ${isEnglish ? "right-2" : "left-2"} h-8 w-8 fcc cursor-pointer rounded-full hover:bg-tertiary-100 transition-colors duration-300`}>
                            <CloseSquare size={18} className={`text-tertiary-900`} />
                        </span>
                        {
                            headerContent && (
                                <div className={`absolute top-2 ${isEnglish ? "left-2" : "right-2"}`}>
                                    {headerContent}
                                </div>
                            )
                        }

                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Modal;