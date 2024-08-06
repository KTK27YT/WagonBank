
import Cookies from 'js-cookie';

// Function to get the user token from cookies
export const getUserTokenSession = async (): Promise<string | undefined> => {
    return Cookies.get('user_tokens');
};

export const setUserTokenSession = async (token: string): Promise<void> => {
    Cookies.set('user_tokens', token);
};

export const deleteUserTokenSession = async (): Promise<void> => {
    Cookies.remove('user_tokens');
};