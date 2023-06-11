"use client"

import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import useUploadModal from '@/hooks/useUploadModal';
import { useRouter } from 'next/navigation';
import {  FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { toast } from 'react-hot-toast';
import uniqid from "uniqid";

type UploadModalProps = {
    
};

const UploadModal:React.FC<UploadModalProps> = () => {
    const {session} = useSessionContext();
    const uploadModal = useUploadModal();
    const router = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const {user } = useUser();
    const supabaseClient = useSupabaseClient();

    const {register,handleSubmit,reset} = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,

        }
    });

    const onChange = (open: boolean) => {
        if(!open){
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
          setIsLoading(true);
          
          const imageFile = values.image?.[0];
          const songFile = values.song?.[0];
    
          if (!imageFile || !songFile || !user) {
            toast.error('Missing fields')
            return;
          }
    
          const uniqueID = uniqid();
    
          // Upload song
          const { 
            data: songData, 
            error: songError 
          } = await supabaseClient
            .storage
            .from('songs')
            .upload(`song-${values.title}-${uniqueID}`, songFile, {
              cacheControl: '3600',
              upsert: false
            });
    
          if (songError) {
            setIsLoading(false);
            return toast.error('Failed song upload');
          }
    
          // Upload image
          const { 
            data: imageData, 
            error: imageError
          } = await supabaseClient
            .storage
            .from('images')
            .upload(`image-${values.title}-${uniqueID}`, imageFile, {
              cacheControl: '3600',
              upsert: false
            });
    
          if (imageError) {
            setIsLoading(false);
            return toast.error('Failed image upload');
          }
    
          
          // Create record 
          const { error: supabaseError } = await supabaseClient
            .from('songs')
            .insert({
              user_id: user.id,
              title: values.title,
              author: values.author,
              image_path: imageData.path,
              song_path: songData.path
            });
    
          if (supabaseError) {
            return toast.error(supabaseError.message);
          }
          
          router.refresh();
          setIsLoading(false);
          toast.success('Song created!');
          reset();
          uploadModal.onClose();
        } catch (error) {
          toast.error('Something went wrong');
        } finally {
          setIsLoading(false);
        }
      }

    
    return (
        <Modal isOpen={uploadModal.isOpen} onChange={onChange} title='Add song' description='UploadModal description'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
                <Input
                id='title'
                disabled={isLoading}
                {...register('title',{required: true})}
                placeholder='song title'
                />
                <Input
                id='author'
                disabled={isLoading}
                {...register('author',{required: true})}
                placeholder='song author'
                />
                <div>
                    <div className='pb-1'>
                        select a song file
                    </div>
                    <Input
                    id='song'
                    accept='.mp3'
                    disabled={isLoading}
                    {...register('song',{required: true})}
                    type='file'
                    />
                </div>
                <div>
                <div className='pb-1'>
                    select an image
                </div>
                <Input
                id='image'
                disabled={isLoading}
                {...register('image',{required: true})}
                type='file'
                />
            </div>
            <Button type='submit' disabled={isLoading} className='bg-green-500 w-full'>
                {
                    isLoading ? 'Creating...' : 'Create'
                }
            </Button>
            </form>
        </Modal>
    )
}
export default UploadModal;