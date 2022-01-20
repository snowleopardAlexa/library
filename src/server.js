import { createServer, Model } from "miragejs";

let books = [
  { id: 1, name: "Zoo", year: 2010 },
  { id: 2, name: "Witcher: The Sword of Destiny", year: 2014 },
  { id: 3, name: "Anna Karenina", year: 1878 },
]

// model
createServer ({
  models: {
    movie: Model
  },
  routes() {
    this.namespace = "api"

    // response to a POST request
    this.post("/books", (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      attrs.id = Math.floor(Math.random() * 100)
      books.push(attrs)

      return { book: attrs }
    })

    this.get("/books", () => {
      return {
        books
      }
    })
  },
})