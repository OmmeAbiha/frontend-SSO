import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import LoadingBox from './LoadingBox';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  title?: string;
  loading?: boolean;
  loadingIcon?: ReactNode;
  fontSize?: string;
  fullWidth?: boolean;
  variant?: 'solid' | 'outline' | 'ghost';
  iconPosition?: 'start' | 'end';
  children?: ReactNode; // Add children prop
}

const Button: React.FC<ButtonProps> = ({
  icon,
  title,
  type = 'button',
  disabled = false,
  loading = false,
  loadingIcon,
  fontSize = 'text-base',
  fullWidth = true,
  variant = 'solid',
  className,
  iconPosition = 'start',
  children, // Destructure children
  ...props
}) => {
  const isDisabled = disabled || loading;

  const baseClasses =
    'transition-colors duration-300 rounded-lg h-12 px-4 fcc gap-x-2 font-bold overflow-hidden';

  const variantBaseClasses = {
    solid: 'bg-primary-main text-white',
    outline: 'border border-primary-main text-primary-main',
    ghost: 'text-primary-main',
  };

  const variantHoverClasses = {
    solid: 'hover:bg-primary-dark',
    outline: 'hover:bg-primary-light',
    ghost: 'hover:bg-primary-light',
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={clsx(
        baseClasses,
        fontSize,
        fullWidth && 'w-full',
        isDisabled && 'opacity-60 cursor-not-allowed',
        variantBaseClasses[variant],
        !isDisabled && variantHoverClasses[variant],
        className
      )}
      {...props}
    >
      {loading ? (
        loadingIcon || <LoadingBox size={30} color={variant === 'outline' ? '#FDB612' : '#262626'} />
      ) : (
        children || (
          <>
            {icon && iconPosition === 'start' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            <div>{title}</div>
            {icon && iconPosition === 'end' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
          </>
        )
      )}
    </button>
  );
};

export default Button;
