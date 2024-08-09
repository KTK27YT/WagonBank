import React from 'react';
export type Transaction = {
    id: string;
    amount: number;
    date: string;
    description: string;
};

interface TransactionTableProps {
    transactions: Transaction[];
}

function TransactionTable({ Transactions }: React.FC<TransactionTableProps>) {
    return (
        <div>
            <h2>Transactions</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {Transactions.map((Transactions: { id: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | React.Key | null | undefined; amount: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; date: string | number | Date; description: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                        <tr key={Transactions.id}>
                            <td>{Transactions.id}</td>
                            <td>{Transactions.amount}</td>
                            <td>{new Date(Transactions.date).toLocaleDateString()}</td>
                            <td>{Transactions.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionTable;