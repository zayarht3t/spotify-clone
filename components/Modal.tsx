import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {IoMdClose} from 'react-icons/io'

type ModalProps = {
    isOpen: boolean,
    onChange: (open: any)=>void,
    title: string,
    description: string,
    children: React.ReactNode
};

const Modal:React.FC<ModalProps> = ({isOpen,onChange,title,description,children}) => {
    
    return (
        <Dialog.Root>

        </Dialog.Root>
    )
}
export default Modal;