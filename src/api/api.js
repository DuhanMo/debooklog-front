const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

export const fetchBookshelves = async () => {
    try {
        const response = await fetch(`${SERVER_BASE_URL}/api/bookshelves`);
        if (!response.ok) {
            throw new Error("Failed to fetch bookshelves");
        }
        const result = await response.json();
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const loginWithOAuth2 = async (provider, code) => {
    try {
        const response = await fetch(`${SERVER_BASE_URL}/oauth2/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ provider, code }),
        });

        if (!response.ok) {
            throw new Error("OAuth2 login failed");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
