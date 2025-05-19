import React, { useEffect, useState } from 'react'
//react icons
import { HiCheckCircle, HiXCircle, HiExclamationCircle, HiX } from 'react-icons/hi'
import { toast } from 'react-hot-toast'

interface CustomToastProps {
    status: 'success' | 'error' | 'warning' | 'info';
    title: string;
    id: string;
    duration: number;}

function CustomToast({ status, title, id, duration}: CustomToastProps) {
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const getProgressBarColor = () => {
        switch (status) {
            case 'success':
                return 'bg-status-success';
            case 'error':
                return 'bg-danger-400';
            case 'warning':
                return 'bg-status-warning';
            case 'info':
                return 'bg-status-info';
            default:
                return 'bg-blue-500';
        }
    };

    useEffect(() => {
        if (!isHovered) {
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
        }
    }, [isHovered, id, duration]);

    return (
        <div
            className={`rounded-md p-4 flex flex-col justify-between w-80 bg-toast text-toast-foreground mr-5 mb-4`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="fcc">
                    <div className="flex-shrink-0 ml-1">
                        {status === 'success' && <HiCheckCircle className="h-5 w-5 text-status-success" aria-hidden="true" />}
                        {status === 'warning' && <HiExclamationCircle className="h-5 w-5 text-status-warning" aria-hidden="true" />}
                        {status === 'error' && <HiXCircle className="h-5 w-5 text-danger-400" aria-hidden="true" />}
                        {status === 'info' && <HiExclamationCircle className="h-5 w-5 text-status-info" aria-hidden="true" />}
                    </div>
                    <div className='text-sm'>{title}</div>
                </div>
                <button onClick={() => toast.dismiss(id)}>
                    <HiX className="h-[14px] w-[14px]" aria-hidden="true" />
                </button>
            </div>
            <div className="h-1 bg-gray-200 mt-2 rounded-xl">
                <div className={`h-full rounded-xl ${getProgressBarColor()}`} style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}

export default CustomToast