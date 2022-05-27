import axios from "axios";

const BASE_URL = "https://vibexshop.herokuapp.com/api/";

const TOKEN = () => {
  if (
    // JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
    //   .currentUser?.accessToken
    localStorage.getItem("persist:root")
  ) {
    return JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser?.accessToken;
  } else {
    return "";
  }
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN()}` },
});
