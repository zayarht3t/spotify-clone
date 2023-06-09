import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {IoMdClose} from 'react-icons/io'
import useAuthModal from '@/hooks/useAuthModal';

type ModalProps = {
    isOpen: boolean,
    onChange: (open: any)=>void,
    title: string,
    description: string,
    children: React.ReactNode
};

const Modal:React.FC<ModalProps> = ({isOpen,onChange,title,description,children}) => {
    const AuthModal = useAuthModal();
    return (
        <Dialog.Root
        open={isOpen}
        defaultOpen={isOpen}
        onOpenChange={onChange}
        >
        <Dialog.Portal>
            <Dialog.Overlay
             className='
              inset-0
              bg-neutral-900/90
              fixed
              backdrop-blur-sm

             '
            >
                <Dialog.Content
                 className='
                  top-[50%]
                  left-[50%]
                  fixed
                  h-full
                  max-h-full
                  md:h-auto
                  border-neutral-700 
                  drop-shadow-sm
                  border
                  md:max-h[85vh]
                  w-full
                  md:w-[90vw]
                  md:max-w-[450px]
                  bg-neutral-800
                  rounded-md 
                  translate-x-[-50%]
                  translate-y-[-50%]
                  p-[25px]
                  focus:outline-none
                 '
                >
                    <Dialog.Title 
                     className='
                      text-xl
                      text-center
                      mb-4
                      font-bold
                     '
                    >
                        {title}
                    </Dialog.Title>
                    <Dialog.Description
                     className='
                      font-bold
                      text-sm 
                      leading-normal
                      text-center
                      mb-5
                     '
                    >
                        {description}
                    </Dialog.Description>
                    <div>
                           {children} 
                    </div>

                    <Dialog.Close  asChild>
                        <button
                        onClick={AuthModal.onClose}
                         className='
                          bg-neutral-400
                          top-[10px]
                          right-[10px]
                          h-[25px]
                          w-[25px]
                          hover:bg-white
                          rounded-full
                          inline-flex
                          items-center
                          justify-center 
                          appearance-none
                          focus:outline-none
                          absolute
                         '
                        >
                            <IoMdClose className='text-black'/>
                        </button>
                        
                    </Dialog.Close>
                        
                </Dialog.Content>

            </Dialog.Overlay>
        </Dialog.Portal>
        </Dialog.Root>
    )
}
export default Modal;