"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Lanyard() {
    return (
        <motion.img
            src="/lanyard.png"
            alt="Lanyard"
            initial={{ y: '-100%' }}
            animate={{ y: '-10%' }}
            transition={{ type: "spring", bounce: 0.2, duration: 2, ease: 'easeInOut' }}
            className="absolute z-0 top-0 left-1/2 transform -translate-x-1/2 w-40">
        </motion.img>
    );
};