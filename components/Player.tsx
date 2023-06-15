"use client"
import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer';
import React from 'react';

type PlayerProps = {
    
};

const Player:React.FC<PlayerProps> = () => {

    const player = usePlayer();
    const {song} = useGetSongById(player.activeId);

    const songUrl = useLoadSongUrl(song!);

    if(!song || !songUrl || !player.activeId){
        return null;
    } 
    
    return (
        <div
         className='
          w-full
          fixed
          bottom-0
          h-[80px]
          bg-black
          px-4
          py-2
         '
        >
            Player!
        </div>
    )
}
export default Player;