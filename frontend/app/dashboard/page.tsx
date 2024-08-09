"use client";
import React, { useState, useEffect } from 'react';
import { getUserTokenSession } from '@/components/Auth/auth';
import NavBar from '@/components/sections/nav-bar';
import AlertDialogComponent from '@/components/ui/alert-dialog-component';
import Balance from '@/components/ui/balance';
import { getBalance, getCardDetails } from '@/components/data/user-fetch-data';
import { BalanceData } from '@/components/ui/balance';
import { Skeleton } from '@/components/ui/skeleton';
import { CreditCardUI } from '@/components/ui/credit-card';
import type { CardDetailsProps } from '@/components/ui/credit-card';
import TransactionTable from '@/components/ui/transactions';
import type { Transaction } from '@/components/ui/transactions';
// import  { CardProps as _CardProps } from '@/components/ui/creditcard';

//TYPESCRIPT IS BEING A BITCH ABOUT CARDDETAILS
const Dashboard = () => {
    const [userToken, setUserToken] = useState<string | undefined>(undefined);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [balances, setBalances] = useState<{ [key: string]: BalanceData }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [cardDetails, setCardDetails] = useState<CardDetailsProps['cardDetailsData'] | null>(null);
    const [name, setName] = useState<string | undefined>(undefined);
    // Fetch the user token on component mount
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching user token");
            const token = await getUserTokenSession();
            setUserToken(token);

        };

        fetchData();
    }, []);

    // Fetch balance data when userToken is available
    useEffect(() => {
        if (!userToken) return;


        const fetchBalance = async () => {
            console.log("Fetching balance data");
            try {
                console.log(userToken);
                const balanceData = await getBalance(userToken);
                if (balanceData.error) {
                    console.error('Error fetching balance:', balanceData.error);
                    setErrorText(balanceData.error);
                    setIsAlertOpen(true);
                    return;
                }
                setBalances(balanceData.gpa.balances);
            } catch (error: unknown) {
                setErrorText((error as Error).message);
                setIsAlertOpen(true);
                setIsLoading(false);
                console.error('Error fetching balance:', error);

            }
        };

        const fetchCardDetails = async () => {
            console.log("Fetching card details");
            try {
                console.log(userToken);
                const cardData = await getCardDetails(userToken, true);
                if (cardData.error) {
                    console.error('Error fetching card details:', cardData.error);
                    setErrorText(cardData.error);
                    setIsAlertOpen(true);
                    return;
                }
                setCardDetails(cardData);
                setIsLoading(false);
            } catch (error: unknown) {
                setErrorText((error as Error).message);
                setIsAlertOpen(true);
                setIsLoading(false);
                console.error('Error fetching card details:', error);
            }
        };





        fetchBalance();
        fetchCardDetails();


    }, [userToken]);

    const handleErrorAction = () => {
        // Define what happens when the user confirms the error
        console.log("User confirmed the error");
        setIsAlertOpen(false); // Close the alert dialog
    };

    return (
        <div>
            <AlertDialogComponent
                isOpen={isAlertOpen}
                onclose={() => setIsAlertOpen(false)}
                onCancel={() => setIsAlertOpen(false)}
                title="An Error Occurred"
                description={errorText || ""}
                cancelText="Dismiss"
                onAction={handleErrorAction}
            />
            <NavBar hasLoginBtn={false} />
            {isLoading ? (
                <Skeleton className="w-64 mr-2 h-[10rem] rounded-lg" />
            ) : (
                <Balance balances={balances} />
            )}
            {isLoading ? (
                <Skeleton className="w-64 mr-2 h-[10rem] rounded-lg" />
            ) : (
                <div className="min-w-screen bg-black flex text-white justify-center align-center items-center p-8">
                    <CreditCardUI cardDetailsData={cardDetails} />

                </div>
            )}

        </div>
    );
};

export default Dashboard;