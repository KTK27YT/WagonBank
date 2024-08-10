"use client";
import React, { useState, useEffect } from 'react';
import { getUserTokenSession } from '@/components/Auth/auth';
import NavBar from '@/components/sections/nav-bar';
import AlertDialogComponent from '@/components/ui/alert-dialog-component';
import Balance from '@/components/ui/balance';
import { getBalance, getCardDetails, getTransactions } from '@/components/data/user-fetch-data';
import { BalanceData } from '@/components/ui/balance';
import { Skeleton } from '@/components/ui/skeleton';
import { CreditCardUI } from '@/components/ui/credit-card';
import type { CardDetailsProps } from '@/components/ui/credit-card';
import { TransactionTableUI } from '@/components/ui/transactions';
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
    const [transactions, setTransactions] = useState<Transaction[]>([]);
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

        const fetchData = async () => {
            try {
                console.log('Fetching balance data');
                const balanceData = await getBalance(userToken);
                if (balanceData.error) {
                    throw new Error(balanceData.error);
                }
                setBalances(balanceData.gpa.balances);

                console.log('Fetching card details');
                const cardData = await getCardDetails(userToken, true);
                if (cardData.error) {
                    throw new Error(cardData.error);
                }
                setCardDetails(cardData);

                console.log('Fetching transactions');
                const response = await getTransactions(userToken);
                console.log(response);
                setTransactions(response);

                setIsLoading(false);
            } catch (error) {
                setErrorText((error as any).message || 'An error occurred');
                setIsAlertOpen(true);
                setIsLoading(false);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userToken]);


    const handleErrorAction = () => {
        setIsAlertOpen(false);
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
                <div className="min-w-screen bg-black text-white p-8">
                    <h1 className="text-3xl align-center text-center font-bold mb-6">Account</h1>
                    <div className="flex flex align-center justify-center items-center flex-wrap gap-4">
                        <Skeleton className="bg-gray-900 text-white p-4 rounded-lg shadow-md w-64 h-60" />
                    </div>
                </div>
            ) : (
                <Balance balances={balances} user_token={userToken} />
            )}
            {isLoading ? (
                <div className="min-w-screen flex-col gap-10 bg-black  flex text-white flex justify-center align-center items-center p-8">
                    <Skeleton style={{
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        width: '450px',
                        height: '270px',
                        overflow: 'hidden',
                        background: 'gray-900'

                    }} />
                </div>
            ) : (
                <div className="min-w-screen flex-col gap-10 bg-black flex text-white flex justify-center align-center items-center p-8">
                    <div className=''>
                        <CreditCardUI cardDetailsData={cardDetails} />
                    </div>
                    <div className=''>
                        <button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                            Simulate Transaction
                        </button>

                    </div>
                </div>
            )}
            {isLoading ? (
                <div className="min-w-screen bg-black flex text-white justify-center align-center items-center p-8">
                    <Skeleton className="bg-gray-900 w-screen h-64" />
                </div>
            ) : (
                <div className="min-w-screen bg-black flex text-white justify-center align-center items-center p-8">
                    <TransactionTableUI
                        transactions={transactions}
                        isLoading={isLoading}
                        errorText={errorText}
                    />

                </div>
            )}

        </div>
    );
};

export default Dashboard;