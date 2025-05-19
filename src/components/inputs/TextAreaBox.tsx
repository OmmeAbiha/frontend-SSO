import React, { TextareaHTMLAttributes } from 'react'

interface TextAreaBoxProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  className?: string;
}

function TextAreaBox({ label, className, error, touched, ...rest }: TextAreaBoxProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="customTextAreaBox" className="mb-2 text-sm font-medium text-foreground/50">{label}</label>
      <textarea
        id="customTextAreaBox"
        className={`px-3 py-2 border rounded-lg shadow-sm focus:outline-none text-sm ${error && touched ? 'border-danger-400' : 'border-border-cta-natural focus:border-primary-main'} bg-background ${className}`}
        {...rest}
      />
      <div className='mt-1'>
        {error && touched ? (
          <span className='text-danger-400 font-bold text-[10px] p-0.5 px-2 bg-danger-300/20 rounded-[4px]'>{error}</span>
        ) : null}
      </div>
    </div>
  )
}

export default TextAreaBox;