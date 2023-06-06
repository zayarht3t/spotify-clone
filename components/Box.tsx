import React from 'react';
import {twMerge} from 'tailwind-merge'

type BoxProps = {
    children: React.ReactNode,
    className?: string
    
};

const Box:React.FC<BoxProps> = ({children,className}) => {
    
    return <div className={
        twMerge(` w-full h-fit bg-neutral-900 rounded-lg`, className)
    }
    >
        {children}
        </div>
}
export default Box;