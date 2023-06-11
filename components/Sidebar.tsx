'use client';

import React, { useMemo } from 'react';
import {usePathname} from 'next/navigation'
import  {HiHome} from 'react-icons/hi'
import {BiSearch} from 'react-icons/bi'
import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';
import { Song } from '@/types';

interface SidebarProps {
    children: React.ReactNode
    songs: Song[]
    
};

const Sidebar:React.FC<SidebarProps> = ({children,songs}) => {

    const pathname = usePathname();
    
    const routes = useMemo(() => [
        {
          icon: HiHome,
          label: 'Home',
          active: pathname !== '/search',
          href: '/'
        },
        {
          icon: BiSearch,
          label: 'Search',
          href: '/search',
          active: pathname === '/search'
        },
      ], [pathname]);

    return (
        <div className='h-full flex'>
            <div 
            className='
              h-full
              hidden
              md:flex
              flex-col
              items-center
              justify-between
              gap-y-2
              w-[300px]
              p-2
              bg-black
            '
            >
              <Box>
                <div className='px-5 py-4 flex flex-col gap-y-4'>
                  {
                    routes.map(item=>(
                      <SidebarItem key={item.label} {...item}/>
                    ))
                  }
                </div>
              </Box>
              <Box className='overflow-y-auto h-full'>
                <Library songs={songs}/>
              </Box>

            </div>
            <main className='h-full overflow-x-auto flex-1 py-2'>
              {children}
            </main>
        </div>
    )
}
export default Sidebar;