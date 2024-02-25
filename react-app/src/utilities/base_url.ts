

export const BaseURL = () => {
    const isWithProxy = import.meta.env.VITE_REACT_APP_IS_WITH_PROXY === "True";
    const baseURL = isWithProxy
        ? import.meta.env.VITE_REACT_APP_BASE_URL_PROXY
        : "http://localhost:8080";

    return baseURL
}
