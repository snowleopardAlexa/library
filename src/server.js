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

    this.get("/books", (schema, request) => {
      return schema.books.all()
    })
    
    this.get("/books/:id", (schema, request) => {
      let id = request.params.id
    
      return schema.books.find(id)
    })
    
    this.post("/books", (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
    
      return schema.books.create(attrs)
    })
    
    this.patch("/books/:id", (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody)
      let id = request.params.id
      let book = schema.books.find(id)
    
      return book.update(newAttrs)
    })
    
    this.delete("/books/:id", (schema, request) => {
      let id = request.params.id
    
      return schema.books.find(id).destroy()
    })
  },
})