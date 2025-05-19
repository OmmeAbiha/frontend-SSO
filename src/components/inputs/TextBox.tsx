import React, { InputHTMLAttributes, forwardRef } from 'react';
// Next Intl
import { useLocale } from 'next-intl';

interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  className?: string;
}

const TextBox = forwardRef<HTMLInputElement, TextBoxProps>(
  ({ label, className, error, touched, ...rest }, ref) => {
    const locale = useLocale();
    const isEnglish = locale === 'en';

    return (
      <div className={`flex flex-col relative ${className}`}>
        <label
          htmlFor={rest.id || 'customTextBox'}
          className={`absolute bg-background rounded-sm px-1 -top-2 ${
            isEnglish ? 'left-3' : 'right-3'
          } pointer-events-none transition-all duration-500 font-medium text-[11px] ${
            error && touched ? 'text-danger-400' : 'text-tertiary-600'
          }`}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={rest.id || 'customTextBox'}
          className={`h-12 py-2 px-3 border rounded-lg caret-primary-medium focus:outline-none text-sm ${
            error && touched ? 'border-danger-400' : 'border-border-2 focus:border-primary-main'
          } bg-background ${className}`}
          {...rest}
        />
        <div className="mt-1">
          {error && touched ? (
            <span className="text-danger-400 font-bold text-[10px] p-0.5 px-2 bg-danger-300/20 rounded-[4px]">
              {error}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);

TextBox.displayName = 'TextBox';

export default TextBox;