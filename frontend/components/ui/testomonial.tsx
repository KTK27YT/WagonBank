import React from 'react';
import Icon from './Icon-border';


export default function TestimonialCard(){
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
       
        <div className="w-1/3 flex justify-center">
          <img
            src="/dio-brando.jpg" 
            alt="Dio Brando"
            className="w-48 h-48 rounded-lg object-cover"
          />
        </div>
        <div className="w-2/3 pl-8">
          <div className="text-left mb-4">
            <img src="/iconmonstr-quote-left-thin.svg" className="w-10 h-10 text-sky-500"></img>
            
          </div>
          <h3 className="text-xl font-semibold text-left mb-4">
            "You thought it was a review, but it was me, Dio! This service is truly world-dominating."
          </h3>
          <p className="text-left text-gray-400">— Dio Brando</p>
        </div>
      </div>
    </div>
    </div>
  );
};

