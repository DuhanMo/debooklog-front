import React from 'react';

const providers = ['GOOGLE', 'KAKAO']; // 필요에 따라 추가 가능

function Login() {
    const handleLogin = (provider) => {
        window.location.href = `http://localhost:8080/oauth2/code/${provider}`;
    };

    return (
        <div>
            <h2>Login</h2>
            {providers.map((provider) => (
                <button key={provider} onClick={() => handleLogin(provider)}>
                    Login with {provider}
                </button>
            ))}
        </div>
    );
}

export default Login;
