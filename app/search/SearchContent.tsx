'use client'
import LikeButton from '@/components/LikeButton';
import MediaItem from '@/components/MediaItem';
import PlayButton from '@/components/PlayButton';
import { Song } from '@/types';
import React from 'react';

type SearchContentProps = {
    songs: Song[]
};

const SearchContent:React.FC<SearchContentProps> = ({songs}) => {
    let ModifiedSongs = songs.flat();
        if(songs.length == 0) {
            return (
                <div className='flex flex-col px-6  w-full text-neutral-400 gap-y-2'>
                    No songs found
                </div>
            )
        }    
    return (
        <div className='flex flex-col px-6 w-full text-neutral-400 gap-y-2'>
            {
                ModifiedSongs.map((song)=>(
                    <div className='flex items-center gap-x-4 w-full' key={song.id}>
                        <div className='flex-1'>
                            <MediaItem
                             data={song}
                             onClick={()=>{}}
                            />
                        </div>
                        <LikeButton songid={song.id} />
                    </div>
                ))
            }
        </div>

    )
}
export default SearchContent;