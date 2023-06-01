import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Subir() {
    const [checkboxValues, setCheckboxValues] = useState([]);
    const [Name, setName] = useState("");
    const [URL, setURL] = useState("");
    const navigate = useNavigate();

    const addtoFireStore = async () => {
        try {
            const docRef = await addDoc(collection(db, "subidos"), {
                name: Name,
                url: URL,
                types: [...checkboxValues],
            });
            console.log(docRef.id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleURLChange = (event) => {
        setURL(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            if (checkboxValues.length < 2) {
                setCheckboxValues((prevCheckboxValues) => [
                    ...prevCheckboxValues,
                    value,
                ]);
            }
        } else {
            setCheckboxValues((prevCheckboxValues) =>
                prevCheckboxValues.filter(
                    (checkboxValue) => checkboxValue !== value
                )
            );
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!Name || !URL) {
            alert("Por favor, ingresa todos los campos");
            return;
        }

        addtoFireStore();

        setName("");
        setURL("");
        setCheckboxValues([]);
    };

    return (
        <div>
            <h1 className="text-center my-4">Subir</h1>
            <form onSubmit={handleFormSubmit}>
                <label className="fs-5">
                    Nombre:
                    <input
                        type="text"
                        value={Name}
                        onChange={handleNameChange}
                        className="form-control"
                    />
                </label>
                <br />

                <label className="fs-5">
                    URL (imagen):
                    <input
                        type="url"
                        value={URL}
                        onChange={handleURLChange}
                        className="form-control"
                    />
                </label>
                <br />

                <h4 className="my-3">Tipos:</h4>

                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="normal"
                        checked={checkboxValues.includes("normal")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("normal")
                        }
                        className="form-check-input mt-1 fs-5"
                    />
                    Normal
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="grass"
                        checked={checkboxValues.includes("grass")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("grass")
                        }
                        className="form-check-input mt-1"
                    />
                    Grass
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="fire"
                        checked={checkboxValues.includes("fire")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("fire")
                        }
                        className="form-check-input mt-1"
                    />
                    Fire
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="water"
                        checked={checkboxValues.includes("water")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("water")
                        }
                        className="form-check-input mt-1"
                    />
                    Water
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="bug"
                        checked={checkboxValues.includes("bug")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("bug")
                        }
                        className="form-check-input mt-1"
                    />
                    Bug
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="poison"
                        checked={checkboxValues.includes("poison")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("poison")
                        }
                        className="form-check-input mt-1"
                    />
                    Poison
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="ghost"
                        checked={checkboxValues.includes("ghost")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("ghost")
                        }
                        className="form-check-input mt-1"
                    />
                    Ghost
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="rock"
                        checked={checkboxValues.includes("rock")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("rock")
                        }
                        className="form-check-input mt-1"
                    />
                    Rock
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="ground"
                        checked={checkboxValues.includes("ground")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("ground")
                        }
                        className="form-check-input mt-1"
                    />
                    Ground
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="electric"
                        checked={checkboxValues.includes("electric")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("electric")
                        }
                        className="form-check-input mt-1"
                    />
                    Electric
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="psychic"
                        checked={checkboxValues.includes("psychic")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("psychic")
                        }
                        className="form-check-input mt-1"
                    />
                    Psychic
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="ice"
                        checked={checkboxValues.includes("ice")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("ice")
                        }
                        className="form-check-input mt-1"
                    />
                    Ice
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="dragon"
                        checked={checkboxValues.includes("dragon")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("dragon")
                        }
                        className="form-check-input mt-1"
                    />
                    Dragon
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="dark"
                        checked={checkboxValues.includes("dark")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("dark")
                        }
                        className="form-check-input mt-1"
                    />
                    Dark
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="fairy"
                        checked={checkboxValues.includes("fairy")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("fairy")
                        }
                        className="form-check-input mt-1"
                    />
                    Fairy
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="fighting"
                        checked={checkboxValues.includes("fighting")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("fighting")
                        }
                        className="form-check-input mt-1"
                    />
                    Fighting
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="flying"
                        checked={checkboxValues.includes("flying")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("flying")
                        }
                        className="form-check-input mt-1"
                    />
                    Flying
                </label>
                <br />
                <label className="fs-5">
                    <input
                        type="checkbox"
                        name="option"
                        value="steel"
                        checked={checkboxValues.includes("steel")}
                        onChange={handleCheckboxChange}
                        disabled={
                            checkboxValues.length >= 2 &&
                            !checkboxValues.includes("steel")
                        }
                        className="form-check-input mt-1"
                    />
                    Steel
                </label>
                <br />

                <button className="btn btn-success my-2" type="submit">
                    Guardar
                </button>
            </form>
            <button
                className="btn btn-primary mb-4"
                onClick={() => navigate(-1)}
            >
                Volver
            </button>
        </div>
    );
}
