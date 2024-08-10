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
import { Badge } from "@/components/ui/badge"
import { IconFileInvoice } from '@tabler/icons-react';


export type Transaction = {
    id: string;
    amount: number;
    currency: string;
    status: string;
    created_time: string;
    identifier: string;
    type: "authorization" | "gpa.credit"; // Update the type property to be of type "authorization" | "gpa.credit"
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


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const formatType = (type: string) => {
        switch (type) {
            case 'authorization':
                return 'Card Purchase';
            case 'gpa.credit':
                return 'Top Up';
            default:
                return type;
        }
    };

    const renderStatusBadge = (status: string) => {
        const badgeStyle = status === 'COMPLETION' ? 'bg-green-500 text-white' : '';
        return <Badge variant="outline" className={badgeStyle}>{status}</Badge>;
    };
    return (

        <div>
            <h1 className="text-2xl align-center text-center font-bold mb-6">Transactions</h1>
            {transactions && transactions.length > 0 ? (
                <Table>

                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>

                            <TableHead>Card Last Four</TableHead>
                            <TableHead>Approval Code</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.identifier}>
                                <TableCell>{formatDate(transaction.created_time)}</TableCell>
                                <TableCell>{formatType(transaction.type)}</TableCell>
                                <TableCell>{renderStatusBadge(transaction.state)}</TableCell>
                                <TableCell>{transaction.currency_code} {transaction.amount}</TableCell>
                                <TableCell>{transaction.card?.last_four || 'N/A'}</TableCell>
                                <TableCell>{transaction.approval_code || 'N/A'}</TableCell>
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