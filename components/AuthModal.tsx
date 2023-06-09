"use client";

import React, { useEffect } from 'react';
import Modal from './Modal';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import {ThemeSupa} from '@supabase/auth-ui-shared'
import useAuthModal from '@/hooks/useAuthModal';
import { Close } from '@radix-ui/react-dialog';

type AuthModalProps = {
    
};

const AuthModal:React.FC<AuthModalProps> = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const {isOpen,onClose} = useAuthModal();

    const onChange = () => {
        if(!isOpen){
            onClose();
        }
    }

    useEffect(()=>{
        if(session){
            router.refresh();
            onClose();
        }
    },[session,router,onClose]);
    
    return (
        <Modal isOpen={isOpen} onChange={onChange} title='Welcome back' description='Login to your account'>
            <Auth supabaseClient={supabaseClient}
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#22c55e'
                        }
                    }
                }
            }}
            />
        </Modal>
    )
}
export default AuthModal;