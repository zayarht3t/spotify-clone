"use client";

import useDebounce from '@/hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import qs from 'query-string'
import { useRouter } from 'next/navigation';
import Input from './Input';

type SearchInputProps = {
    
};

const SearchInput:React.FC<SearchInputProps> = () => {
    const [value,setValue] = useState<string>();
    const debouncedValue = useDebounce(value,500)
    const router = useRouter();

    useEffect(()=>{
        const query = {
            title: debouncedValue
        }

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        })

        router.push(url)
    },[debouncedValue,router])
    
    return (
        <Input
        value={value}
        placeholder='What do you want to listen?'
        onChange={(e)=>setValue(e.target.value)}
        />
    )
}
export default SearchInput;