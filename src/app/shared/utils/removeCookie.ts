export const removeCookie = (cookieKey?: string): void  => {
    document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/ `;
};