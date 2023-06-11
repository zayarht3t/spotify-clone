"use client";

import React from 'react';
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import AuthModal from './AuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';

type LibraryProps = {
    songs: Song[]
};

const Library:React.FC<LibraryProps> = ({songs}) => {

    const authModal = useAuthModal();
    const {user} = useUser();
    const uploadModal = useUploadModal();

    const onClick = () => {
        if(!user){
            return authModal.onOpen();
        }


        return uploadModal.onOpen();
    }
    
    return (
        <div className='flex flex-col'>
            <div className='flex px-5 pt-4 justify-between items-center'>
                <div className=' inline-flex text-center gap-2'>
                    <TbPlaylist size={26} className='text-neutral-400'/>
                    <p className='text-neutral-400 text-md font-medium'>Your library</p>
                </div>
                <AiOutlinePlus onClick={onClick} size={21} className='text-neutral-400 hover:text-white cursor-pointer'/>
            </div>
            <div className='flex flex-col gap-y-4 mt-4 px-3'>
                {
                    songs.map(song=>
                        <MediaItem
                        key={song.id}
                        onClick={()=>{}}
                        data={song}
                        />
                    )
                }
            </div>
        </div>
    )
}
export default Library;