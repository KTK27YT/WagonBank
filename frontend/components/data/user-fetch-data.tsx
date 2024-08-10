
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

export const getCardDetails = async (userToken: string, show_cvv: boolean) => {
    const userData = {
        user_token: userToken,
        show_cvv: show_cvv,
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

export const getTransactions = async (userToken: string) => {
    try {
        console.log("Running");
        const userData = {
            user_token: userToken
        };
        const response = await axios.post(`${BACKEND_URL}/users/transactions`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        const errorMessage = (error as any).response.data.error_message;
        const errorCode = (error as any).response.data.error_code;
        return { error: errorMessage, code: errorCode };
    }
};

export const topUpAccount = async (userToken: string, amount: string) => {
    try {
        console.log("Topping up");
        const userData = {
            user_token: userToken,
            amount: amount,
        };
        const response = await axios.post(`${BACKEND_URL}/users/fundgpa`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error topping up:', error);
        const errorMessage = (error as any).response.data.error_message;
        const errorCode = (error as any).response.data.error_code;
        return { error: errorMessage, code: errorCode };
    }


}

export const simulate_Transaction = async (amount: string, card_token: string) => {

    try {
        console.log("Simulating transaction");
        const userData = {
            card_token: card_token,
            amount: amount,
            mid: "123456789"
        };
        const response = await axios.post(`${BACKEND_URL}/cards/simulatetransaction`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;

    } catch (error) {
        console.error('Error topping up:', error);
        const errorMessage = (error as any).response.data.error_message;
        const errorCode = (error as any).response.data.error_code;
        return { error: errorMessage, code: errorCode };
    }

}

export const getCardToken = async (userToken: string) => {
    try {
        console.log("Getting card token");
        const userData = {
            user_token: userToken
        };
        const response = await axios.post(`${BACKEND_URL}/cards/cardtoken`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching card token:', error);
        const errorMessage = (error as any).response.data.error_message;
        const errorCode = (error as any).response.data.error_code;
        return { error: errorMessage, code: errorCode };
    }
}