"use client";

// Sonner
import { toast, Toaster } from "sonner";
// Component
import ContentToast from "./ContentToast";
// Next Themes
import { useTheme } from "next-themes";

type ToastOptions = {
    duration?: number;
    [key: string]: any;
};

export const CustomToastProvider = () => {
    const { theme } = useTheme();

    return (
        <Toaster
            position="top-right"
            richColors
            // closeButton
            expand={false}
            visibleToasts={5}
            invert={true}
            // offset={16}
            // gap={20}
            swipeDirections={['left', 'right']}
            theme={theme as "light" | "dark" | "system" | undefined}
            toastOptions={{
                style: {
                    fontSize: "0.875rem",
                },
            }}
        />
    );
};

type ToastType = "success" | "error" | "warning" | "info" | "loading" | "custom";

export const toastHandler = (
    type: ToastType,
    message: string,
    options?: ToastOptions
) => {

    const defaultDuration = 5000;
    const customDuration = options?.duration ?? defaultDuration;

    const renderContentToast = (status: ToastType) =>
        toast.custom(
            (t) => (
                <ContentToast
                    status={status}
                    title={message}
                    id={t}
                    duration={customDuration}
                    toast={toast}
                />
            ),
            { duration: customDuration }
        );

    switch (type) {
        case "success":
        case "error":
        case "warning":
        case "info":
            renderContentToast(type);
            break;
        // case "loading":
        //     toast.loading(message, { ...options, duration: customDuration });
        //     break;
        // case "custom":
        //     toast.custom(
        //         (t) => (
        //             <div className="bg-orange-300 p-4 rounded-md text-white">
        //                 <h1 className="font-bold mb-2">Custom toast</h1>
        //                 <button
        //                     className="bg-white text-orange-300 px-2 py-1 rounded"
        //                     onClick={() => toast.dismiss(t)}
        //                 >
        //                     Dismiss
        //                 </button>
        //             </div>
        //         ),
        //         { duration: customDuration }
        //     );
        //     break;
        default:
            toast(message, { ...options, duration: customDuration });
    }
};

export const handleApiToast = (response: any, successMessage?: string) => {
    if (response?.status === 200 || response?.status === 201) {
        toastHandler(
            "success",
            successMessage || "عملیات با موفقیت انجام شد",
            { duration: 3000 }
        );
        return true;
    } else {
        const errorMessage =
            response?.data?.message ||
            "خطایی رخ داده است. لطفاً مجدداً تلاش کنید";
        toastHandler("error", errorMessage, { duration: 5000 });
        return false;
    }
};