import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { PokemonContext } from "./PokemonContext";

function PokemonPost() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate();
    const { favorites, setFavorites, captured, setCaptured } = useContext(PokemonContext);

    /* Obtener información de cada pokemon */
    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                );
                const data = await response.json();
                setPokemon(data);
            } catch (error) {
                navigate("/*");
            }
        }
        fetchPokemon();
    }, [id]);

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
    const addtoFireStore = async (nombre, Pkmid, coleccion) => {
        try {
            const docRef = await addDoc(collection(db, coleccion), {
                name: nombre,
                id: Pkmid,
            });
            console.log(docRef.id);
        } catch (error) {
            console.error(error);
        }
    };

    /* Remover de firestore según el nombre de pokemon y su colección */
    const removeFromFireStore = async (name, coleccion) => {
        const favoritesCollection = collection(db, coleccion);
        if (coleccion == "favorites") {
            var pokemonToRemove = favorites.find(
                (favorite) => favorite.name === name
            );
        } else {
            var pokemonToRemove = captured.find(
                (capture) => capture.name === name
            );
        }
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

    /* Dar clase y estilo a las etiquetas de las clases que tenga cada pokemon */
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

    /* Html de la vista de la información de un pokemon en especifico */
    return (
        <>
        
            <h1 className="text-center my-4">Detalles de Pokemon</h1>
            <div className="container">
                {pokemon && (
                <div className="card card-detail my-5 mx-auto">
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="card-img-top"
                    />
                    <div className="card-body">
                        <h2 className="card-title">{pokemon.name}</h2>
                        <p className="card-text">
                            {pokemon.types.map((type, index) => (
                                <span
                                    className={getTypeClass(type.type.name)}
                                    key={index}
                                >
                                    {type.type.name}
                                </span>
                            ))}
                        </p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            Vida: {pokemon.stats[0].base_stat}
                        </li>
                        <li className="list-group-item">
                            Ataque: {pokemon.stats[1].base_stat}
                        </li>
                        <li className="list-group-item">
                            Defensa: {pokemon.stats[2].base_stat}
                        </li>
                        <li className="list-group-item">
                            Ataque especial: {pokemon.stats[3].base_stat}
                        </li>
                        <li className="list-group-item">
                            Defensa especial: {pokemon.stats[4].base_stat}
                        </li>
                        <li className="list-group-item">
                            Velocidad: {pokemon.stats[5].base_stat}
                        </li>
                    </ul>
                    <div className="card-body">
                        <div className="d-flex justify-content-evenly">
                            {/* Parte para el botón de favorito */}
                            {favorites.some(
                                (favorite) => favorite.name === pokemon.name
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
                                            addtoFireStore(pokemon.name, pokemon.id, "favorites")
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
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate(-1)}
                            >
                                Volver
                            </button>
                            {/* Parte para el botón de capturado */}
                            {captured.some(
                                (capture) => capture.name === pokemon.name
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
                                            addtoFireStore(pokemon.name, pokemon.id, "captured")
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
                </div>)}
            </div>
        </>
    );
}

export default PokemonPost;
