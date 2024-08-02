"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/Icon-border';
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";

const testimonials = [
  {
    image: "/dio-brando.jpg",
    quote: "You thought it was a review, but it was me, Dio! This service is truly world-dominating.",
    name: "Dio Brando"
  },
  {
    image: "/Portrait-jotaro.webp",
    quote: "Yare Yare Daze... This service is unbeatable.",
    name: "Jotaro Kujo"
  },
  {
    image: "/Joseph-Joestar.webp",
    quote: "Oh my God! This service is amazing!",
    name: "Joseph Joestar"
  }
];

const TestimonialCard = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div>
      <div className="-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center">
        <h2>What our customers are saying</h2>
      </div>

      <div className="w-full h-auto p-6 text-white flex items-center justify-center">

        <div className="relative max-w-5xl flex items-center rounded-lg shadow-lg p-8 border border-black/[0.2] dark:border-white/[0.2]">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

          <button onClick={handlePrev} className=" left-5 p-2 text-gray-500 bg-white rounded-full">
            <IconArrowNarrowLeft />
          </button>

          <div className="relative w-full flex items-center justify-center">
            <AnimatePresence mode='wait'>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className="flex w-full items-center"
              >
                <div className="w-1/3 flex justify-center">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-48 h-48 rounded-lg object-cover"
                  />
                </div>
                <div className="w-2/3 pl-8">
                  <div className="text-left mb-4">
                    <img src="/iconmonstr-quote-left-thin.svg" className="w-10 h-10 text-sky-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-left mb-4">
                    "{testimonials[current].quote}"
                  </h3>
                  <p className="text-left text-gray-400">— {testimonials[current].name}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={handleNext} className=" right-5  p-2 text-gray-500 bg-white rounded-full">
            <IconArrowNarrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};


export default TestimonialCard;
