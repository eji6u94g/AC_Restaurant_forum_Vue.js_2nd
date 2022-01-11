import { apiHelper } from "../utils/helpers";

export default {
  categories: {
    get() {
      return apiHelper.get('/admin/categories')
    },
    create({ name }) {
      return apiHelper.post('/admin/categories', { name })
    },
    delete({ categoryId }) {
      return apiHelper.delete(`/admin/categories/${categoryId}`)
    },
    update({ categoryId, name }) {
      return apiHelper.put(`/admin/categories/${categoryId}`, { name })
    },

  },
  restaurants: {
    get() {
      return apiHelper.get('/admin/restaurants')
    },
    getDetails({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },
    create({ formData }) {
      return apiHelper.post('/admin/restaurants', formData)
    },
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
    },
    update({ formData, restaurantId }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData)
    }
  },
  users: {
    get() {
      return apiHelper.get('/admin/users')
    },
    update({ userId, isAdmin }) {
      return apiHelper.put(`/admin/users/${userId}`, { isAdmin })
    }
  }
}