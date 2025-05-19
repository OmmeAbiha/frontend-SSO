import { ReactNode } from 'react';
// Vaul
import { Drawer } from 'vaul';
// Components
import Modal from './Modal';
// Hooks
import useIsMobile from '@/hooks/useIsMobile';
// Next Intl
import { useLocale } from 'next-intl';

interface ResponsiveDialogDrawerProps {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
    drawerProps?: {
        contentClassName?: string;
        overlayClassName?: string;
    };
    modalProps?: {
        className?: string;
        containerClassName?: string;
    };
    title?: string;
    headerContent?: ReactNode;
}

const ResponsiveDialogDrawer: React.FC<ResponsiveDialogDrawerProps> = ({
    children,
    open,
    setOpen,
    drawerProps,
    modalProps,
    title,
    headerContent
}) => {
    const isMobile = useIsMobile();
    const locale = useLocale();
    const isEnglish = locale === 'en';

    const defaultModalClass = 'bg-background w-screen h-screen md:w-[550px] md:h-[550px]';
    const defaultModalContainerClass = '';

    const defaultDrawerContentClass = 'bg-background px-3 py-4 md:p-5 rounded-t-3xl h-[50%]';
    const defaultDrawerOverlayClass = 'fixed inset-0 bg-black/30 cursor-pointer backdrop-filter overflow-y-auto backdrop-blur-sm';

    return (
        <>
            {isMobile ? (
                <Drawer.Root open={open} onOpenChange={setOpen}>
                    <Drawer.Portal>
                        <Drawer.Overlay className={`${drawerProps?.overlayClassName ?? defaultDrawerOverlayClass} `} />
                        <Drawer.Content className={`${drawerProps?.contentClassName ?? defaultDrawerContentClass} fixed bottom-0 left-0 right-0 outline-none`}>
                            <div className='flex relative border-b h-10 border-tertiary-200'>
                                <div className={`absolute top-1 ${isEnglish ? "left-2" : "right-2"}`}>
                                    <Drawer.Title className={`${title ? '' : "sr-only"} text-sm`}>{title}</Drawer.Title>
                                </div>
                                <div aria-hidden className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-5 cursor-move" />
                                <div className={`absolute ${isEnglish ? "right-2" : "left-2"}`}>
                                    {headerContent}
                                </div>
                            </div>
                            <div className="w-full h-full">{children}</div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            ) : (

                <Modal
                    isOpen={open}
                    setIsOpen={setOpen}
                    className={modalProps?.className ?? defaultModalClass}
                    containerClassName={modalProps?.containerClassName ?? defaultModalContainerClass}
                    title={title}
                    headerContent={headerContent}
                >
                    {children}
                </Modal>
            )}
        </>
    );
};

export default ResponsiveDialogDrawer;