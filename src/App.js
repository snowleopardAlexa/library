import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [books, setBooks] = useState(null)
  useEffect(() => {
    fetch('/api/books')
    .then(res => res.json())
    .then(json => setBooks(json.books))
    .catch(err => console.log(err))
  })

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">

        </div>
      </div>  
    </div>
  );
}

export default App;
