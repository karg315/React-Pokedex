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

export default function Captured() {
    const [pokemonDetailsList, setPokemonDetailsList] = useState({});
    const [captured, setCaptured] = useState([]);

    /* Traer detalles de cada pokemon */
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

    /* Traer los detalles de cada pokemon en la lista de capturados */
    useEffect(() => {
        captured.forEach((pokemon) => {
            fetchDetails(pokemon.name);
        });
    }, [captured]);

    /* Dar clase a la etiqueta de cada tipo de pokemon */
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

    /* Obtener los capturados de firestore y actualizar */
    useEffect(() => {
        async function fetchCaptured() {
            const capturedCollection = collection(db, "captured");
            const capturedSnapshot = await getDocs(capturedCollection);
            const capturedList = capturedSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));
            setCaptured(capturedList);
        }
        fetchCaptured();
    }, []);

    /* Remover pokemon capturado */
    const removeCaptured = async (name) => {
        const capturedCollection = collection(db, "captured");
        const pokemonToRemove = captured.find(
            (capture) => capture.name === name
        );
        const docRef = doc(capturedCollection, pokemonToRemove.id);
        await deleteDoc(docRef);
        console.log(`Document with id ${pokemonToRemove.id} deleted`);
    };

    /* Actualizar al elmiinar un pokemon capturado */
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

    /* html de la vista de capturados */
    return (
        <div className="captured">
            <h1 className="text-center my-5">Pokemones Capturados</h1>
            <div className="row pb-5">
                {captured.map((pokemon) => (
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
                                    <div
                                        data-toggle="tooltip"
                                        title="Remover de capturados"
                                    >
                                        <button
                                            className="btn btn-danger border border-dark"
                                            onClick={() =>
                                                removeCaptured(pokemon.name)
                                            }
                                        >
                                            <img
                                                width="24px"
                                                height="24px"
                                                src="https://img.icons8.com/color/48/000000/pokeball--v1.png"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
