import React from "react";
import ShimmerBtn from "@/components/ui/shimmer-btn";

interface NavBarProps {
    hasLoginBtn?: boolean;
}


export default function NavBar({ hasLoginBtn }: NavBarProps) {
    return (
        <div className="rounded-md bg-black flex flex-row justify-around relative w-full">
            <div>
                <img src="/logo-full.png" alt="logo" className="mt-8 mb-8 h-[3rem] w-100" />
            </div>
            <div>
                {hasLoginBtn ? <ShimmerBtn text="Log in" url="/login" /> : " "}
            </div>
        </div>
    );
}