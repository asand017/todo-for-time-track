/**
 *  SHOULD NOT BE CALLED DIRECTLY. Access token via useAuth hook.
 */
import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = tokenString;//JSON.parse(tokenString);
        //console.log("getting user token: ", userToken)
        //return userToken?.token;
        return userToken;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        //console.log(userToken);
        //localStorage.setItem('token', JSON.stringify(userToken));
        localStorage.setItem('token', userToken);
        //setToken(userToken.token);
        setToken(userToken);
    }

    const clearToken = () => {
        localStorage.removeItem('token');
    }

    return {
        setToken: saveToken,
        clearToken: clearToken,
        token
    }
}