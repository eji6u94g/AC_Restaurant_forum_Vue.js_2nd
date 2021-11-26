<template>
  <div class="card">
    <div class="card-header"><strong>4</strong> 收藏的餐廳</div>
    <div class="card-body">
      <router-link
        v-for="restaurant in userFavoritedrestaurants"
        :key="restaurant.id"
        :to="{ name: 'restaurant', params: { id: restaurant.id } }"
      >
        <img :src="restaurant.image" width="60" height="60" class="avatar" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFavoriteRestaurantsCard",
  props: {
    userFavoritedrestaurants: {
      type: Array,
      required: true,
    },
  },
};
</script>