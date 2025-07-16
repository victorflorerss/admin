import React, { useEffect, useState } from "react";
import axios from "axios";

const LibroListar = () => {
  const [libros, setLibros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resLibros = await axios.get("http://localhost:3000/libros");
        setLibros(resLibros.data);
        const resCategorias = await axios.get("http://localhost:3000/categorias");
        setCategorias(resCategorias.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    cargarDatos();
    window.addEventListener("focus", cargarDatos);
    return () => window.removeEventListener("focus", cargarDatos);
  }, []);

  const librosFiltrados = categoriaFiltro
    ? libros.filter(libro => libro.categoria === categorias.find(cat => cat.id === Number(categoriaFiltro))?.nombre)
    : libros;

  return (
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <h2>Lista de Libros</h2>
      <div style={{marginBottom:'18px',display:'flex',alignItems:'center',gap:'12px'}}>
        <label htmlFor="categoriaFiltro" style={{fontWeight:'bold'}}>Filtrar por categoría:</label>
        <select id="categoriaFiltro" value={categoriaFiltro} onChange={e=>setCategoriaFiltro(e.target.value)} style={{padding:'7px',borderRadius:'4px',border:'1px solid #B0B0B0',fontSize:'15px'}}>
          <option value="">Todas</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>
      {librosFiltrados.length === 0 ? (
        <p>No hay libros registrados.</p>
      ) : (
        <div style={{display:'flex',flexWrap:'wrap',gap:'32px',justifyContent:'flex-start'}}>
          {librosFiltrados.map((libro, idx) => (
            <div key={idx} style={{width:'180px',display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'24px'}}>
              <div style={{width:'150px',height:'200px',background:'#F4F6F8',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',marginBottom:'12px',boxShadow:'0 4px 16px #0002',border:'2px solid #000'}}>
                {libro.imagenUrl ? <img src={libro.imagenUrl} alt="" style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}} /> : '-'}
              </div>
              <div style={{textAlign:'center',fontSize:'16px',fontWeight:'500',marginBottom:'4px'}}>{libro.nombre}</div>
              <div style={{textAlign:'center',fontSize:'15px',color:'#444',marginBottom:'8px'}}>{libro.autor || <span style={{color:'#bbb'}}>Sin autor</span>}</div>
              <div style={{textAlign:'center',fontWeight:'bold',fontSize:'18px',color:'#111'}}>S/{Number(libro.precio).toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibroListar;