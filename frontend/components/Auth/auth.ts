import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Function to get the user token from cookies
export const getUserTokenSession = (): string | undefined => {
    return Cookies.get('user_tokens');
};


export const setUserTokenSession = (token: string): void => {
    Cookies.set('user_tokens', token);
};

export const deleteUserTokenSession = (): void => {
    Cookies.remove('user_tokens');
};