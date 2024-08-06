import React from 'react';
import { US, GB, SG, KR } from 'country-flag-icons/react/3x2';
import { IconWallet } from '@tabler/icons-react';

interface BalanceProps {
    balances: { [key: string]: BalanceData };
}

export interface BalanceData {
    currency_code: string;
    ledger_balance: number;
    available_balance: number;
    credit_balance: number;
    pending_credits: number;
}

const Balance: React.FC<BalanceProps> = ({ balances }) => {
    return (
        <div className="min-w-screen bg-black text-white p-8">
            <h1 className="text-3xl align-center text-center font-bold mb-6">Account</h1>
            <div className="flex flex align-center justify-center items-center flex-wrap gap-4">
                {Object.keys(balances).map((currency) => (
                    <div
                        key={currency}
                        className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-64"
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
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center justify-center space-x-2 w-full">
                            <IconWallet size={20} />
                            <span>Top-Up Wallet</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Balance;