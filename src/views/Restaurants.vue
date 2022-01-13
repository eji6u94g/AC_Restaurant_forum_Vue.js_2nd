<template>
  <div class="container py-5">
    <Navtabs />
    <Spinner v-if="isLoading" />

    <template v-else>
      <!-- RestaurantsPills -->
      <RestaurantsNavPills :categories="categories" />

      <!-- RestaurantsCards -->
      <div class="row">
        <RestaurantCard
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :initial-restaurant="restaurant"
        />
      </div>

      <!-- RestaurantsPagination -->
      <RestaurantsPagination
        v-if="totalPage.length > 1"
        :categoryId="categoryId"
        :currentPage="currentPage"
        :totalPage="totalPage"
        :previousPage="previousPage"
        :nextPage="nextPage"
      />

      <div v-if="totalPage.length < 1">此類別目前沒有資料</div>
    </template>
  </div>
</template>

<script>
import Navtabs from "../components/Navtabs.vue";
import RestaurantCard from "../components/RestaurantCard.vue";
import RestaurantsNavPills from "../components/RestaurantsNavPills.vue";
import RestaurantsPagination from "../components/RestaurantsPagination.vue";
import Spinner from "../components/Spinner.vue";
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";

export default {
  name: "Restaurants",
  components: {
    Navtabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
    Spinner,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
      isLoading: false,
    };
  },
  created() {
    const { page = "", categoryId = "" } = this.$route.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
  },
  beforeRouteUpdate(to, from, next) {
    const { page = "", categoryId = "" } = to.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
    next();
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        this.isLoading = true;
        const res = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId,
        });
        if (res.statusText !== "OK") {
          throw new Error(res.statusText);
        }
        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next,
        } = res.data;
        this.restaurants = restaurants;
        this.categories = categories;
        this.categoryId = categoryId;
        this.currentPage = page;
        this.totalPage = totalPage;
        this.previousPage = prev;
        this.nextPage = next;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Can't reach server. Please try again later.",
        });
      }
    },
  },
};
</script>