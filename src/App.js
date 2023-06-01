import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import PokemonList from "./PokemonList";
import PokemonPost from "./PokemonPost";
import NoEncontrado from "./NoEncontrado";
import "./App.css";
import Favorites from "./Favorites";
import Captured from "./Captured";
import Dashboard from "./Dashboard";
import { PokemonContextProvider } from "./PokemonContext";
import Subidos from "./Subidos";
import Subir from "./Subir";

function App() {
    return (
        <div>
            <PokemonContextProvider>
                <BrowserRouter>
                    <Navbar />
                    <div className="container">
                        <Routes>
                            {/* <Route path="/" element={<Home />} /> */}
                            <Route path="/" element={<PokemonList />} />
                            <Route path="/favoritos" element={<Favorites />} />
                            <Route path="/captured" element={<Captured />} />
                            <Route
                                path="/pokemon/:id"
                                element={<PokemonPost />}
                            />
                            <Route path="/*" element={<NoEncontrado />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/subidos" element={<Subidos/>} />
                            <Route path="/subir" element={<Subir />} />
                        </Routes>
                    </div>
                    <footer>Kevin Rodriguez</footer>
                </BrowserRouter>
            </PokemonContextProvider>
        </div>
    );
}

export default App;
