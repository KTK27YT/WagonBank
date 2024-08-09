import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "@/components/ui/table"
import { IconFileInvoice } from '@tabler/icons-react';

export type Transaction = {
    id: string;
    amount: number;
    currency: string;
    status: string;
    created_time: string;
    identifier: string;
    type: string;
    state: string;
    card: {
        last_four: string;
    };
    approval_code: string;
    network: string;
    currency_code: string;
};

interface TransactionTableUIProps {
    transactions: Transaction[];
    isLoading: boolean;
    errorText: string | null;
}

export const TransactionTableUI: React.FC<TransactionTableUIProps> = ({
    transactions,
    isLoading,
    errorText,
}) => {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errorText) {
        return <div>Error: {errorText}</div>;
    }
    return (

        <div>
            {transactions && transactions.length > 0 ? (
                <Table>
                    <TableCaption>A list of your recent transactions.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Currency</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Card Last Four</TableHead>
                            <TableHead>Approval Code</TableHead>
                            <TableHead>Network</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.identifier}>
                                <TableCell>{transaction.identifier}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>{transaction.state}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.currency_code}</TableCell>
                                <TableCell>{transaction.created_time}</TableCell>
                                <TableCell>{transaction.card?.last_four || 'N/A'}</TableCell>
                                <TableCell>{transaction.approval_code || 'N/A'}</TableCell>
                                <TableCell>{transaction.network || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex flex-col items-center justify-center bg-gray-900 w-screen h-64">
                    <IconFileInvoice className="h-16 w-16 text-gray-400 mb-4" />
                    <span className="text-white text-xl align-center text-center "> Za Warudo is empty<br></br> Go make some transactions</span>
                </div>
            )}
        </div>
    );
};

export default TransactionTableUI;