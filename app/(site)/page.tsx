"use client"
import getSongs from '@/actions/getSongs';
import Header from '@/components/Header'
import ListItem from '@/components/ListItem'
import Image from 'next/image'
import PageContent from './components/PageContent';


export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const modifiedSongs = songs.flat();
  return (
    <div
     className='bg-neutral-900 overflow-hidden overflow-y-auto rounded-lg w-full h-full'
    >
      <Header>
        <div className='mb-2'>
            <h1 className='text-3xl font-semibold text-white'>Welcome Back..</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
              <ListItem image={`/images/liked.png`} name='Liked songs' href='liked'/>
            </div>
        </div>
      </Header>
      <div className='mt-2 mb-7 px-6'>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold text-2xl text-white'>
              Newest songs
          </h1>
        </div>
        <div>
          <PageContent songs={modifiedSongs}/>
        </div>
      </div>
    </div>
  )
}
