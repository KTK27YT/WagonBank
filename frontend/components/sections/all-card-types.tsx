"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import ButtonGo from "@/components/ui/button-go";
import Icon from '@/components/ui/Icon-border';
import BigHeaderTitle from "@/components/ui/big-header-title";

export function AllCardTypes() {
    const JotoroIcon = () => {
        return (
            <img src="/jotoro-pattern.png" className="absolute inset-0 w-full h-full object-cover" alt="Aceternity Icon" />
        );
    };

    const KiraIcon = () => {
        return (
            <img src="/kira-pattern.png" className="absolute inset-0 w-full h-full object-cover" alt="Aceternity Icon" />
        );
    };

    const BucciaratiIcon = () => {
        return (
            <img src="/bucciarati-pattern.png" className="absolute inset-0 w-full h-full object-cover" alt="Aceternity Icon" />
        );
    };

    return (
        <>
            <BigHeaderTitle title="One Card, Multiple Adventures" />
            <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
                <Card title={<ButtonGo url="/signup?cardDesign=Jotoro Kujo" Text="Jotoro Kujo" />} icon={<JotoroIcon />}>
                    <CanvasRevealEffect
                        animationSpeed={5.1}
                        containerClassName="bg-purple-900"
                        colors={[
                            [7, 0, 76], // Jotoro's Dark Purple
                            [150, 66, 211], // Jotoro's Purple
                        ]}
                    />
                </Card>
                <Card title={<ButtonGo url="/signup?cardDesign=Kira Yoshikage" Text="Kira Yoshikage" />} icon={<KiraIcon />}>
                    <CanvasRevealEffect
                        animationSpeed={3}
                        containerClassName="bg-pink-900"
                        colors={[
                            [233, 182, 197], // Kira's pink
                            [249, 182, 197] // Lighter pink
                        ]}
                        dotSize={2}
                    />
                    <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
                </Card>
                <Card title={<ButtonGo url="/signup?cardDesign=Bucciarati Bruno" Text="Bucciarati Bruno" />} icon={<BucciaratiIcon />}>
                    <CanvasRevealEffect
                        animationSpeed={3}
                        containerClassName="bg-sky-900"
                        colors={[
                            [51, 48, 66], // Bucciarati's blue
                            [121, 182, 255] // Lighter blue
                        ]}
                    />
                </Card>
            </div>
        </>
    );
}

const Card = ({
    title,
    icon,
    children,
}: {
    title: React.ReactNode;
    icon: React.ReactNode;
    children?: React.ReactNode;
}) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem]"
        >
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full absolute inset-0"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full h-full relative z-20">
                <div className="group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
                    {icon}
                </div>
                <div className="flex flex-col items-center align-items-center justify-center text-center text-black dark:text-white w-full h-full px-4">
                    <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-5  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
                        {title}
                    </h2>
                </div>
            </div>
        </div>
    );
};

