<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
import restaurantAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";

// const dummyData = {
//   restaurant: {
//     id: 1,
//     name: "Kaelyn Wunsch",
//     tel: "(582) 572-0301 x14208",
//     address: "2436 Trisha Track",
//     opening_hours: "08:00",
//     description: "Qui dolore et ut asperiores expedita iure velit qui est.",
//     image:
//       "https://loremflickr.com/320/240/restaurant,food/?random=63.192605923387866",
//     viewCounts: 1,
//     createdAt: "2021-11-12T08:51:33.000Z",
//     updatedAt: "2021-11-15T09:33:50.000Z",
//     CategoryId: 3,
//     Category: {
//       id: 3,
//       name: "義大利料理",
//       createdAt: "2021-11-12T08:51:33.000Z",
//       updatedAt: "2021-11-12T08:51:33.000Z",
//     },
//     Comments: [
//       {
//         id: 1,
//         text: "Autem debitis dolorem.",
//         UserId: 1,
//         RestaurantId: 1,
//         createdAt: "2021-11-12T08:51:33.000Z",
//         updatedAt: "2021-11-12T08:51:33.000Z",
//         User: {
//           id: 1,
//           name: "root",
//           email: "root@example.com",
//           password:
//             "$2a$10$vr7Byde8WjcCaI0VlTNjCuLCerpE8wiGo8ri2.ZSfAFrDg8k4wLbO",
//           isAdmin: true,
//           image: null,
//           createdAt: "2021-11-12T08:51:33.000Z",
//           updatedAt: "2021-11-12T08:51:33.000Z",
//         },
//       },
//       {
//         id: 51,
//         text: "Omnis qui consectetur.",
//         UserId: 1,
//         RestaurantId: 1,
//         createdAt: "2021-11-12T08:51:33.000Z",
//         updatedAt: "2021-11-12T08:51:33.000Z",
//         User: {
//           id: 1,
//           name: "root",
//           email: "root@example.com",
//           password:
//             "$2a$10$vr7Byde8WjcCaI0VlTNjCuLCerpE8wiGo8ri2.ZSfAFrDg8k4wLbO",
//           isAdmin: true,
//           image: null,
//           createdAt: "2021-11-12T08:51:33.000Z",
//           updatedAt: "2021-11-12T08:51:33.000Z",
//         },
//       },
//       {
//         id: 101,
//         text: "Praesentium tempora aut sunt perferendis.",
//         UserId: 1,
//         RestaurantId: 1,
//         createdAt: "2021-11-12T08:51:33.000Z",
//         updatedAt: "2021-11-12T08:51:33.000Z",
//         User: {
//           id: 1,
//           name: "root",
//           email: "root@example.com",
//           password:
//             "$2a$10$vr7Byde8WjcCaI0VlTNjCuLCerpE8wiGo8ri2.ZSfAFrDg8k4wLbO",
//           isAdmin: true,
//           image: null,
//           createdAt: "2021-11-12T08:51:33.000Z",
//           updatedAt: "2021-11-12T08:51:33.000Z",
//         },
//       },
//     ],
//   },
// };

export default {
  name: "RestaurantDashboard",
  data() {
    return {
      restaurant: {
        name: "",
        categoryName: "",
        commentsLength: -1,
        viewCounts: -1,
      },
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchDashboard(restaurantId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchDashboard(restaurantId);
    next();
  },
  methods: {
    async fetchDashboard(restaurantId) {
      try {
        const res = await restaurantAPI.getRestaurant({ restaurantId });
        if (res.statusText !== "OK") return new Error(res.statusText);
        const { name, Category, Comments, viewCounts } = res.data.restaurant;
        this.restaurant.name = name;
        this.restaurant.categoryName = Category.name;
        this.restaurant.commentsLength = Comments.length;
        this.restaurant.viewCounts = viewCounts;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title:
            "Can't get information of this restaurant. Please try again later.",
        });
      }
    },
  },
};
</script>