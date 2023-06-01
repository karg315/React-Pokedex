import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            <h1>Bienvenido</h1>
            <h3>Panel</h3>
            {isAuthenticated ? (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
            ) : (
                <h3>Cree una cuenta o inicie sesión</h3>
            )}
        </div>
    )
}

export default Dashboard;