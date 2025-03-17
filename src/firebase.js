import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

const firebaseConfig = {
    apiKey: "AIzaSyAQ8ffwDe0_8MjnZUZKm0kUnkqIWxYBpTk",
    authDomain: "clase1-7bda8.firebaseapp.com",
    projectId: "clase1-7bda8",
    storageBucket: "clase1-7bda8.firebasestorage.app",
    messagingSenderId: "450754825372",
    appId: "1:450754825372:web:a86e65fd88d49b875eb159"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db }; // Exporta Firestore