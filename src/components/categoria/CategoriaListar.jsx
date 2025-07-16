import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoriaListar = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/categorias")
      .then(res => setCategorias(res.data))
      .catch(() => setCategorias([]));
  }, []);

  return (
    <div style={{maxWidth:'500px',margin:'0 auto'}}>
      <h2>Lista de Categorías</h2>
      <div style={{display:'flex',flexDirection:'column',gap:'12px',marginTop:'18px'}}>
        {categorias.length === 0 ? (
          <div>No hay categorías registradas.</div>
        ) : (
          categorias.map(cat => (
            <div key={cat.id} style={{background:'#F6F6F6',padding:'12px 18px',borderRadius:'8px',boxShadow:'0 4px 16px #0002',fontSize:'16px',fontWeight:'500',border:'2px solid #000'}}>
              {cat.nombre}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriaListar;