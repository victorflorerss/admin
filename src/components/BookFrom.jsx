import { useState } from 'react';

function BookForm({ onAddBook }) {
  const [formData, setFormData] = useState({
    nombre: '',
    autor: '',
    precio: '',
    categoria: 'Ficción',
    imagen: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook(formData);
    setFormData({
      nombre: '',
      autor: '',
      precio: '',
      categoria: 'Ficción',
      imagen: ''
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre del libro</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Autor</label>
        <input
          type="text"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Precio</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        >
          <option value="Ficción">Ficción</option>
          <option value="No Ficción">No Ficción</option>
          <option value="Ciencia">Ciencia</option>
          <option value="Historia">Historia</option>
          <option value="Horror">Horror</option>
        </select>
      </div>

      <div className="form-group">
        <label>URL de la imagen</label>
        <input
          type="text"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="button-primary">Guardar Libro</button>
    </form>
  );
}

export default BookForm;
