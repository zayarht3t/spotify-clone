"use client";
import React from 'react';
import { twMerge } from 'tailwind-merge';
import {HiHome,HiSearch} from 'react-icons/hi'
import  {RxChevronLeft,RxChevronRight} from 'react-icons/rx'
import { useRouter } from 'next/navigation';
import Button from './Button';

type HeaderProps = {
    children: React.ReactNode,
    className?: string
};

const Header:React.FC<HeaderProps> = ({children,className}) => {
    const router = useRouter();
    return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`,className)}>
        <div className='w-full flex items-center justify-between mb-4'>
            <div className='hidden md:flex items-center gap-x-2'>
                <button className='w-full rounded-full flex items-center justify-center hover:opacity-75 bg-black' onClick={()=>router.back()}>
                    <RxChevronLeft size={35} className='text-white'/>
                </button>
                <button className='w-full rounded-full flex items-center justify-center hover:opacity-75 bg-black' onClick={()=>router.forward()}>
                    <RxChevronRight size={35} className='text-white'/>
                </button>
            </div>
            <div className='flex md:hidden gap-x-2'>
                <button className='w-full flex p-2 items-center justify-center rounded-full bg-white transition hover:opacity-75'>
                    <HiHome size={25} className='text-black'/>
                </button>
                <button className='w-full flex p-2 items-center justify-center rounded-full bg-white transition hover:opacity-75'>
                    <HiSearch size={25} className='text-black'/>
                </button>
            </div>
            <div className='flex items-center gap-2'>
                <div>
                <Button className='text-white  '>
                    Sign up
                </Button>

                </div>
                <div>
                <Button className='text-black bg-white'>
                    Login
                </Button>                
                </div>                
            </div>

        </div>
        {children}
    </div>)
}
export default Header;