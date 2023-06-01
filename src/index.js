import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const dominio = process.env.REACT_APP_AUTH0_DOMAIN;
const idCliente = process.env.REACT_APP_AUTH0_CLIENT_ID;
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={dominio}
            clientId={idCliente}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>
);
