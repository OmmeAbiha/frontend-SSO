"use client";

import React, { useEffect, useState } from "react";
// Framer Motion
import { motion } from "framer-motion";
// Icon Sax
import {
  TickCircle,
  CloseCircle,
  Warning2,
  InfoCircle,
  Add,
} from "iconsax-reactjs";
// Sonner
import { toast as sonnerToast } from "sonner";
// Next Intl
import { useLocale, useTranslations } from "next-intl";
// Fonts
import iranYekanFont from "@/src/fonts/iranYekanFont";
import iranYekanFontNum from "@/src/fonts/iranYekanFontNum";
// Type
type ToastType = "success" | "error" | "warning" | "info" | "loading" | "custom";

interface ContentToastProps {
  status: ToastType;
  title: string;
  id: string | number;
  duration?: number;
  toast: typeof sonnerToast;
  progressBar?: boolean;
}

// Color + Background mapping
const getColor = (status: ToastType): string | undefined => {
  const map: Record<ToastType, string | undefined> = {
    success: "#22c55e",
    error: "#ef4444",
    warning: "#eab308",
    info: "#3b82f6",
    loading: "#6b7280",
    custom: "#6b7280",
  };
  return map[status];
};

const getStatusIcon = (status: ToastType) => {
  const iconProps = { size: 20, variant: "Bold" as const };
  const icons = {
    success: <TickCircle {...iconProps} color={getColor("success")} />,
    error: <CloseCircle {...iconProps} color={getColor("error")} />,
    warning: <Warning2 {...iconProps} color={getColor("warning")} />,
    info: <InfoCircle {...iconProps} color={getColor("info")} />,
  };
  return status in icons ? icons[status as keyof typeof icons] : null;
};

const statusClasses: Record<ToastType, { text: string; bg: string }> = {
  success: { text: "text-green-600", bg: "bg-green-100" },
  error: { text: "text-red-600", bg: "bg-red-100" },
  warning: { text: "text-yellow-600", bg: "bg-yellow-100" },
  info: { text: "text-blue-600", bg: "bg-blue-100" },
  loading: { text: "text-gray-600", bg: "bg-gray-100" },
  custom: { text: "text-gray-600", bg: "bg-gray-100" },
};

const ContentToast: React.FC<ContentToastProps> = ({
  status,
  title,
  id,
  duration = 5000,
  toast,
  progressBar = false
}) => {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const locale = useLocale();
  const isEnglish = locale === "en";
  const t = useTranslations("toast.status");

  // Handle toast timeout progress
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (duration / 50);
        if (prev >= 100) {
          clearInterval(interval);
          toast.dismiss(id);
          return 100;
        }
        return prev + increment;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isHovered, id, duration, toast]);

  const { text, bg } = statusClasses[status];
  const color = getColor(status);

  const fontClass = isEnglish
    ? iranYekanFont.variable + " font-IranYekanFont"
    : iranYekanFontNum.variable + " font-IranYekanFontNum";

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-lg p-2 flex flex-col gap-2 shadow-lg border border-border-2 bg-background text-toast-foreground ${fontClass}`}
    >
      {/* Top Section */}
      <div className="w-full flex justify-between items-start gap-20">
        <div className="flex gap-3 items-start">
          <div className={`fcc min-w-10 min-h-10 size-10 rounded-lg ${bg}`} style={{ color }}>
            {getStatusIcon(status)}
          </div>
          <div className="flex flex-col">
            <span className={`text-sm font-semibold capitalize ${text}`}>
              {t(status)}
            </span>
            <span className="text-xs text-tertiary-800 leading-5 w-full">
              {title}
            </span>
          </div>
        </div>
        <button
          onClick={() => toast.dismiss(id)}
          aria-label="Close toast"
          className={`${isEnglish ? "pr-1.5" : "pl-1.5"} pt-[9px]`}
        >
          <Add
            size={23}
            variant="Linear"
            className="rotate-45 text-tertiary-700"
          />
        </button>
      </div>

      {/* Progress Bar */}
      {progressBar && (
        <div className="h-1 bg-gray-200 mt-2 rounded-xl overflow-hidden">
          <motion.div
            className="h-full rounded-xl"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ type: "tween", ease: "linear", duration: 0.05 }}
          />
        </div>
      )}
    </div>
  );
};

export default ContentToast;