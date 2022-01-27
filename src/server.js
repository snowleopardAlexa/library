import { createServer, Model } from "miragejs";

// model
createServer ({
  models: {
    movie: Model
  },
  seeds(server) {
    server.create("book", { name: "Zoo", year: 2010 })
    server.create("book", { name: "Witcher: The Sword of Destiny", year: 2014 })
    server.create("book", { name: "Anna Karenina", year: 1878 })
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

    this.get("/books", (schema, request) => {
      return schema.books.all() 
    })
  },
})