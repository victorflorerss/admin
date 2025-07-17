import React, { useEffect, useState } from "react";
import axios from "axios";

const LibroCrear = () => {
  const [imagenUrl, setImagenUrl] = useState("");
  const [nombre, setNombre] = useState("");
  const [autor, setAutor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [isbn, setIsbn] = useState("");
  const [urlLibro, setUrlLibro] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    axios
      .get("http://35.94.124.77:3000/categorias/listar")
      .then((res) => setCategorias(res.data.categorias))
      .catch(() => setCategorias([]));

    axios
      .get("http://35.94.124.77:3000/autor/listar")
      .then((res) => setAutores(res.data.autores))
      .catch(() => setAutores([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoLibro = {
      imagenUrl,
      nombre,
      autor,
      descripcion,
      categoria:
        categorias.find((cat) => cat.id === Number(categoria))?.nombrecat || "",
      precio,
      isbn,
      urlLibro,
    };

    axios
      .post("http://35.94.124.77:3000/libro/crear", nuevoLibro)
      .then((res) => {
        setLibros([...libros, res.data]);
        setImagenUrl("");
        setNombre("");
        setAutor("");
        setDescripcion("");
        setCategoria("");
        setPrecio("");
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

      {/* URL Imagen */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          URL de la imagen
        </label>
        <input
          type="text"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          placeholder="https://example.com/portada.jpg"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
      </div>

      {/* Vista previa */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-xl border border-dashed border-gray-300 overflow-hidden">
        {imagenUrl ? (
          <img
            src={imagenUrl}
            alt="Vista previa"
            className="h-full object-contain"
          />
        ) : (
          <span className="text-gray-400">Vista previa de la imagen</span>
        )}
      </div>

      {/* Nombre del libro */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Nombre del libro
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Título del libro"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
      </div>

      {/* Autor - datalist */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Autor
        </label>
        <input
          list="autores"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Selecciona o escribe un autor"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
        <datalist id="autores">
          {autores.map((a) => (
            <option key={a.id} value={a.nombre} />
          ))}
        </datalist>
      </div>

      {/* ISBN */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          ISBN
        </label>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="978-xxxx-xxxx"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
      </div>

      {/* URL PDF */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          URL del libro (PDF)
        </label>
        <input
          type="text"
          value={urlLibro}
          onChange={(e) => setUrlLibro(e.target.value)}
          placeholder="https://example.com/archivo.pdf"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción breve del libro"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm resize-none transition"
        />
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Categoría
        </label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombrecat}
            </option>
          ))}
        </select>
      </div>

      {/* Precio */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Precio (S/)
        </label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="19.90"
          min="0"
          step="0.01"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition duration-300 shadow-md"
      >
        Guardar Libro
      </button>
    </form>
  );
};

export default LibroCrear;
