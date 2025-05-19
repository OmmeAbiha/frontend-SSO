import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

interface LoadingBoxProps {
    color?: string;
    size?: string | number;
}

const LoadingBox: React.FC<LoadingBoxProps> = ({ color = "#262626", size = "60" }) => {
    return (
        <div className='w-full h-full fcc'>
            <ThreeDots
                height={size}
                width={size}
                radius="9"
                color={color}
                ariaLabel="three-dots-loading"
                visible={true}
            />
        </div>
    );
};

export default LoadingBox;