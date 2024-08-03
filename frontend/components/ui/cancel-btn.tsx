import React from 'react';
import Link from 'next/link';
import {
    IconCircleX
} from '@tabler/icons-react';


interface CloseButtonProps {
    url: string
}

export const CancleBtn = ({ url }: CloseButtonProps) => {
    return (
        <Link href={url} className='z-30' passHref>
            <div className="z-30 flex items-center justify-center m-10 w-30 h-30 rounded-full focus:outline-none">
                <IconCircleX size={30} className="text-neutral-800 dark:text-neutral-300 font-30 size-30 z-30" />
            </div>
        </Link>
    );
};




export default CancleBtn;


