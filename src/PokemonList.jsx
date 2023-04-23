import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");
    const [pokemonDetailsList, setPokemonDetailsList] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [captured, setCaptured] = useState([]);

    /* Obtener la lista de pokemones, por API solo permite 20 a la vez con petición normal */
    useEffect(() => {
        const getPokemonList = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon");
            const data = await response.json();
            setNextUrl(data.next);
            setPrevUrl(data.previous);
            setPokemonList(data.results);
        };
        getPokemonList();
    }, []);

    /* Traer los detalles de los pokemones en la lista */
    const fetchDetails = async (pokemonName) => {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const data = await response.json();
        const types = data.types.map((type) => type.type.name);
        setPokemonDetailsList((prevState) => ({
            ...prevState,
            [pokemonName]: {
                image: data.sprites.front_default,
                types: types,
            },
        }));
    };

    /* Actualizar al traer la información de cada pokemon */
    useEffect(() => {
        pokemonList.forEach((pokemon) => {
            fetchDetails(pokemon.name);
        });
    }, [pokemonList]);

    /* Función para manejar ir hacia delante en la lista */
    const handleNextClick = async () => {
        try {
            const response = await fetch(nextUrl);
            const data = await response.json();
            setPokemonList(data.results);
            setNextUrl(data.next);
            setPrevUrl(data.previous);
        } catch (error) {
            console.error(error);
        }
    };

    /* Función para manejar ir hacia atrás en la lista si es posible */
    const handlePrevClick = async () => {
        try {
            const response = await fetch(prevUrl);
            const data = await response.json();
            setPokemonList(data.results);
            setNextUrl(data.next);
            setPrevUrl(data.previous);
        } catch (error) {
            console.error(error);
        }
    };

    /* Dar clase y estilo a cada etiqueta de los tipos de pokemon */
    const getTypeClass = (type) => {
        switch (type) {
            case "normal":
                return "badge badge-normal";
            case "grass":
                return "badge badge-grass";
            case "fire":
                return "badge badge-fire";
            case "water":
                return "badge badge-water";
            case "bug":
                return "badge badge-bug";
            case "poison":
                return "badge badge-poison";
            case "ghost":
                return "badge badge-ghost";
            case "rock":
                return "badge badge-rock";
            case "ground":
                return "badge badge-ground";
            case "electric":
                return "badge badge-electric";
            case "psychic":
                return "badge badge-psychic";
            case "ice":
                return "badge badge-ice";
            case "dragon":
                return "badge badge-dragon";
            case "dark":
                return "badge badge-dark";
            case "fairy":
                return "badge badge-fairy";
            case "fighting":
                return "badge badge-fighting";
            case "flying":
                return "badge badge-flying";
            case "steel":
                return "badge badge-steel";
            default:
                return "badge bg-secondary";
        }
    };

    /* Actualizar al obtener la lista de favoritos de firestore */
    useEffect(() => {
        const fetchFavorites = async () => {
            const favoritesCollection = collection(db, "favorites");
            const favoritesSnapshot = await getDocs(favoritesCollection);
            const favoritesList = favoritesSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));
            setFavorites(favoritesList);
        };
        fetchFavorites();
    }, []);

    /* Actualizar al obtener la lista de capturados de firestore */
    useEffect(() => {
        const fetchCaptured = async () => {
            const capturedCollection = collection(db, "captured");
            const capturedSnapshot = await getDocs(capturedCollection);
            const capturedList = capturedSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));
            setCaptured(capturedList);
        };
        fetchCaptured();
    }, []);

    /* Añadir a firestore obteniendo objeto y a cual colección */
    const addtoFireStore = async (pokemon, coleccion) => {
        try {
            const docRef = await addDoc(collection(db, coleccion), {
                name: pokemon.name,
                url: pokemon.url,
            });
            console.log(docRef.id);
        } catch (error) {
            console.error(error);
        }
    };

    /* Remover de firestore según el nombre de pokemon y su colección */
    const removeFromFireStore = async (name, coleccion) => {
        const favoritesCollection = collection(db, coleccion);
        const pokemonToRemove = favorites.find(
            (favorite) => favorite.name === name
        );
        const docRef = doc(favoritesCollection, pokemonToRemove.id);
        await deleteDoc(docRef);
        console.log(`Document with id ${pokemonToRemove.id} deleted`);
    };

    /* Actualizar al realizar cambios en firestore de favoritos */
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "favorites"),
            (snapshot) => {
                const favoritesList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                }));
                setFavorites(favoritesList);
            }
        );
        return () => unsubscribe();
    }, []);

    /* Actualizar al realizar cambios en firestore de capturados */
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "captured"),
            (snapshot) => {
                const capturedList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                }));
                setCaptured(capturedList);
            }
        );
        return () => unsubscribe();
    }, []);

    /* Html sobre la vista de todos los pokemones */
    return (
        <>
            <h1 className="text-center my-5">Lista de Pokemones</h1>
            <div className="row">
                {pokemonList.map((pokemon) => (
                    <div key={pokemon.name} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <div className="card shadow">
                            {pokemonDetailsList[pokemon.name] && (
                                <img
                                    className="card-img-top"
                                    src={pokemonDetailsList[pokemon.name].image}
                                    alt={pokemon.name}
                                />
                            )}

                            <div className="card-body">
                                <h3 className="card-title">{pokemon.name}</h3>
                                {pokemonDetailsList[pokemon.name] && (
                                    <div className="mb-2">
                                        {pokemonDetailsList[
                                            pokemon.name
                                        ].types.map((type, index) => (
                                            <span
                                                className={getTypeClass(type)}
                                                key={index}
                                            >
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="d-flex justify-content-evenly">
                                    {/* Parte para el botón de favorito */}
                                    {favorites.some(
                                        (favorite) =>
                                            favorite.name === pokemon.name
                                    ) ? (
                                        <div
                                            data-toggle="tooltip"
                                            title="Remover de favoritos"
                                        >
                                            <button
                                                className="btn btn-warning border border-dark"
                                                onClick={() =>
                                                    removeFromFireStore(
                                                        pokemon.name,
                                                        "favorites"
                                                    )
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    id="Outline"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                >
                                                    <path d="M23.836,8.794a3.179,3.179,0,0,0-3.067-2.226H16.4L15.073,2.432a3.227,3.227,0,0,0-6.146,0L7.6,6.568H3.231a3.227,3.227,0,0,0-1.9,5.832L4.887,15,3.535,19.187A3.178,3.178,0,0,0,4.719,22.8a3.177,3.177,0,0,0,3.8-.019L12,20.219l3.482,2.559a3.227,3.227,0,0,0,4.983-3.591L19.113,15l3.56-2.6A3.177,3.177,0,0,0,23.836,8.794Zm-2.343,1.991-4.144,3.029a1,1,0,0,0-.362,1.116L18.562,19.8a1.227,1.227,0,0,1-1.895,1.365l-4.075-3a1,1,0,0,0-1.184,0l-4.075,3a1.227,1.227,0,0,1-1.9-1.365L7.013,14.93a1,1,0,0,0-.362-1.116L2.507,10.785a1.227,1.227,0,0,1,.724-2.217h5.1a1,1,0,0,0,.952-.694l1.55-4.831a1.227,1.227,0,0,1,2.336,0l1.55,4.831a1,1,0,0,0,.952.694h5.1a1.227,1.227,0,0,1,.724,2.217Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            data-toggle="tooltip"
                                            title="Agregar a favoritos"
                                        >
                                            <button
                                                className="btn btn-secondary border border-dark"
                                                onClick={() =>
                                                    addtoFireStore(
                                                        pokemon,
                                                        "favorites"
                                                    )
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    id="Outline"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                >
                                                    <path d="M23.836,8.794a3.179,3.179,0,0,0-3.067-2.226H16.4L15.073,2.432a3.227,3.227,0,0,0-6.146,0L7.6,6.568H3.231a3.227,3.227,0,0,0-1.9,5.832L4.887,15,3.535,19.187A3.178,3.178,0,0,0,4.719,22.8a3.177,3.177,0,0,0,3.8-.019L12,20.219l3.482,2.559a3.227,3.227,0,0,0,4.983-3.591L19.113,15l3.56-2.6A3.177,3.177,0,0,0,23.836,8.794Zm-2.343,1.991-4.144,3.029a1,1,0,0,0-.362,1.116L18.562,19.8a1.227,1.227,0,0,1-1.895,1.365l-4.075-3a1,1,0,0,0-1.184,0l-4.075,3a1.227,1.227,0,0,1-1.9-1.365L7.013,14.93a1,1,0,0,0-.362-1.116L2.507,10.785a1.227,1.227,0,0,1,.724-2.217h5.1a1,1,0,0,0,.952-.694l1.55-4.831a1.227,1.227,0,0,1,2.336,0l1.55,4.831a1,1,0,0,0,.952.694h5.1a1.227,1.227,0,0,1,.724,2.217Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}

                                    {/* Botón de detalles */}
                                    <Link
                                        to={`/pokemon/${pokemon.name}`}
                                        className="btn btn-primary"
                                    >
                                        Detalles
                                    </Link>

                                    {/* Parte para el botón de capturado */}
                                    {captured.some(
                                        (capture) =>
                                            capture.name === pokemon.name
                                    ) ? (
                                        <div
                                            data-toggle="tooltip"
                                            title="Remover de capturados"
                                        >
                                            <button
                                                className="btn btn-danger border border-dark"
                                                onClick={() =>
                                                    removeFromFireStore(
                                                        pokemon.name,
                                                        "captured"
                                                    )
                                                }
                                            >
                                                <img
                                                    width="24px"
                                                    height="24px"
                                                    src="https://img.icons8.com/color/48/000000/pokeball--v1.png"
                                                />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            data-toggle="tooltip"
                                            title="Agregar a capturados"
                                        >
                                            <button
                                                className="btn btn-success border border-dark"
                                                onClick={() =>
                                                    addtoFireStore(
                                                        pokemon,
                                                        "captured"
                                                    )
                                                }
                                            >
                                                <img
                                                    width="24px"
                                                    height="24px"
                                                    src="https://img.icons8.com/color/48/000000/pokeball--v1.png"
                                                />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center my-5">
                {prevUrl && (
                    <button
                        className="btn btn-primary me-2"
                        onClick={handlePrevClick}
                    >
                        Anterior
                    </button>
                )}
                {nextUrl && (
                    <button
                        className="btn btn-primary"
                        onClick={handleNextClick}
                    >
                        Siguiente
                    </button>
                )}
            </div>
        </>
    );
}

export default PokemonList;
