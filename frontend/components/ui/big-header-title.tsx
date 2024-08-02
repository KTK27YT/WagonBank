import React from "react";

interface bigheadertitleProps {
    title: String
}

export default function BigHeaderTitle({ title }: bigheadertitleProps) {
    return (
        <div className="w-full mb-8 mt-8">
            <h1 className="text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center">{title}</h1>
        </div>
    );
};