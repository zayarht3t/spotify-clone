"use client";

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import { data } from 'autoprefixer';
import Image from 'next/image';
import React from 'react';
import PlayButton from './PlayButton';

type SontItemProps = {
    onClick: ()=>void;
    data: Song
};

const SontItem:React.FC<SontItemProps> =async ({data,onClick}) => {
    const imagePath =  useLoadImage(data);
    return ( 
        <div
          onClick={() => onClick()} 
          className="
            relative 
            group 
            flex 
            flex-col 
            items-center 
            justify-center 
            rounded-md 
            overflow-hidden 
            gap-x-4 
            bg-neutral-400/5 
            cursor-pointer 
            hover:bg-neutral-400/10 
            transition 
            p-3
          "
        >
          <div 
            className="
              relative 
              aspect-square 
              w-full
              h-full 
              rounded-md 
              overflow-hidden
            "
          >
            <Image
              className="object-cover"
              src={imagePath || '/images/music-placeholder.png'}
              fill
              alt="Image"
            />
          </div>
          <div className="flex flex-col items-start w-full pt-4 gap-y-1">
            <p className="font-semibold truncate w-full">
              {data.title}
            </p>
            <p 
              className="
                text-neutral-400 
                text-sm 
                pb-4 
                w-full 
                truncate
              "
            >
              By {data.author}
            </p>
          </div>
          <div 
            className="
              absolute 
              bottom-24 
              right-5
            "
          >
            <PlayButton />
          </div>
        </div>
       );
}
export default SontItem;