import { unsplashAPI } from "../utils/helpers"

export default {
  getRandom({ query, count }) {
    return unsplashAPI.photos.getRandom({ query, count })
  }
}