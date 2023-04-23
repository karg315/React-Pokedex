import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./Navbar";
import PokemonList from "./PokemonList";
import PokemonPost from "./PokemonPost";
import NoEncontrado from "./NoEncontrado";
import './App.css'
import Favorites from "./Favorites";
import Captured from "./Captured";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar/>
                <div className="container">
                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/favoritos" element={<Favorites />} />
                    <Route path="/captured" element={<Captured />} />
                    <Route path="/pokemon/:id" element={<PokemonPost />} />
                    <Route path="/*" element={<NoEncontrado/>} />
                </Routes>
                </div>
                <footer>Kevin Rodriguez</footer>
            </BrowserRouter>
        </div>
    );
}

export default App;
