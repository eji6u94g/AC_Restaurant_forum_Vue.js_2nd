<template>
  <div class="container py-5">
    <Navtabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">人氣餐廳</h1>
      <hr />
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="card mb-3"
        style="max-width: 540px; margin: auto"
      >
        <div class="row no-gutters">
          <div class="col-md-4">
            <a href="#">
              <img class="card-img" :src="restaurant.image | emptyImage" />
            </a>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ restaurant.name }}</h5>
              <span class="badge badge-secondary"
                >收藏數：{{ restaurant.FavoriteCount }}</span
              >
              <p class="card-text">
                {{ restaurant.description }}
              </p>
              <router-link
                :to="{ name: 'restaurant', params: { id: restaurant.id } }"
                class="btn btn-primary mr-2"
                >Show</router-link
              >

              <button
                v-if="restaurant.isFavorited"
                @click.prevent.stop="deleteFavorite(restaurant.id)"
                type="button"
                class="btn btn-danger mr-2"
              >
                移除最愛
              </button>
              <button
                v-else
                @click.prevent.stop="addFavorite(restaurant.id)"
                type="button"
                class="btn btn-primary"
              >
                加到最愛
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Navtabs from "../components/Navtabs.vue";
import Spinner from "../components/Spinner.vue";
import { emptyImageFilter } from "./../utils/emptyImageFilter";
import restaurantsAPI from "../apis/restaurants";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "RestaurantsTop",
  mixins: [emptyImageFilter],
  components: {
    Navtabs,
    Spinner,
  },
  data() {
    return {
      restaurants: [
        {
          id: -1,
          name: "",
          description: "",
          iamge: "",
          isFavorited: true,
          FavoriteCount: -1,
        },
      ],
      isLoading: false,
    };
  },
  methods: {
    async fetchRestaurants() {
      try {
        this.isLoading = true;
        const res = await restaurantsAPI.getRestaurantsTop();
        if (res.statusText !== "OK") {
          throw new Error(res.statusText);
        }
        this.restaurants = res.data.restaurants.map((restaurant) => ({
          id: restaurant.id,
          image: restaurant.image,
          name: restaurant.name,
          FavoriteCount: restaurant.FavoriteCount,
          description: restaurant.description,
          isFavorited: restaurant.isFavorited,
        }));
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title:
            "Can't get information of restaurants. Please try again later.",
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurants = this.restaurants.map((restaurant) => {
          if (restaurant.id === restaurantId) {
            return {
              ...restaurant,
              isFavorited: true,
            };
          } else {
            return restaurant;
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title:
            "Can't add this restaurant to Favorite list. Please try again later.",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurants = this.restaurants.map((restaurant) => {
          if (restaurant.id === restaurantId) {
            return {
              ...restaurant,
              isFavorited: false,
            };
          } else {
            return restaurant;
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title:
            "Can't delete this restaurant from Favorite list. Please try again later.",
        });
      }
    },
  },
  created() {
    this.fetchRestaurants();
  },
};
</script>