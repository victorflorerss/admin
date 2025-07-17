import React, { useEffect, useState } from "react";
import axios from "axios";

const AutorListar = () => {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    axios
      .get("http://35.94.124.77:3000/autor/listar")
      .then((res) => setAutores(res.data.autores))
      .catch(() => setAutores([]));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Autores Registrados
      </h2>

      {autores.length === 0 ? (
        <p className="text-center text-gray-600">No hay autores registrados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {autores.map((autor) => (
            <div
              key={autor.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center max-w-xs mx-auto"
            >
              <div className="w-32 aspect-square rounded-full overflow-hidden mb-4 border-4 border-blue-400 shadow-sm">
                <img
                  src={autor.url_foto}
                  alt={autor.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg font-semibold text-gray-800 text-center">
                {autor.nombre}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutorListar;
