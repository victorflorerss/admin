function BookList({ books, onDelete }) {
  if (books.length === 0) return <p>No hay libros que coincidan.</p>;

  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <img src={book.imagen} alt={book.nombre} />
          <p className="book-title">{book.nombre}</p>
          <p className="book-author">{book.autor}</p>
          <p className="book-price">S/ {book.precio}.00</p>
          <div className="card-actions">
            <button onClick={() => onDelete(book.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;


