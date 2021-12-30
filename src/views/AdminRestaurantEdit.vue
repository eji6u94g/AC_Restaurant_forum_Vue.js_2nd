<template>
  <div class="container py-5">
    <AdminRestaurantForm
      :initial-restaurant="restaurant"
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm.vue";
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  name: "AdminRestaurantEdit",
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        tel: "",
        address: "",
        openingHours: "",
        description: "",
        image: "",
        categoryId: -1,
      },
      isProcessing: false,
    };
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const res = await adminAPI.restaurants.getDetails({ restaurantId });
        if (res.statusText !== "OK") {
          throw new Error(res.statusText);
        }
        const {
          id,
          name,
          tel,
          address,
          opening_hours: openingHours,
          description,
          image,
          CategoryId: categoryId,
        } = res.data.restaurant;
        this.restaurant = {
          ...this.restaurant,
          id: id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryId,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title:
            "Can't get information of this restaurant. Please try again latter.",
        });
      }
    },
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.update({
          formData,
          restaurantId: this.restaurant.id,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title:
            "Can't update information of this restaurant. Please try again latter.",
        });
      }
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
};
</script>