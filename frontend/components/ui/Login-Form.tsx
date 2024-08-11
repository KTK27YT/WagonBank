"use client";
import React from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import AlertDialogComponent from '@/components/ui/alert-dialog-component';
import axios from 'axios';
import { BACKEND_URL } from '@/components/data/config';
import { setUserTokenSession } from "../Auth/auth";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errortext, setErrorText] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);


    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const loginUser = async () => {
        const loginuserdata = {
            email: formData.email,
            password: formData.password,
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/users/login`, loginuserdata, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            setUserTokenSession(response.data.user.token);



            return response.data;
        } catch (error) {
            const errorMessage = (error as any).response.data.error_message;
            const errorCode = (error as any).response.data.error_code;
            setErrorText(errorMessage + " " + errorCode + " " + error);
            throw error;
        }

    };

    const handleErrorAction = () => {
        // Define what happens when the user confirms the error

        setIsAlertOpen(false); // Close the alert dialog
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        await loginUser().catch((error) => {


            setIsAlertOpen(true);
            return error;
        });
        if (!isAlertOpen) {
            window.location.href = '/dashboard';
        }

    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "tween", duration: 0.5, delay: 2.5, ease: "easeInOut" }}

        >

            <AlertDialogComponent
                isOpen={isAlertOpen}
                onclose={() => setIsAlertOpen(false)}
                onCancel={() => setIsAlertOpen(false)}
                title="An Error Occurred"
                description={errortext || ""}
                cancelText="Dismiss"
                onAction={handleErrorAction}
            />

            <div className="z-50 my-auto max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input ">

                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Login to WagonBank
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Continue your bizzare financial journey with us
                </p>

                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="jotarokujo@dolphin.com" value={formData.email}
                            onChange={handleChange("email")} type="email" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="••••••••" type="password" value={formData.password}
                            onChange={handleChange("password")} />
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Sign up &rarr;
                        <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />


                </form>
            </div>
        </motion.div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
