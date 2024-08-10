"use client";

import { ColumnDef } from "@tanstack/react-table";

// Define the transaction type
export type Transactionobject = {
    identifier: string;
    created_time: string;
    type: "authorization" | "gpa.credit";
    state: "PENDING" | "COMPLETION";
    amount: number;
    currency_code: string;
    card?: { last_four: string };
    approval_code?: string;
};

// Define the columns
export const columns: ColumnDef<Transactionobject>[] = [
    {
        accessorKey: "created_time",
        header: "Date",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "state",
        header: "Status",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "card.last_four",
        header: "Card Last Four",
    },
    {
        accessorKey: "approval_code",
        header: "Approval Code",
    },
];

