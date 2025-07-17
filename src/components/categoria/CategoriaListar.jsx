import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoriaListar = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("http://35.94.124.77:3000/categorias/listar")
      .then((res) => {
        console.log("Respuesta de la API:", res.data);
        const data = res.data.categorias || [];
        setCategorias(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener categorías:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Lista de Categorías</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "18px",
        }}
      >
        {loading ? (
          <div>Cargando categorías...</div>
        ) : error ? (
          <div style={{ color: "red" }}>Error al cargar categorías.</div>
        ) : categorias.length === 0 ? (
          <div>No hay categorías registradas.</div>
        ) : (
          categorias.map((cat) => (
            <div
              key={cat.id}
              style={{
                background: "#F6F6F6",
                padding: "12px 18px",
                borderRadius: "8px",
                boxShadow: "0 4px 16px #0002",
                fontSize: "16px",
                fontWeight: "500",
                border: "2px solid #000",
              }}
            >
              {cat.nombrecat}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriaListar;
