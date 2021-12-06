const TOKEN_KEY = 'token-key';

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/';
}

export const isAuth = () => {
    return getToken() !== null;
}