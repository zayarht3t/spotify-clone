"use client"
import React from 'react';
import Image from 'next/image';
import {FaPlay} from 'react-icons/fa'
import { useRouter } from 'next/navigation';

type ListItemProps = {
    image: string,
    href: string,
    name: string,
};

const ListItem:React.FC<ListItemProps> = ({image,href,name}) => {
    const router = useRouter();
    
    return (
        <button onClick={()=>router.push('/like')} className=' relative group gap-3 space-x-4 flex items-center bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'>
            <div className='relative min-h-[64px] min-w-[64px]'>
                <Image
                className=' object-cover'
                src={image}
                alt='img'
                fill
                />
            </div>
            <p className='font-medium truncate py-5'>{name}</p>
            <div className=' rounded-full bg-green-500 p-3 flex items-center justify-center transition absolute opacity-0 hover:opacity-100 hover:scale-110 right-5'>
                <FaPlay size={23} className='text-black'/>
            </div>
        </button>
    )
}
export default ListItem;