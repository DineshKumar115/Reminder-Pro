const TOKEN_KEY = "access_token";

export const saveToken = (token) => {
    sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
    return !!getToken();
};

export const saveUser = (user) => {

    localStorage.setItem(

        "user",

        JSON.stringify(user)

    );

};

export const getUser = () => {

    return JSON.parse(

        localStorage.getItem("user")

    );

};

export const removeUser = () => {

    localStorage.removeItem("user");

};