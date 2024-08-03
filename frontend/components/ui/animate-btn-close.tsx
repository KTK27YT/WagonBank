"use client";
import React from "react";
import CancleBtn from "./cancel-btn";
import { motion } from "framer-motion";

interface AnimateBtnCloseProps {
    duration: number;
    delay: number;
    url: string,
}


export default function AnimateBtnClose({ duration, delay, url }: AnimateBtnCloseProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "tween", duration: duration, delay: delay, ease: "easeInOut" }}
        >
            <CancleBtn url={url} />
        </motion.div>
    );
}