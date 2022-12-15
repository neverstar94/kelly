import { TOKEN_KEY } from "core/constants/index";
import { isJwtExpired } from 'jwt-check-expiration';
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}
export const getToken = async () => {
    return localStorage.getItem(TOKEN_KEY);
}
export const isAuthenticated = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !isJwtExpired(token)) {
        return true;
    } else {
        return false;
    }
}
export const removeToken = async () => {
    return localStorage.removeItem(TOKEN_KEY);
}
export const setCurrentURL = () => {
    localStorage.setItem("currentURL", window.location.pathname + window.location.search);
}
export const getCurrentURL = async () => {
    return await localStorage.getItem("currentURL");
}