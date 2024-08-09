
import axios from "axios";
import { BACKEND_URL } from "./config";


export const getBalance = async (userToken: string) => {
    const userData = {
        user_token: userToken,
    };

    console.log(userData);
    try {
        const response = await axios.post(`${BACKEND_URL}/users/balance`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage = (error as any).response.data.error_message;
        const errorCode = (error as any).response.data.error_code;
        return { error: errorMessage, code: errorCode };
    }
};

export const getCardDetails = async (userToken: string) => {
    const userData = {
        user_token: userToken,
    };

    console.log(userData);
    try {
        const response = await axios.post(`${BACKEND_URL}/users/cards`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage = (error as any).response.data.error_message;
        const errorCode = (error as any).response.data.error_code;
        return { error: errorMessage, code: errorCode };
    }
};