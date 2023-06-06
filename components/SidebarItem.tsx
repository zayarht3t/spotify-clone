import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

type SidebarItemProps = {
    icon: IconType,
    label: string,
    href: string,
    active?: boolean,
};

const SidebarItem:React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    href,
    active
}) => {
    
    return (
    <Link
    href={href}
    className={
        twMerge(`
        text-neutral-400
        hover:text-white
        font-medium
        flex
        flex-row
        h-auto
        py-1
        transition
        w-full
        gap-x-4
        items-center
        text-md
        `, active && "text-white")
    }
    >
        <Icon size={26}/>
        <p className='w-full truncate'>{label}</p>
    </Link>)
}
export default SidebarItem;