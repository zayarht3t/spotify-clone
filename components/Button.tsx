import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    
};

const Button = forwardRef<HTMLButtonElement,ButtonProps>(({
    disabled,
    className,
    children,
    type = 'button',
    ...props
},ref)=>{
    return (
        <button
        type={type}
        className= {twMerge(`w-full h-full rounded-full border border-transparent px-3 py-2  disabled:cursor-not-allowed disabled:opacity-50 font-bold text-black hover:opacity-75 transition `,className)}
        disabled={disabled}
        ref={ref}
        {...props}
>
    {children}

        </button>
    )
})
export default Button;