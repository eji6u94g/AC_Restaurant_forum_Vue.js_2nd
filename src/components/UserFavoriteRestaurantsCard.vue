<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ userFavoritedrestaurants.length }}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <router-link
        v-for="restaurant in userFavoritedrestaurants"
        :key="restaurant.id"
        :to="{ name: 'restaurant', params: { id: restaurant.id } }"
      >
        <img :src="restaurant.image | emptyImageFilter" width="60" height="60" class="avatar" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/emptyImageFilter";

export default {
  name: "UserFavoriteRestaurantsCard",
  mixins: [emptyImageFilter],
  props: {
    userFavoritedrestaurants: {
      type: Array,
      required: true,
    },
  },
};
</script>