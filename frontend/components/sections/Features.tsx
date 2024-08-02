"use client";
import React from 'react';
import Icon from '@/components/ui/Icon-border';
import { AnimatePresence, motion } from 'framer-motion';
import BigHeaderTitle from '@/components/ui/big-header-title';

interface FeatureCardsProps {
  icon: string,
  title: String,
  subtitle: String,
  backgroundImage: string
}

const FeatureCard = ({ icon, title, subtitle, backgroundImage }: FeatureCardsProps) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem]"
    >
      {/* Plus icons for borders */}
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: hovered ? 0 : 1 }}
        className="relative flex flex-col items-center justify-center h-full text-center transition-opacity duration-300"
      >
        <img src={icon} alt="Feature Icon" className="w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
      </motion.div>
    </div>
  );
};

export default function FeaturesSection() {
  return (
    <div className="mt-8">
      <BigHeaderTitle title="Our offering" />
      <div className="flex flex-wrap gap-4 justify-center p-6">
        <FeatureCard
          icon="/US-FDIC-Logo.svg"
          title="FDIC Insured*"
          subtitle="Your Money is in good hands"
          backgroundImage="/killer-queen.jpg"
        />
        <FeatureCard
          icon="/instant-transfer.svg"
          title="Instant Transfers"
          subtitle="Transfer now? Done."
          backgroundImage="/crazy-diamond-art.png"
        />
        <FeatureCard
          icon="/rewards-cashback-icon.svg"
          title="Rewards + Cashback"
          subtitle="Banking in style, Saving in style"
          backgroundImage="/rohan-kohan-art-drawing.png"
        />
        <FeatureCard
          icon="/support-icon.svg"
          title="Your own Stands"
          subtitle="Stands supporting you 24/7"
          backgroundImage="/star-platnium.png"
        />
      </div>
    </div>
  );
};


