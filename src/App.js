import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [books, setBooks] = useState(null)
  useEffect(() => {
    fetch('/api/books')
    .then(res => res.json())
    .then(json => setBooks(json.books))
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <h1 className="fw-normal text-center my-3">Books</h1>
          {books?.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>year</th>
                </tr>
              </thead>
              <tbody>
                {books.map(({ id, name, year }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
           ) : (  
            <p>No books</p>
          )}
        </div>
      </div>  
    </div>
  );
}

export default App;
