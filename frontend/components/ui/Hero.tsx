"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewritter-effect";
import styles from './Hero.module.css';
import { BackgroundGradient } from "./background-gradient";
export function Hero() {
    const words = [
        {
            text: "Build",
        },
        {
            text: "an",
        },
        {
            text: "awesome future",
        },
        {
            text: "with",
        },
        {
            text: "WagonBank.",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];
    return (
        <div>
            <div className={styles.heroContainer}></div>
            <div className={styles.dimBG}></div>
            <div className={styles.heroContent}>

                <div className="flex flex-col items-center justify-center h-[40rem]  ">
                    <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
                        The road to financial freedom starts here
                    </p>
                    <TypewriterEffectSmooth words={words} />
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
                            Signup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
