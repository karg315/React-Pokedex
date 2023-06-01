import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <>
            {isAuthenticated ? (
                <button
                    className="btn btn-outline-info"
                    onClick={() => {
                        logout();
                    }}
                >
                    Logout
                </button>
            ) : (
                <button
                    className="btn btn-outline-info"
                    onClick={() => {
                        loginWithRedirect();
                    }}
                >
                    Login
                </button>
            )}
        </>
    );
};

export default LoginButton;
