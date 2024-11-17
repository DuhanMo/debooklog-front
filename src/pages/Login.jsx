import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getAccessTokenFromUrl, redirectOauth2LoginPage} from "../services/api";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get("code");
        const provider = urlParams.get("provider");
        if (code && provider) {
            const fetchToken = async () => {
                try {
                    await getAccessTokenFromUrl(code, provider);
                    navigate("/", {replace: true});
                } catch (err) {
                    setError("Failed to login, Please try again");
                } finally {
                }
            };
            fetchToken();
        }
    }, [navigate, location.search]);

    const handleKakaoLogin = async () => {
        try {
            await redirectOauth2LoginPage('KAKAO');
        } catch (error) {
            console.error("Failed to redirect to Kakao login page:", error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await redirectOauth2LoginPage('GOOGLE');
        } catch (error) {
            console.error("Failed to redirect to Google login page:", error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <button
                onClick={handleKakaoLogin}
                className="flex items-center justify-center w-full max-w-xs bg-[#FEE500] rounded-lg border border-transparent p-3 transition-colors duration-200 hover:bg-[#FBBF00] text-[#000000] text-opacity-85 font-semibold"
                style={{ height: '50px' }}
            >
                <img
                    src="/images/kakao-login-button.png"
                    alt="Kakao Login"
                    className="h-8 w-8 object-contain mr-2"
                />
                <span>Login with Kakao</span>
            </button>
            <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg bg-white p-3 w-full max-w-xs transition-colors duration-200 hover:bg-gray-100 text-[#000000] text-opacity-85 font-semibold"
                style={{ height: '50px' }}
            >
                <img
                    src="/images/google-login-button.png"
                    alt="Google"
                    className="w-8 h-8"
                />
                <span>Login with Google</span>
            </button>
        </div>
    );
};

export default Login;
