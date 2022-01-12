<template>
  <div class="container py-5">
    <Navtabs />
    <Spinner v-if="isLoading" />

    <template v-else>
      <h1 class="mt-5">最新動態</h1>
      <hr />
      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <!-- 最新餐廳 NewestRestaurants -->
          <NewestRestaurants :restaurants="restaurants" />
        </div>
        <div class="col-md-6">
          <!-- 最新評論 NewestComments-->
          <h3>最新評論</h3>
          <NewestComments :comments="comments" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Navtabs from "../components/Navtabs.vue";
import NewestRestaurants from "../components/NewestRestaurants.vue";
import NewestComments from "../components/NewestComments.vue";
import Spinner from "../components/Spinner.vue";
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";

export default {
  name: "RestaurantsFeeds",
  components: {
    Navtabs,
    NewestRestaurants,
    NewestComments,
    Spinner,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchFeeds() {
      try {
        this.isLoading = true;
        const res = await restaurantsAPI.getRestaurantsFeeds();
        if (res.statusText !== "OK") {
          throw new Error(res.statusText);
        }
        this.restaurants = res.data.restaurants;
        this.comments = res.data.comments.filter(
          (comment) => comment.Restaurant
        );
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "Server is busy. Please try again later",
        });
      }
    },
  },
  created() {
    this.fetchFeeds();
  },
};
</script>