import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
} from "firebase/firestore";

function Subidos() {
    const [pokemonesSubidos, setpokemonesSubidos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "subidos"),
            (snapshot) => {
                const nuevosPokemones = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    types: doc.data().types,
                }));
                setpokemonesSubidos(nuevosPokemones);
            }
        );
        return () => unsubscribe();
    }, []);

    const removeFromFireStore = async (name) => {
        const subidosCollection = collection(db, "subidos");
        var pokemonToRemove = "subidos".find((subido) => subido.name === name);
        const docRef = doc(subidosCollection, pokemonToRemove.id);
        await deleteDoc(docRef);
        console.log(`Document with id ${pokemonToRemove.id} deleted`);
    };

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

    return (
        <>
            <div>
                {pokemonesSubidos.map((pokemon) => (
                    <div className="card card-detail my-5 mx-auto">
                        <img
                            src={pokemon.url}
                            alt={pokemon.name}
                            className="card-img-top"
                        />
                        <div className="card-body">
                            <h2 className="card-title">{pokemon.name}</h2>
                            <p className="card-text">
                                {pokemon.types.map((type, index) => (
                                    <span
                                        className={getTypeClass(type)}
                                        key={index}
                                    >
                                        {type}
                                    </span>
                                ))}
                            </p>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-evenly">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(-1)}
                                >
                                    Volver
                                </button>
                                <div
                                    data-toggle="tooltip"
                                    title="Remover de subidos"
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
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/6467/6467134.png"
                                            alt="eliminar"
                                            width="30px"
                                            height="30px"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Subidos;
