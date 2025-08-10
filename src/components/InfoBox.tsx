import React from 'react'
import {
    InfoCircle,
    Warning2,
    Danger,
    TickCircle,
    Add
} from 'iconsax-reactjs'
import { useLocale } from 'next-intl'

type InfoBoxType = 'info' | 'warning' | 'error' | 'success'

interface InfoBoxProps {
    type: InfoBoxType
    message: string
    title?: string
    className?: string
    onClose?: () => void
}

const ICONS = {
    info: InfoCircle,
    warning: Warning2,
    error: Danger,
    success: TickCircle,
}

const COLORS = {
    info: {
        border: 'border-info-300',
        bg: 'bg-info-100',
        text: 'text-info-300',
        icon: 'text-info-300',
    },
    warning: {
        border: 'border-warning-300',
        bg: 'bg-warning-100',
        text: 'text-warning-300',
        icon: 'text-warning-300',
    },
    error: {
        border: 'border-danger-300',
        bg: 'bg-danger-100',
        text: 'text-danger-300',
        icon: 'text-danger-300',
    },
    success: {
        border: 'border-success-300',
        bg: 'bg-success-100',
        text: 'text-success-300',
        icon: 'text-success-300',
    },
}

export const InfoBox: React.FC<InfoBoxProps> = ({
    type,
    message,
    title,
    className = '',
    onClose,
}) => {
    const Icon = ICONS[type]
    const color = COLORS[type]
    const locale = useLocale();
    const isEnglish = locale === 'en';

    return (
        <div
            className={`
        flex gap-3 p-3 rounded-lg border relative
        ${color.border} ${color.bg} ${className} ${title ? "items-start" : "items-center"}
      `}
        >
            <div className={`h-full`}>
                <Icon size={24} className={`${color.icon}`} />
            </div>
            <div className="flex flex-col">
                {title && <strong className={`text-sm mb-1.5 ${color.text}`}>{title}</strong>}
                <p className={`text-xs flex items-center h-full leading-5 ${color.text}`}>{message}</p>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className={`absolute top-1 ${isEnglish ? "right-1" : "left-1"} ${color.text}`}
                    aria-label="Close"
                >
                    <Add size={18} className='rotate-45' />
                </button>
            )}
        </div>
    )
}