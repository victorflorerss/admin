import { useState } from 'react';
import AutorCrear from './components/AutorCrear';
import AutorEditar from './components/AutorEditar';
import AutorListar from './components/AutorListar';
import CategoriaCrear from './components/CategoriaCrear';
import CategoriaEditar from './components/CategoriaEditar';
import CategoriaListar from './components/CategoriaListar';
import LibroCrear from './components/LibroCrear';
import LibroEditar from './components/LibroEditar';
import LibroEliminar from './components/LibroEliminar';
import LibroListar from './components/LibroListar';
import './App.css';

function App() {
  const [vista, setVista] = useState('');
  const [open, setOpen] = useState({ autor: false, categoria: false, libro: false });

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderVista = () => {
    switch (vista) {
      case 'AutorCrear': return <AutorCrear />;
      case 'AutorEditar': return <AutorEditar />;
      case 'AutorListar': return <AutorListar />;
      case 'CategoriaCrear': return <CategoriaCrear />;
      case 'CategoriaEditar': return <CategoriaEditar />;
      case 'CategoriaListar': return <CategoriaListar />;
      case 'LibroCrear': return <LibroCrear />;
      case 'LibroEditar': return <LibroEditar />;
      case 'LibroEliminar': return <LibroEliminar />;
      case 'LibroListar': return <LibroListar />;
      default: return <div>Selecciona una opción del menú.</div>;
    }
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Menú</h2>
        <nav>
          <div>
            <h4 style={{cursor:'pointer'}} onClick={() => toggle('autor')}>Autores</h4>
            {open.autor && (
              <div className="submenu">
                <button className={vista==='AutorCrear' ? 'selected' : ''} onClick={() => setVista('AutorCrear')}>Registrar Autor</button>
                <button className={vista==='AutorEditar' ? 'selected' : ''} onClick={() => setVista('AutorEditar')}>Editar Autor</button>
                <button className={vista==='AutorListar' ? 'selected' : ''} onClick={() => setVista('AutorListar')}>Listar Autores</button>
              </div>
            )}
          </div>
          <div>
            <h4 style={{cursor:'pointer'}} onClick={() => toggle('categoria')}>Categorías</h4>
            {open.categoria && (
              <div className="submenu">
                <button className={vista==='CategoriaCrear' ? 'selected' : ''} onClick={() => setVista('CategoriaCrear')}>Crear Categoría</button>
                <button className={vista==='CategoriaEditar' ? 'selected' : ''} onClick={() => setVista('CategoriaEditar')}>Editar Categoría</button>
                <button className={vista==='CategoriaListar' ? 'selected' : ''} onClick={() => setVista('CategoriaListar')}>Listar Categorías</button>
              </div>
            )}
          </div>
          <div>
            <h4 style={{cursor:'pointer'}} onClick={() => toggle('libro')}>Libros</h4>
            {open.libro && (
              <div className="submenu">
                <button className={vista==='LibroCrear' ? 'selected' : ''} onClick={() => setVista('LibroCrear')}>Crear Libro</button>
                <button className={vista==='LibroEditar' ? 'selected' : ''} onClick={() => setVista('LibroEditar')}>Editar Libro</button>
                <button className={vista==='LibroEliminar' ? 'selected' : ''} onClick={() => setVista('LibroEliminar')}>Eliminar Libro</button>
                <button className={vista==='LibroListar' ? 'selected' : ''} onClick={() => setVista('LibroListar')}>Listar Libros</button>
              </div>
            )}
          </div>
        </nav>
      </aside>
      <main className="main">
        <h1>Administración</h1>
        {renderVista()}
      </main>
    </div>
  );
}

export default App;
