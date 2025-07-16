import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoriaEditar = () => {
  const [categorias, setCategorias] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [eliminandoId, setEliminandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [confirmar, setConfirmar] = useState(false);
  const [eliminada, setEliminada] = useState(false);

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

  const guardarCategorias = (cats) => {
    setCategorias(cats);
  };

  const handleEditar = (id, nombre) => {
    setEditandoId(id);
    setNuevoNombre(nombre);
    setMensaje("");
  };

  const handleGuardar = (id) => {
    if (!nuevoNombre.trim()) return;
    axios.put(`http://localhost:3000/categorias/${id}`, { nombre: nuevoNombre })
      .then(res => {
        const actualizadas = categorias.map(cat => cat.id === id ? res.data : cat);
        guardarCategorias(actualizadas);
        setEditandoId(null);
        setMensaje("Categoría editada exitosamente");
        setTimeout(()=>setMensaje(""), 2000);
      });
  };

  const handleEliminar = (id) => {
    setEliminandoId(id);
    setConfirmar(true);
    setEliminada(false);
  };

  const confirmarEliminar = () => {
    axios.delete(`http://localhost:3000/categorias/${eliminandoId}`)
      .then(() => {
        const actualizadas = categorias.filter(cat => cat.id !== eliminandoId);
        guardarCategorias(actualizadas);
        setConfirmar(false);
        setEliminada(true);
        setMensaje("");
      });
  };

  const cerrarEliminada = () => {
    setEliminada(false);
    setEliminandoId(null);
  };

  return (
    <div style={{maxWidth:'600px',margin:'0 auto'}}>
      <h2>Editar Categoría</h2>
      {mensaje && <div style={{marginBottom:'16px',color:'#1746A2',fontWeight:'bold'}}>{mensaje}</div>}
      <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
        {categorias.length === 0 && <div>No hay categorías registradas.</div>}
        {categorias.map(cat => (
          <div key={cat.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#F6F6F6',padding:'14px 18px',borderRadius:'8px',boxShadow:'0 2px 8px #0001'}}>
            {editandoId === cat.id ? (
              <>
                <input value={nuevoNombre} onChange={e=>setNuevoNombre(e.target.value)} style={{padding:'6px',borderRadius:'4px',border:'1px solid #B0B0B0',fontSize:'15px',marginRight:'10px'}} />
                <button onClick={()=>handleGuardar(cat.id)} style={{background:'#1746A2',color:'#fff',border:'none',borderRadius:'4px',padding:'7px 14px',fontWeight:'bold',marginRight:'6px'}}>Guardar</button>
                <button onClick={()=>setEditandoId(null)} style={{background:'#B0B0B0',color:'#fff',border:'none',borderRadius:'4px',padding:'7px 14px',fontWeight:'bold'}}>Cancelar</button>
              </>
            ) : (
              <>
                <span style={{fontSize:'16px',fontWeight:'500'}}>{cat.nombre}</span>
                <div>
                  <button onClick={()=>handleEditar(cat.id,cat.nombre)} style={{background:'#1746A2',color:'#fff',border:'none',borderRadius:'4px',padding:'7px 14px',fontWeight:'bold',marginRight:'6px'}}>Editar</button>
                  <button onClick={()=>handleEliminar(cat.id)} style={{background:'#D7263D',color:'#fff',border:'none',borderRadius:'4px',padding:'7px 14px',fontWeight:'bold'}}>Eliminar</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {/* Modal de confirmación */}
      {confirmar && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'#0007',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'#fff',padding:'32px 28px',borderRadius:'10px',boxShadow:'0 4px 16px #0002',textAlign:'center'}}>
            <div style={{fontSize:'18px',marginBottom:'18px'}}>¿Seguro que desea eliminar la categoría?</div>
            <button onClick={()=>setConfirmar(false)} style={{background:'#B0B0B0',color:'#fff',border:'none',borderRadius:'4px',padding:'8px 22px',fontWeight:'bold',marginRight:'10px'}}>Cancelar</button>
            <button onClick={confirmarEliminar} style={{background:'#D7263D',color:'#fff',border:'none',borderRadius:'4px',padding:'8px 22px',fontWeight:'bold'}}>Sí</button>
          </div>
        </div>
      )}
      {/* Modal de eliminada */}
      {eliminada && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'#0007',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'#fff',padding:'32px 28px',borderRadius:'10px',boxShadow:'0 4px 16px #0002',textAlign:'center'}}>
            <div style={{fontSize:'18px',marginBottom:'18px'}}>La categoría está eliminada</div>
            <button onClick={cerrarEliminada} style={{background:'#1746A2',color:'#fff',border:'none',borderRadius:'4px',padding:'8px 22px',fontWeight:'bold'}}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriaEditar;