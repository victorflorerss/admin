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
            <div className="flex flex-col gap-6">
              {autores.map((autor) => (
                <div
                  key={autor.id}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex items-center max-w-lg mx-auto"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-400 shadow-sm flex-shrink-0 flex items-center justify-center">
                    <img
                      src={autor.url_foto}
                      alt={autor.nombre}
                      className="object-cover"
                      style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                    />
                  </div>
                  <div className="ml-6 flex items-center h-20">
                    <p className="text-lg font-semibold text-gray-800">{autor.nombre}</p>
                  </div>
                </div>
              ))}
            </div>
      )}
    </div>
  );
};

export default AutorListar;
