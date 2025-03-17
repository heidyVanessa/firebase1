import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Importa Firestore
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const App = () => {
  const [items, setItems] = useState([]); // Almacena los elementos de la colección
  const [newItem, setNewItem] = useState({ name: "", description: "" }); // Estado para agregar un nuevo elemento
  const [editItem, setEditItem] = useState(null); // Estado para editar un elemento

  // Referencia a la colección de Firestore
  const itemsCollectionRef = collection(db, "items");

  // Función para obtener todos los elementos de la colección
  const getItems = async () => {
    const data = await getDocs(itemsCollectionRef);
    setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Función para agregar un nuevo elemento
  const addItem = async () => {
    if (newItem.name && newItem.description) {
      await addDoc(itemsCollectionRef, newItem);
      setNewItem({ name: "", description: "" }); // Limpia el formulario
      getItems(); // Actualiza la lista
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  // Función para actualizar un elemento
  const updateItem = async () => {
    if (editItem.name && editItem.description) {
      const itemDoc = doc(db, "items", editItem.id);
      await updateDoc(itemDoc, { name: editItem.name, description: editItem.description });
      setEditItem(null); // Limpia el estado de edición
      getItems(); // Actualiza la lista
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  // Función para eliminar un elemento
  const deleteItem = async (id) => {
    const itemDoc = doc(db, "items", id);
    await deleteDoc(itemDoc);
    getItems(); // Actualiza la lista
  };

  // Carga los elementos al montar el componente
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD con Firebase Firestore</h1>

      {/* Formulario para agregar un nuevo elemento */}
      <div>
        <h2>Agregar nuevo elemento</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button onClick={addItem}>Agregar</button>
      </div>

      {/* Lista de elementos */}
      <div>
        <h2>Lista de elementos</h2>
        {items.map((item) => (
          <div key={item.id} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => setEditItem(item)}>Editar</button>
            <button onClick={() => deleteItem(item.id)}>Eliminar</button>
          </div>
        ))}
      </div>

      {/* Formulario para editar un elemento */}
      {editItem && (
        <div>
          <h2>Editar elemento</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={editItem.description}
            onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
          />
          <button onClick={updateItem}>Actualizar</button>
          <button onClick={() => setEditItem(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default App;
