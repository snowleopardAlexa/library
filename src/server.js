import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api"

    this.get("/books", () => {
      return {
        books: [
          { id: 1, name: "Zoo", year: 2010 },
          { id: 2, name: "Witcher: The Sword of Destiny", year: 2014 },
          { id: 3, name: "Anna Karenina", year: 1878 },
        ],
      }
    })
  },
})