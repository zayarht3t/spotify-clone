"use client";
import React from 'react';
import { twMerge } from 'tailwind-merge';
import {HiHome,HiSearch} from 'react-icons/hi'
import  {RxChevronLeft,RxChevronRight} from 'react-icons/rx'
import { useRouter } from 'next/navigation';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import {FaUserAlt} from 'react-icons/fa'


type HeaderProps = {
    children: React.ReactNode,
    className?: string
};

const Header:React.FC<HeaderProps> = ({children,className}) => {
    const router = useRouter();
    const AuthModal = useAuthModal();
    const {user} = useUser();
    const SupabaseClient = useSupabaseClient();


    const handleLogout =async ()=>{
        const {error} = await SupabaseClient.auth.signOut();

        router.refresh();
        if(error) {
            console.log(error);
        }
    }
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
            {
                user && (
                    <div className='flex items-center space-x-4'>
                        <Button
                         className='
                         bg-white
                         text-black
                         px-6
                         py-2
                         '
                         onClick={handleLogout}
                        >
                            Logout
                        </Button>
                        <Button
                         className='
                          bg-white
                         '
                         onClick={()=>router.push("/account")}
                        >
                            <FaUserAlt/>
                        </Button>
                    </div>
                )
            }
            {
                !user && (
                    <div className='flex items-center gap-2'>
                        <div>
                            <Button className='text-white' onClick={AuthModal.onOpen}>
                                Sign up
                            </Button>

                    </div>
                    <div>
                        <Button className='text-black bg-white' onClick={AuthModal.onOpen}>
                            Login
                        </Button>                
                    </div>                
                </div>
                )
            }

        </div>
        {children}
    </div>)
}
export default Header;