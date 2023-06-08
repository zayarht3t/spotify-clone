"use client";

import Modal from '@/components/Modal';
import React, { useEffect, useState } from 'react';

type ModalProviderProps = {
    
};

const ModalProvider:React.FC<ModalProviderProps> = () => {

    const [isMounted,setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[isMounted])

    if(!isMounted){
        return null;
    }
    
    return (
        <>
        <Modal title='Test title' description='test description' isOpen onChange={()=>{}}/>
        </>
    )
}
export default ModalProvider;