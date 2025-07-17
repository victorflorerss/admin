import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoriaCrear = () => {
  const [nombreCat, setNombre] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    axios
      .get("http://35.94.124.77:3000/categorias/listar")
      .then((res) => {
        const data = res.data.categorias || [];
        setCategorias(data);
      })
      .catch(() => setCategorias([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombreCat.trim()) return;

    // 👇 Aquí corregido
    const nuevaCategoria = { categoria: nombreCat };

    axios
      .post("http://35.94.124.77:3000/categorias/registrar", nuevaCategoria)
      .then((res) => {
        setCategorias([...categorias, res.data]);
        setNombre("");
        setMensaje("Categoría creada exitosamente");
        setTimeout(() => setMensaje(""), 2000);
      })
      .catch((err) => {
        console.error("Error al crear categoría:", err);
        setMensaje("Error al crear la categoría");
        setTimeout(() => setMensaje(""), 2000);
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Crear Categoría</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={nombreCat}
          onChange={(e) => setNombre(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #B0B0B0",
            fontSize: "15px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#1746A2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "10px 0",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Crear
        </button>
      </form>

      {mensaje && (
        <div
          style={{ marginTop: "16px", color: "#1746A2", fontWeight: "bold" }}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default CategoriaCrear;
