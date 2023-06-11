import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import React from 'react';

type MediaItemProps = {
    onClick?: ()=>void;
    data: Song
};

const MediaItem:React.FC<MediaItemProps> = ({data}) => {

    const imagePath = useLoadImage(data);
    
    return (
        <div
         className='
          flex
          items-center
          gap-x-3
          p-2
          rounded-md
          w-full
          cursor-pointer
          hover:bg-neutral-800/50
         '
        >
            <div
            className='
            relative
            min-h-[48px]
            min-w-[48px]
            overflow-hidden
            rounded-md
            '
            >
                <Image
                fill
                className='object-cover'
                src={imagePath || 'images/liked.png'}
                alt='image'
                />

            </div>
            <div
             className='
             flex
             flex-col
             gap-y-1
             overflow-hidden
             '
            >
                <p className='text-white truncate'>
                    {data.title}
                </p>
                <p className='text-sm text-neutral-400 truncate'>
                    {data.author}
                </p>
            </div>

        </div>
    )
}
export default MediaItem;