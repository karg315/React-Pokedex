import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar({ handleSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchTerm);
        navigate("/pokemon/" + searchTerm);
        setSearchTerm("");
    };

    return (
        <header>
            <nav
                className="navbar navbar-expand-lg navbar-dark bg-dark mb-4"
                data-bs-theme="dark"
            >
                    <div className="container-fluid container-md">
                        <Link className="navbar-brand" to="/">
                            Pokedex con React
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse justify-content-end"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav mb-1">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        Todos los Pokemones
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/favoritos">
                                        Favoritos
                                    </Link>
                                </li>
                            </ul>
                            
                            <form
                                className="d-flex bg-dark"
                                onSubmit={handleSubmit}
                                id="search-form"
                            >
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Buscar Pokemon"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-outline-success"
                                    type="submit"
                                >
                                    Buscar
                                </button>
                            </form>
                        </div>
                    </div>
            </nav>
        </header>
    );
}

export default Navbar;
