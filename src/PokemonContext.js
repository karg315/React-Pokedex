import React, { createContext, useState } from "react";

export const PokemonContext = createContext();

export const PokemonContextProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [captured, setCaptured] = useState([]);

    return (
        <PokemonContext.Provider
            value={{ favorites, setFavorites, captured, setCaptured }}
        >
            {children}
        </PokemonContext.Provider>
    );
};
