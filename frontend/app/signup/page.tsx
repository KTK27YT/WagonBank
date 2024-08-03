import React from "react"
import Lanyard from "@/components/ui/lanyard"
import BlurredBG from "@/components/ui/blurred-background-lanyard"
import SignupForm from "@/components/ui/signup-form"
import AnimateBtnClose from "@/components/ui/animate-btn-close"

export default function Home() {
    return (


        <div className="relative flex w-full h-screen overflow-hidden">
            <div className="z-90">
                <AnimateBtnClose duration={0.5} delay={3} url="/" />
            </div>
            <div className="absolute m-auto top-40 left-1/2 transform -translate-x-1/2  z-50">
                <SignupForm />
            </div>
            <BlurredBG />
            <Lanyard />
        </div>
    )
}