import React from 'react';
import Icon from './Icon-border';

interface FeatureCardsProps {
    icon: string,
    title: String,
    subtitle: String,
    backgroundImage: string
}

const FeatureCard = ({ icon, title, subtitle, backgroundImage }: FeatureCardsProps) => {
    return (
      <div className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem]">
        {/* Plus icons for borders */}
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
  
        {/* Background image */}
        <div className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-5  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
        <img src={backgroundImage}></img>

        </div>
        

        
        {/* Content */}
        <div className="relative flex flex-col items-center justify-center h-full text-center">
          <img src={icon} alt="Feature Icon" className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
    );
  };

export default function FeaturesSection(){
    return (
        <div className="flex flex-wrap gap-4 justify-center p-6">
          <FeatureCard
            icon="/US-FDIC-Logo.svg"
            title="FDIC Insured*"
            subtitle="Your Money is in goodhands"
            backgroundImage="/jojo-placeholder1.jpg"
          />
          <FeatureCard
            icon="/placeholder-icon2.svg"
            title="Instant Transfers"
            subtitle="Transfer now? Done."
            backgroundImage="/jojo-placeholder2.jpg"
          />
          <FeatureCard
            icon="/placeholder-icon3.svg"
            title="Rewards + Cashback"
            subtitle="Banking in style, Saving in style"
            backgroundImage="/jojo-placeholder3.jpg"
          />
          <FeatureCard
            icon="/placeholder-icon4.svg"
            title="Your own Stands"
            subtitle="Stands supporting you 24/7"
            backgroundImage="/jojo-placeholder4.jpg"
          />
        </div>
      );
    };


