<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="restaurant.image | emptyImageFilter"
        alt="Card image cap"
        width="286px"
        height="180px"
      />
      <div class="card-body">
        <span></span>
        <p class="card-text title-wrap">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{
          restaurant.Category.name
        }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          @click.prevent.stop="deleteFavorite(restaurant.id)"
          v-if="restaurant.isFavorited"
          :disabled="isProcessing"
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
        >
          移除最愛
        </button>
        <button
          @click.prevent.stop="addFavorite(restaurant.id)"
          v-else
          :disabled="isProcessing"
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
        >
          加到最愛
        </button>
        <button
          @click.prevent.stop="deleteLike(restaurant.id)"
          v-if="restaurant.isLiked"
          :disabled="isProcessing"
          type="button"
          class="btn btn-danger like mr-2"
        >
          Unlike
        </button>
        <button
          @click.prevent.stop="addLike(restaurant.id)"
          v-else
          :disabled="isProcessing"
          type="button"
          class="btn btn-primary like mr-2"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/emptyImageFilter";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "RestaurantCard",
  mixins: [emptyImageFilter],
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      isProcessing: false,
      imgurl: "",
    };
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title:
            "Can't add this restaurant to Favorite list. Please try again later.",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title:
            "Can't delete this restaurant from Favorite list. Please try again later.",
        });
      }
    },
    async addLike(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addLike({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title:
            "Can't add this restaurant to Like list. Please try again later.",
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.deleteLike({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: false,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title:
            "Can't delete this restaurant from Like list. Please try again later.",
        });
      }
    },
  },
};
</script>