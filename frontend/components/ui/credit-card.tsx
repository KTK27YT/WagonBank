import React from 'react';


export interface CardDetailsProps {
    cardDetailsData: {
        PAN: string,
        expiry: string,
        cvv: string,
        image: string,
        character: string
    };
}

export const CreditCardUI: any = ({ cardDetailsData }: CardDetailsProps) => {
    const { PAN, expiry, cvv, image, character  } = cardDetailsData;

    return (
        <div
            className="bg-cover bg-center p-4 rounded-lg shadow-md w-64 text-white"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">{PAN}</span>
                <span className="text-sm">{expiry}</span>
            </div>
        </div>
    );
};

export default CreditCardUI;