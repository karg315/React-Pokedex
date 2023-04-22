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

export default function Favorites() {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonDetailsList, setPokemonDetailsList] = useState({});
    const [favorites, setFavorites] = useState([]);

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

    useEffect(() => {
        const getPokemonList = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon");
            const data = await response.json();
            setPokemonList(data.results);
        };
        getPokemonList();
    }, []);

    useEffect(() => {
        pokemonList.forEach((pokemon) => {
            fetchDetails(pokemon.name);
        });
    }, [pokemonList]);

    useEffect(() => {
        getFavorites();
    }, []);

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

    async function getFavorites() {
        const favoritesCollection = collection(db, "favorites");
        const favoritesSnapshot = await getDocs(favoritesCollection);
        const favoritesList = favoritesSnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
        }));
        setFavorites(favoritesList);
    }

    useEffect(() => {
        async function fetchFavorites() {
            const favoritesCollection = collection(db, "favorites");
            const favoritesSnapshot = await getDocs(favoritesCollection);
            const favoritesList = favoritesSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));
            setFavorites(favoritesList);
        }

        fetchFavorites();
    }, []);

    const addFavorite = async (pokemon) => {
        try {
            const docRef = await addDoc(collection(db, "favorites"), {
                name: pokemon.name,
                url: pokemon.url,
            });
            console.log(docRef.id);
        } catch (error) {
            console.error(error);
        }
    };

    const removeFavorite = async (name) => {
        const favoritesCollection = collection(db, "favorites");
        const pokemonToRemove = favorites.find(
            (favorite) => favorite.name === name
        );
        const docRef = doc(favoritesCollection, pokemonToRemove.id);
        await deleteDoc(docRef);
        console.log(`Document with id ${pokemonToRemove.id} deleted`);
    };

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

    return (
        <div className="favorites">
            <h1 className="text-center my-5">Pokemones Favoritos</h1>
            <div className="row">
                {favorites.map((pokemon) => (
                    <div key={pokemon.name} className="col-sm-4 col-lg-3 mb-3">
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
                                    <Link
                                        to={`/pokemon/${pokemon.name}`}
                                        className="btn btn-primary"
                                    >
                                        Detalles
                                    </Link>
                                    {favorites.some(
                                        (favorite) =>
                                            favorite.name === pokemon.name
                                    ) ? ( <div data-toggle="tooltip" title="Remover de favoritos">
                                        <button
                                            className="btn btn-info"
                                            onClick={() =>
                                                removeFavorite(pokemon.name)
                                            }
                                            
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                id="Outline"
                                                viewBox="0 0 24 24"
                                                width="25"
                                                height="25"
                                            >
                                                <path d="M23.836,8.794a3.179,3.179,0,0,0-3.067-2.226H16.4L15.073,2.432a3.227,3.227,0,0,0-6.146,0L7.6,6.568H3.231a3.227,3.227,0,0,0-1.9,5.832L4.887,15,3.535,19.187A3.178,3.178,0,0,0,4.719,22.8a3.177,3.177,0,0,0,3.8-.019L12,20.219l3.482,2.559a3.227,3.227,0,0,0,4.983-3.591L19.113,15l3.56-2.6A3.177,3.177,0,0,0,23.836,8.794Zm-2.343,1.991-4.144,3.029a1,1,0,0,0-.362,1.116L18.562,19.8a1.227,1.227,0,0,1-1.895,1.365l-4.075-3a1,1,0,0,0-1.184,0l-4.075,3a1.227,1.227,0,0,1-1.9-1.365L7.013,14.93a1,1,0,0,0-.362-1.116L2.507,10.785a1.227,1.227,0,0,1,.724-2.217h5.1a1,1,0,0,0,.952-.694l1.55-4.831a1.227,1.227,0,0,1,2.336,0l1.55,4.831a1,1,0,0,0,.952.694h5.1a1.227,1.227,0,0,1,.724,2.217Z" />
                                            </svg>
                                        </button></div>
                                    ) : ( <div data-toggle="tooltip" title="Agregar a favoritos">
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => addFavorite(pokemon)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                id="Outline"
                                                viewBox="0 0 24 24"
                                                width="25"
                                                height="25"
                                            >
                                                <path d="M23.836,8.794a3.179,3.179,0,0,0-3.067-2.226H16.4L15.073,2.432a3.227,3.227,0,0,0-6.146,0L7.6,6.568H3.231a3.227,3.227,0,0,0-1.9,5.832L4.887,15,3.535,19.187A3.178,3.178,0,0,0,4.719,22.8a3.177,3.177,0,0,0,3.8-.019L12,20.219l3.482,2.559a3.227,3.227,0,0,0,4.983-3.591L19.113,15l3.56-2.6A3.177,3.177,0,0,0,23.836,8.794Zm-2.343,1.991-4.144,3.029a1,1,0,0,0-.362,1.116L18.562,19.8a1.227,1.227,0,0,1-1.895,1.365l-4.075-3a1,1,0,0,0-1.184,0l-4.075,3a1.227,1.227,0,0,1-1.9-1.365L7.013,14.93a1,1,0,0,0-.362-1.116L2.507,10.785a1.227,1.227,0,0,1,.724-2.217h5.1a1,1,0,0,0,.952-.694l1.55-4.831a1.227,1.227,0,0,1,2.336,0l1.55,4.831a1,1,0,0,0,.952.694h5.1a1.227,1.227,0,0,1,.724,2.217Z" />
                                            </svg>
                                        </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
