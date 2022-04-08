<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>

    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr />

    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments
      :restaurantComments="restaurantComments"
      :currentUser="currentUser"
      @after-delete-comment="afterDeleteComment"
    />

    <!-- 新增評論 CreateComment -->
    <CreateComment
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from "../components/RestaurantDetail.vue";
import RestaurantComments from "../components/RestaurantComments.vue";
import CreateComment from "../components/CreateComment.vue";
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "restaurant",
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
        isFavorited: false,
        isLiked: false,
      },
      restaurantComments: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurantInfo(restaurantId);
  },
  methods: {
    async fetchRestaurantInfo(restaurantId) {
      try {
        const res = await restaurantsAPI.getRestaurant({
          restaurantId,
        });
        if (res.statusText !== "OK") return new Error(res.statusText);

        const { restaurant, isFavorited, isLiked } = res.data;
        const {
          id,
          name,
          Category,
          opening_hours: openingHours,
          tel,
          address,
          description,
          Comments,
          image,
        } = restaurant;

        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : "未分類",
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked,
        };
        this.restaurantComments = Comments;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title:
            "Can't get information of this restaurant. Please try again later.",
        });
      }
    },
    afterDeleteComment(commentId) {
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload;
      this.restaurantComments.push({
        id: commentId,
        text,
        RestaurantId: restaurantId,
        createdAt: new Date(),
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          isAdmin: this.currentUser.isAdmin,
        },
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchRestaurantInfo(restaurantId);
    console.log("yes");
    next();
  },
};
</script>