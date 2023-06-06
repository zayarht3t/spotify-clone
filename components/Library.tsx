import React from 'react';
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'

type LibraryProps = {
    
};

const Library:React.FC<LibraryProps> = () => {
    
    return (
        <div className='flex flex-col'>
            <div className='flex px-5 pt-4 justify-between items-center'>
                <div className=' inline-flex text-center gap-2'>
                    <TbPlaylist size={26} className='text-neutral-400'/>
                    <p className='text-neutral-400 text-md font-medium'>Your library</p>
                </div>
                <AiOutlinePlus size={21} className='text-neutral-400 hover:text-white cursor-pointer'/>
            </div>
            <div className='flex flex-col gap-y-4 mt-4 px-3'>
                List of songs
            </div>
        </div>
    )
}
export default Library;