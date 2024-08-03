"use client";
import React from 'react';
import { motion } from 'framer-motion';
import '@/components/styles/blurredbg.styles.css';

interface BlurredBGProps {
    dim?: boolean;
}


export default function blurredbg({ dim }: BlurredBGProps) {
    return (

        <motion.div
            initial={{ opacity: '0' }}
            animate={{ opacity: '1' }}
            transition={{ type: "tween", duration: 2, delay: 2, ease: 'easeInOut' }}
            className={`absolute w-full h-screen z-10 blurred ${dim ? 'dimmed' : ''}`}>

        </motion.div>

    );
};