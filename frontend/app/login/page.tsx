import React from "react"
import BlurredBG from "@/components/ui/blurred-background-lanyard"
import LoginForm from "@/components/ui/Login-Form"
import AnimateBtnClose from "@/components/ui/animate-btn-close"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"

export default function Home() {
    return (
        <div className="relative flex w-full h-screen overflow-hidden">
            <BackgroundGradientAnimation>
                <div className="z-90 absolute ">
                    <AnimateBtnClose duration={0.5} delay={1} url="/" />
                </div>
                <div className="absolute m-auto top-40 left-1/2 transform -translate-x-1/2  z-50">
                    <LoginForm />
                </div>
                <BlurredBG dim={true} />
            </BackgroundGradientAnimation>
        </div>

    )
}