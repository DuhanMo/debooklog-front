const CONFIG = {
    BASE_API_URL: import.meta.env.VITE_BASE_API_URL || "http://localhost:8080",

    OAUTH_PROVIDERS: {
        GOOGLE: "GOOGLE",
        KAKAO: "KAKAO",
        GITHUB: "GITHUB",
    },
};

export default CONFIG;
