"use client";

import AuthModal from '@/components/AuthModal';
import Modal from '@/components/Modal';
import UploadModal from '@/components/UploadModal';
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
        <AuthModal/>
        <UploadModal/>
        </>
    )
}
export default ModalProvider;