<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>

    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr />

    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments
      :restaurantComments="restaurantComments"
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

const dummyData = {
  restaurant: {
    id: 1,
    name: "Kaelyn Wunsch",
    tel: "(582) 572-0301 x14208",
    address: "2436 Trisha Track",
    opening_hours: "08:00",
    description: "Qui dolore et ut asperiores expedita iure velit qui est.",
    image:
      "https://loremflickr.com/320/240/restaurant,food/?random=63.192605923387866",
    viewCounts: 1,
    createdAt: "2021-11-12T08:51:33.000Z",
    updatedAt: "2021-11-15T09:33:50.369Z",
    CategoryId: 3,
    Category: {
      id: 3,
      name: "義大利料理",
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
    },
    FavoritedUsers: [],
    LikedUsers: [],
    Comments: [
      {
        id: 101,
        text: "Praesentium tempora aut sunt perferendis.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        User: {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$vr7Byde8WjcCaI0VlTNjCuLCerpE8wiGo8ri2.ZSfAFrDg8k4wLbO",
          isAdmin: true,
          image: null,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
        },
      },
      {
        id: 51,
        text: "Omnis qui consectetur.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        User: {
          id: 2,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$vr7Byde8WjcCaI0VlTNjCuLCerpE8wiGo8ri2.ZSfAFrDg8k4wLbO",
          isAdmin: true,
          image: null,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
        },
      },
      {
        id: 1,
        text: "Autem debitis dolorem.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        User: {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$vr7Byde8WjcCaI0VlTNjCuLCerpE8wiGo8ri2.ZSfAFrDg8k4wLbO",
          isAdmin: true,
          image: null,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
        },
      },
    ],
  },
  isFavorited: false,
  isLiked: false,
};

const dummyUser = {
  currentUser: {
    id: 1,
    name: "root",
    email: "root@example.com",
    image: null,
    isAdmin: true,
  },
  isAuthenticated: true,
};

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
      currentUser: dummyUser.currentUser,
    };
  },
  methods: {
    fetchRestaurantInfo(restaurantId) {
      console.log("id", restaurantId);
      this.restaurant = {
        id: dummyData.restaurant.id,
        name: dummyData.restaurant.name,
        categoryName: dummyData.restaurant.Category.name,
        image: dummyData.restaurant.image,
        openingHours: dummyData.restaurant.opening_hours,
        tel: dummyData.restaurant.tel,
        address: dummyData.restaurant.address,
        description: dummyData.restaurant.description,
        isFavorited: dummyData.isFavorited,
        isLiked: dummyData.isLiked,
      };

      this.restaurantComments = dummyData.restaurant.Comments;
    },
    afterDeleteComment(commentId) {
      console.log("afterDeleteComment", commentId);
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
    },
    afterCreateComment(payload) {
      console.log("afterCreateComment", payload);
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
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurantInfo(restaurantId);
    // console.log("params", this.$route.params);
  },
};
</script>