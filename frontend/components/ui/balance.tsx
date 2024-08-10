"use client";
import React, { useState } from 'react';
import { US, GB, SG, KR } from 'country-flag-icons/react/3x2';
import { IconWallet, IconLoader } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/ui/signup-form';
import { Modal, ModalTrigger, ModalBody, ModalContent, ModalFooter } from '@/components/ui/animated-modal';
import { cn } from '@/lib/utils';

interface BalanceProps {
    balances: { [key: string]: BalanceData };
    user_token?: string;
}

export interface BalanceData {
    currency_code: string;
    ledger_balance: number;
    available_balance: number;
    credit_balance: number;
    pending_credits: number;
}




const Balance: React.FC<BalanceProps> = ({ balances, user_token }) => {

    const [isModalOpen, setModalOpen] = useState(false);

    //When the function is running we run this
    const [isToppingUp, setisToppingUp] = useState(false);

    const handleTopUp = async (amount: string) => {
        setisToppingUp(true);
        setTimeout(() => {
            setisToppingUp(false);
            console.log('Top-Up Complete');
        }, 2000);
    };

    return (
        <div className="min-w-screen bg-black text-white p-8">
            <h1 className="text-3xl align-center text-center font-bold mb-6">Account</h1>
            <div className="flex flex align-center justify-center items-center flex-wrap gap-4">
                {Object.keys(balances).map((currency) => (
                    <div
                        key={currency}
                        className="bg-gray-900 text-white p-4 rounded-lg shadow-md w-64"
                    >
                        <div className="flex items-center mb-4">
                            <span className="text-2xl mr-2">
                                {currency === 'USD' && <US className='w-5 h-5 m-2 ' title="United States" />}
                                {currency === 'GBP' && <GB className='w-5 h-5 m-2 ' title="United Kingdom" />}
                                {currency === 'SGD' && <SG className='w-5 h-5 m-2 ' title="Singapore" />}
                                {currency === 'KRW' && <KR className='w-5 h-5 m-2 ' title="South Korea" />}
                            </span>
                            <h3 className="text-lg font-semibold">{balances[currency].currency_code}</h3>
                        </div>
                        <p className="text-xl font-bold mb-2">${balances[currency].ledger_balance.toFixed(2)}</p>
                        <p className="text-sm text-gray-400">{currency === 'USD' ? 'US Dollar' : currency}</p>
                        <Modal>
                            <ModalTrigger className="mt-4 px-4 py-2 rounded-full group/modal-btn bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 flex items-center justify-center space-x-2 w-full">

                                <span className='group-hover/modal-btn:translate-x-40 text-center transition duration-500'>Top-Up</span>
                                <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                                    <IconWallet size={20} />
                                </div>
                            </ModalTrigger>

                            <ModalBody>
                                <ModalContent>
                                    {isToppingUp ? (
                                        <div className="flex items-center justify-center align-center w-fill h-fill">
                                            <IconLoader className="items-center justify-center align-center  animate-spin" size={50} />
                                        </div>

                                    ) : (
                                        <>
                                            <h2 className="text-xl align-center justify-center text-center mb-4">Top-Up Wallet</h2>

                                            <LabelInputContainer className="mb-4">
                                                <Label htmlFor="email">Amount</Label>
                                                <Input id="amount" placeholder="100" type="email" />
                                            </LabelInputContainer>

                                        </>
                                    )}

                                </ModalContent>
                                {isToppingUp ? null : (
                                    <ModalFooter>
                                        <button
                                            onClick={() => handleTopUp('100')}
                                            className="py-2 px-6 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
                                        >
                                            Top-Up
                                        </button>
                                    </ModalFooter>

                                )}
                            </ModalBody>
                        </Modal>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default Balance;