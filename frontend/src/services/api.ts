import axios from "axios";
import { apiURL } from "../utils/config";

export const api = axios.create({
  baseURL: apiURL,
});
