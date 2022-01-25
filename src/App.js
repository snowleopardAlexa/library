import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState(null)
  const [bookId, setBookId] = useState(null)
  const [updating, setUpdating] = useState(false)

  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((json) => setBooks(json.books))
      .catch((err) => console.log(err))
  }, [])

  // submit form function
  const submitForm = async (event) => {
    event.preventDefault()

    try {
      const res = await fetch('/api/books', { 
      method: 'POST', 
      body: JSON.stringify({name, year}),
    })
    const json = await res.json()

    setBooks([...books, json.book])
    setName('')
    setYear('')
  } catch (err) {
    console.log(err)
  }
}

// delete book
const deleteBook = async (id) => {
try {
  await fetch(`/api/books/${id}`, { method: 'DELETE'})
  setBooks(books.filter(b => b.id !== id))

} catch (err) {
  console.log(err)
  }
}

// update book
const setBookToUpdate = (id) => {
  const book = books.find((b) => b.id === id)
  if (!book) return
  setUpdating(true)
  setBookId(book.id)
  setName(book.name)
  setYear(book.year)
}

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <h1 className="fw-normal text-center my-3">Books</h1>
          <div className="my-4">
            <form onSubmit={submitForm}>
               <div className="row">
                 <div className="col-5">
                   <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Name" 
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    />
                 </div>
                 <div className="col-5">
                   <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Year" 
                    value={year}
                    onChange={e => setYear(e.target.value)} 
                    />
                 </div>
                 <div className="col-2">
                   <button type="submit" className="btn-create">
                     {updating ? 'Update' : 'Create' }
                   </button>
                 </div>
               </div>
            </form>
          </div>
          {books?.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>year</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map(({ id, name, year }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{year}</td>
                    <td>
                    <button 
                        className="btn-warning me-3"
                        onClick={() => setBookToUpdate(id)}
                      >Update</button>
                      <button 
                        className="btn-delete"
                        onClick={() => deleteBook(id)}
                      >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
          <p>No movies</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App;