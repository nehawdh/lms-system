import axios from "axios";

const base =
  import.meta.env.VITE_API_URL   // e.g. http://localhost:8080
  ?? "";

export const http = axios.create({ baseURL: base });
