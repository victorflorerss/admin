import React, { useState, useEffect } from "react";
import axios from "axios";

const LibroCrear = () => {
  const [imagenUrl, setImagenUrl] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [urlLibro, setUrlLibro] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    axios
      .get("http://35.94.124.77:3000/categorias/listar")
      .then((res) => setCategorias(res.data.categorias))
      .catch(() => setCategorias([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoLibro = {
      imagenUrl,
      nombre,
      descripcion,
      categoria:
        categorias.find((cat) => cat.id === Number(categoria))?.nombrecat || "",
      precio,
      autor,
      isbn,
      urlLibro,
    };

    axios
      .post("http://35.94.124.77:3000/libro/crear", nuevoLibro)
      .then((res) => {
        setLibros([...libros, res.data]);
        setImagenUrl("");
        setNombre("");
        setDescripcion("");
        setCategoria("");
        setPrecio("");
        setAutor("");
        setIsbn("");
        setUrlLibro("");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 space-y-5"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Registrar Nuevo Libro
      </h2>

      {/* Campo URL de imagen */}
      <div>
        <input
          type="text"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          placeholder="URL de la imagen"
          className="w-full px-4 py-3 rounded-lg border border-black bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
      </div>

      {/* Vista previa de imagen (ajustada) */}
        <div className="w-full h-48 bg-white flex items-center justify-center rounded-xl border border-dashed border-gray-300 overflow-hidden mb-4">
        {imagenUrl ? (
        <img
          src={imagenUrl}
          alt="Vista previa"
          className="object-contain"
          style={{
          maxHeight: "160px",
          maxWidth: "100%",
          height: "auto",
          width: "auto",
        }}
        />
      ) : null}
      </div>


      {/* Nombre del libro */}
      <div>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de libro"
          className="w-full px-4 py-3 rounded-lg border border-black bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
      </div>

      {/* Descripción con fondo blanco puro y bordes negros */}
      <div>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          rows={2}
          className="w-full px-4 py-3 rounded-lg border border-black bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm resize-none transition"
          style={{ backgroundColor: '#fff', color: '#000', borderColor: '#000' }}
        />






      </div>

      {/* Autor */}
      <div>
        <input
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Autor"
          className="w-full px-4 py-3 rounded-lg border border-black bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
      </div>

      {/* ISBN */}
      <div>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN"
          className="w-full px-4 py-3 rounded-lg border border-black bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
      </div>

      {/* URL libro (PDF) */}
      <div>
        <input
          type="text"
          value={urlLibro}
          onChange={(e) => setUrlLibro(e.target.value)}
          placeholder="URL libro (PDF)"
          className="w-full px-4 py-3 rounded-lg border border-black bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
      </div>

      {/* Categoría y Precio */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-black bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
          >
            <option value="">Categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombrecat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio (S/)"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 rounded-lg border border-black bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
          />
        </div>
      </div>

      {/* Botón GUARDAR con color exacto #1e3a8a */}
      <button
        type="submit"
        className="w-full text-white font-bold py-3 px-4 rounded-lg hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition shadow-lg"
        style={{ backgroundColor: "#1e3a8a" }}
      >
        GUARDAR
      </button>
    </form>
  );
};

export default LibroCrear;
