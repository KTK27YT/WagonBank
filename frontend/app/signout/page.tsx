"use client";
import React from "react";
import { deleteUserTokenSession } from "@/components/Auth/auth";

export default function SignOut() {

    deleteUserTokenSession();
    window.location.href = "/";

    return (
        <div>
            <h2>Signing you out...</h2>
        </div>
    );
}