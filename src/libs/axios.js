import axios from "axios";

export default axios.create({
  baseURL: "http://www.omdbapi.com",
  params: {
    apikey: "25fc1113",
  },
});
