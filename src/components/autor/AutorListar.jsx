import React, { useEffect, useState } from "react";

const AutorListar = () => {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    const storedAutores = JSON.parse(localStorage.getItem("autores")) || [];
    setAutores(storedAutores);
    const handleFocus = () => {
      const updatedAutores = JSON.parse(localStorage.getItem("autores")) || [];
      setAutores(updatedAutores);
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <div>
      <h2>Lista de Autores</h2>
      {autores.length === 0 ? (
        <p>No hay autores registrados.</p>
      ) : (
        <ul>
          {autores.map((autor, idx) => (
            <li key={idx}>{autor.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutorListar;