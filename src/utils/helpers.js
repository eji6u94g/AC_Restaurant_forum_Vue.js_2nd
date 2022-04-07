import axios from "axios"
import Swal from "sweetalert2"
import { createApi } from "unsplash-js";

// axios
const baseURL = "https://forum-express-api.herokuapp.com/api"
const axiosInstance = axios.create({
  baseURL: baseURL
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export const apiHelper = axiosInstance

//sweetAlert
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

//unsplash img
const unsplash = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "dwUVZ_8GPfjbNxtfH4skJ7Jmb8juB0NM3sCzrDVVz6w"
});

export const unsplashAPI = unsplash
