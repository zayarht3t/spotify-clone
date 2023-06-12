"use client"
import useAuthModal from '@/hooks/useAuthModal';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { error } from 'console';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

type LikeButtonProps = {
    songid: string
};

const LikeButton:React.FC<LikeButtonProps> = ({songid}) => {
    const {supabaseClient} = useSessionContext();
    const router = useRouter();
    const AuthModal = useAuthModal();
    const {user} = useUser();
    const [isLike,setIsLike] = useState(false);

    useEffect(()=>{
        if(!user?.id){
            return;
       }

       const fetchData = async()=>{
        const {data,error} = await supabaseClient.from('liked_songs')
            .select("*")
            .eq("user_id", user.id)
            .eq("song_id",songid)
            .single();    
            if(!error && data){
                setIsLike(true);
            }
       }

       fetchData()
   
    },[songid,supabaseClient,user?.id])

    const Icon = isLike ? AiFillHeart : AiOutlineHeart;


    const handleLike =async ()=>{
        if(!user){
            return AuthModal.onOpen();
        }

        if(isLike){
            const {error} =await supabaseClient
                .from("liked_songs")
                .delete()
                .eq("user_id", user.id)
                .eq('song_id',songid)
            
            if(error){
                toast.error(error.message)
            }else{
                setIsLike(false);
            }

        }else{
            const {error} = await supabaseClient
                .from("liked_songs")
                .insert({
                    user_id: user.id,
                    song_id: songid
                })

            if(error){
                toast.error(error.message)
            }else{
                setIsLike(true);
                toast.success("Liked")
            }
        }

        router.refresh();
    }

    
    return (
        <button className='hover:opacity-75 transition' onClick={handleLike}>
            <Icon size={25} color={isLike ? "#22c55e" : 'white'}/>
        </button>
    )
}
export default LikeButton;