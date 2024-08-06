import React from 'react';


export interface CardProps {
    cardDetailsData: {
        created_time: string;
        last_modified_time: string;
        token: string;
        user_token: string;
        card_product_token: string;
        last_four: string;
        pan: string;
        expiration: string;
        expiration_time: string;
        barcode: string;
        pin_is_set: boolean;
        state: string;
        state_reason: string;
        fulfillment_status: string;
        fulfillment: {
            card_personalization: {
                images: {
                    card: {
                        name: string;
                        thermal_color: string;
                    };
                };
            };
        };
        instrument_type: string;
        expedite: boolean;
        metadata: object;
    };
}

const CreditCard: any = ({ cardDetailsData }: CardProps) => {
    const { last_four, expiration, state, state_reason, fulfillment } = cardDetailsData;
    const cardBackground = fulfillment.card_personalization.images.card.name;

    return (
        <div
            className="bg-cover bg-center p-4 rounded-lg shadow-md w-64 text-white"
            style={{ backgroundImage: `url(${cardBackground})` }}
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold">**** {last_four}</span>
                <span className="text-sm">{expiration}</span>
            </div>
            <div className="mb-2">
                <p className="text-lg font-bold">{state}</p>
                <p className="text-sm text-gray-300">{state_reason}</p>
            </div>
        </div>
    );
};

export default CreditCard;