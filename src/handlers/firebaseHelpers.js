import {
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const addToFirebase = async ({ objectToSave }, collectionName) => {
    try {
        const docRef = await addDoc(
            collection(db, collectionName),
            objectToSave
        );
        console.log(
            "Document written to table " + collectionName + " with ID: ",
            docRef.id
        );
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

//No me la cabeza esta semana ni para reusar los helpers y me tocó copy+paste
const getFromFirebase = async (id, collectionName) => {
    try {
        
    } catch (error) {
        console.error(error);
    }
}

const updateFromFirebase = async (id, collectionName) => {
    try {
        
    } catch (error) {
        console.error(error);
    }
}

const deleteFromFirebase = async (id, collectionName) => {
    try {
        
    } catch (error) {
        console.error(error)
    }
}

export {
    addToFirebase,
    getFromFirebase,
    updateFromFirebase,
    deleteFromFirebase,
};
