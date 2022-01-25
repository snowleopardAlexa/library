import { createServer } from "miragejs"

createServer({
  routes() {
    this.namespace = "api"

    this.get("/books", () => {
      return {
        movies: [
          { id: 1, name: "Zoo", year: 2019 },
          { id: 2, name: "Witcher: The Sword of Destiny", year: 2014 },
          { id: 3, name: "Harry Potter and the Chambers of Secrets", year: 2017 },
        ],
      }
    })
  },
})