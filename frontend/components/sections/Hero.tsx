"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { TypewriterEffectSmooth } from "@/components/ui/typewritter-effect";
import CreditCard from "@/components/ui/creditcard";
import { globeConfig, sampleArcs } from "@/components/data/globe-config";


const NoSSR = dynamic(() => import('@/components/no-ssr'), { ssr: false });
const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

export function Hero() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "Global",
    },
    {
      text: "Wealth",
    },
    {
      text: "With",
    },
    {
      text: "WagonBank",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (

    <div className="flex items-left justify-left py-20 h-screen md:h-auto dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full gap-20 relative h-full md:h-[40rem] px-4 flex flex-col md:flex-row">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="flex flex-col items-center justify-center text-center text-black dark:text-white md:w-1/2 w-full px-4"
        >
          <h1>Global Money, Global You</h1>
          <TypewriterEffectSmooth words={words} />
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm mt-8">
            Signup
          </button>
        </motion.div>
        <div className="relative md:w-1/2 w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            <World data={sampleArcs} globeConfig={globeConfig} />
            <NoSSR >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <CreditCard cardnumber="1234 5678 9012 3456" name="Josuke Higashikata" expiry="12/95" start="05/92" />
              </div>
            </NoSSR>
          </div>
        </div>
      </div>
      <div className="absolute w-full space-y-4 bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
    </div>
  );
}

