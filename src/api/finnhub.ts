import axios from "axios"

const TOKEN = "cdmsgvqad3i9q6h671q0cdmsgvqad3i9q6h671qg"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
      token: TOKEN
    }
  })