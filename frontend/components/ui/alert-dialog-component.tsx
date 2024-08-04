"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import React, { useEffect } from 'react';

const AlertDialogComponent = ({
    isOpen,
    title,
    description,
    cancelText,
    actionText,
    onAction,
    onCancel,
    onclose,
}: {
    isOpen: boolean;
    title: String;
    description: String;
    cancelText?: String;
    actionText?: String;
    onAction: () => void;
    onCancel: () => void;
    onclose: () => void;
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('dialog-open');
        } else {
            document.body.classList.remove('dialog-open');
        }
    }, [isOpen]);
    return (
        <AlertDialog open={isOpen} onOpenChange={onclose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {cancelText ? <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel> : ""}
                    {actionText ? <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction> : ""}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogComponent;