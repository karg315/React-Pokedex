import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
    const { loginWithRedirect } = useAuth0();
    return (
        <div>
            <h1>Home</h1>
            <h3>Ingresa a la aplicación o registrate</h3>
            <button onClick={() => loginWithRedirect()}>Log In</button>;
        </div>
    );
}
