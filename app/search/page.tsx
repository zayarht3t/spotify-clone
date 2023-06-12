import getSongsByTitle from '@/actions/getSongsByTitle';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import React from 'react';
import SearchContent from './SearchContent';

type pageProps = {
    searchParams: {
        title: string
    }
};

const Search:React.FC<pageProps> =async ({searchParams}) => {
    const songs = await getSongsByTitle(searchParams.title);
    
    return (
        <div
         className='
          bg-neutral-900
          w-full
          h-full
          overflow-hidden
          rounded-lg
          overflow-y-auto
         '
        >
            <Header className=' from-bg-neutral-900'>
                <div className='flex flex-col gap-y-6 mb-2'>
                    <h1 className='text-white text-3xl font-semibold'>
                        Search
                    </h1>
                    <SearchInput/>
                </div>
            </Header>
            <SearchContent songs={songs}/>
        </div>
    )
}
export default Search;