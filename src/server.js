import { belongsTo, createServer, hasMany, Model } from "miragejs";

// model
createServer ({
  models: {
    book: Model.extend({
      characters: hasMany(),
    }),
    character: Model.extend({
      book: belongsTo(),
    }),
  },
  seeds(server) {
    const geralt = server.create("character", { name: "Geralt from Rivia"})
    const yen = server.create("character", { name: "Yennefer from Vengerberg"})
    const oz = server.create("character", { name: "Jackson Oz"})
    const mitch = server.create("character", { name: "Mitch Morgan"})
    const hermy = server.create("character", { name: "Hermionie Granger"})

    server.create("book", { name: "Zoo", year: 2010, characters: [oz, mitch] })
    server.create("book", { name: "Witcher: The Sword of Destiny", year: 2014, characters: [geralt, yen] })
    server.create("book", { name: "Anna Karenina", year: 1878, characters: [hermy] })
  },
  routes() {
    this.namespace = "api"
    
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
    
    // shortcuts for get and delete
    this.get('/books')
    this.get('/books/:id')
    this.del('/books/:id')

    this.get('/books/:id/characters', (schema, request) => {
      let book = schema.books.find(request.params.id)

      return book.actors
    })
    
  },
})