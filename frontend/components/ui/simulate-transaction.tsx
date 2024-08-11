"use client";
import React, { useState } from 'react';
import { Modal, ModalTrigger, ModalBody, ModalContent, ModalFooter } from '@/components/ui/animated-modal';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/ui/signup-form';
import { IconWallet, IconLoader, IconCheck, IconCreditCardPay } from '@tabler/icons-react';
import { simulate_Transaction, getCardToken } from '@/components/data/user-fetch-data';

interface SimulateTransactionProps {
    setAlertText: (text: string) => void;
    setIsAlertOpen: (isOpen: boolean) => void;
    refreshBalance: () => Promise<void>;
    card_token: string;
}

const SimulateTransaction: React.FC<SimulateTransactionProps> = ({ setAlertText, setIsAlertOpen, card_token, refreshBalance }) => {

    const [isToppingUp, setisToppingUp] = useState(false);
    const [isProcessed, setisProcessed] = useState(false);
    const [amount, setAmount] = useState<string>('');


    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    }

    const simulateTransaction = async (amount: string, card_token: string) => {
        setisToppingUp(true);
        setTimeout(async () => {
            setisToppingUp(false);


            try {

                const response = await simulate_Transaction(amount, card_token);

                setisProcessed(true);
                refreshBalance();
            } catch (error) {
                console.error('Error topping up:', error);
                setisProcessed(false);
                setAlertText('Error topping up ' + error);
                setIsAlertOpen(true);
            }
        }, 2000);
    }

    return (
        <Modal>
            <ModalTrigger className="mt-4 px-4 py-2 rounded-full group/modal-btn bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 flex items-center justify-center space-x-2 w-full">

                <span onClick={() => setisProcessed(false)} className='group-hover/modal-btn:translate-x-40 text-center transition duration-500'>Simulate Transaction</span>
                <div onClick={() => setisProcessed(false)} className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                    <IconCreditCardPay onClick={() => setisProcessed(false)} size={20} />
                </div>
            </ModalTrigger>

            <ModalBody>
                <ModalContent>
                    {isToppingUp ? (
                        <div className="flex items-center justify-center w-full h-full">
                            <IconLoader className="animate-spin" size={50} />
                        </div>
                    ) : isProcessed ? (
                        <div className="flex items-center flex-col justify-center w-full h-full">
                            <IconCheck className="text-green-500" size={90} />

                            <h3>Success!</h3>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl text-center mb-4">Create a Transaction</h2>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="amount">Amount</Label>
                                <Input onChange={(e) => handleAmountChange(e)} id="amount" placeholder="100" type="text" />
                            </LabelInputContainer>
                        </>
                    )}

                </ModalContent>
                {isToppingUp || isProcessed ? null : (
                    <ModalFooter>
                        <button
                            onClick={() => simulateTransaction(amount, card_token)}
                            className="py-2 px-6 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Transact
                        </button>
                    </ModalFooter>

                )}
            </ModalBody>
        </Modal>

    );
}

export default SimulateTransaction;