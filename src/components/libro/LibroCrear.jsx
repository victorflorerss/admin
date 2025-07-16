import React, { useState, useEffect } from "react";
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
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const cargarCategorias = () => {
      axios.get("http://localhost:3000/categorias")
        .then(res => setCategorias(res.data))
        .catch(() => setCategorias([]));
    };
    cargarCategorias();
    window.addEventListener("focus", cargarCategorias);
    return () => window.removeEventListener("focus", cargarCategorias);
  }, []);

  const inputStyle = {width:'100%',padding:'8px',marginBottom:'12px',borderRadius:'4px',border:'1px solid #B0B0B0',fontSize:'15px',background:'#F4F6F8'};

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoLibro = {
      imagenUrl,
      nombre,
      autor,
      descripcion,
      categoria: categorias.find(cat => cat.id === Number(categoria))?.nombre || "",
      precio,
      isbn,
      urlLibro
    };
    axios.post("http://localhost:3000/libros", nuevoLibro)
      .then(res => {
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
    <form className="libro-form" style={{maxWidth:'400px',margin:'0 auto',background:'#fff',padding:'24px',borderRadius:'8px',boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}} onSubmit={handleSubmit}>
      <input type="text" placeholder="URL de la imagen" value={imagenUrl} onChange={e=>setImagenUrl(e.target.value)} style={inputStyle} />
      <div style={{width:'100%',height:'120px',background:'#F4F6F8',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',color:'#555',marginBottom:'16px',fontWeight:'500',fontSize:'18px'}}>
        {imagenUrl ? <img src={imagenUrl} alt="Vista previa" style={{maxHeight:'100%',maxWidth:'100%',objectFit:'contain'}} /> : 'Vista previa'}
      </div>
      <input type="text" placeholder="Nombre de libro" value={nombre} onChange={e=>setNombre(e.target.value)} style={inputStyle} />
      <input type="text" placeholder="Autor" value={autor} onChange={e=>setAutor(e.target.value)} style={inputStyle} />
      <input type="text" placeholder="ISBN" value={isbn} onChange={e=>setIsbn(e.target.value)} style={inputStyle} />
      <input type="text" placeholder="URL libro (PDF)" value={urlLibro} onChange={e=>setUrlLibro(e.target.value)} style={inputStyle} />
      <textarea placeholder="Descripción del libro" value={descripcion} onChange={e=>setDescripcion(e.target.value)} rows={3} style={{...inputStyle,resize:'none',color:'#111'}} />
      <select value={categoria} onChange={e=>setCategoria(e.target.value)} style={inputStyle}>
        <option value="">Categoría</option>
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.nombre}</option>
        ))}
      </select>
      <input type="number" placeholder="Precio (S/)" value={precio} onChange={e=>setPrecio(e.target.value)} style={inputStyle} />
      <button type="submit" style={{width:'100%',background:'#1746A2',color:'#fff',border:'none',borderRadius:'4px',padding:'10px 0',fontWeight:'bold',fontSize:'16px',letterSpacing:'1px'}}>GUARDAR</button>
    </form>
  );
};

export default LibroCrear;