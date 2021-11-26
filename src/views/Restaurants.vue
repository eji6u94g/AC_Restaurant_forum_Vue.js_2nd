<template>
  <div class="container py-5">
    <Navtabs />
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
      :categoryId="categoryId"
      :currentPage="currentPage"
      :totalPage="totalPage"
      :previousPage="previousPage"
      :nextPage="nextPage"
    />
  </div>
</template>

<script>
import Navtabs from "../components/Navtabs.vue";
import RestaurantCard from "../components/RestaurantCard.vue";
import RestaurantsNavPills from "../components/RestaurantsNavPills.vue";
import RestaurantsPagination from "../components/RestaurantsPagination.vue";

const dummyData = {
  restaurants: [
    {
      id: 1,
      name: "Kaelyn Wunsch",
      tel: "(582) 572-0301 x14208",
      address: "2436 Trisha Track",
      opening_hours: "08:00",
      description: "Qui dolore et ut asperiores expedita iure velit qu",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=63.192605923387866",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 2,
      name: "Felicia Goodwin",
      tel: "1-670-918-1224 x177",
      address: "5210 Clementine Spurs",
      opening_hours: "08:00",
      description: "At ut quia sit debitis ut repudiandae deserunt del",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=58.31352904784659",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 3,
      name: "Breanna Grant",
      tel: "1-341-276-9964",
      address: "8023 Garland Ridges",
      opening_hours: "08:00",
      description: "Ratione magni consequatur porro. Vel non placeat n",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=71.59323206010643",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 4,
      name: "Rosina Larkin",
      tel: "1-471-066-1437",
      address: "74840 Sauer Islands",
      opening_hours: "08:00",
      description: "Amet numquam sint qui non eveniet autem perferendi",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=24.80926132844907",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 5,
      name: "Ms. Talia Rowe",
      tel: "1-217-663-1951 x26192",
      address: "758 Klocko Villages",
      opening_hours: "08:00",
      description: "Sint odit dolores quia. Voluptates dolor minus dol",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=70.60134330800263",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 6,
      name: "Anika Runolfsdottir",
      tel: "878-308-4165 x247",
      address: "8429 Bogan Square",
      opening_hours: "08:00",
      description: "Dolor itaque a. Dolores quia quo ipsa et ut adipis",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=55.438464262435396",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 7,
      name: "Reva Buckridge DVM",
      tel: "(998) 695-8808",
      address: "50233 Hodkiewicz Roads",
      opening_hours: "08:00",
      description: "Labore harum omnis nostrum et eos.\nDicta rerum qua",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=37.33150842792734",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 8,
      name: "Winona Mosciski",
      tel: "439.147.9690",
      address: "7453 Leopoldo Vista",
      opening_hours: "08:00",
      description: "Tenetur expedita veritatis. Impedit et et et quisq",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=9.508990747156876",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 9,
      name: "Hollis Hoeger",
      tel: "419-197-9506 x1265",
      address: "29148 Vernie Unions",
      opening_hours: "08:00",
      description: "sit aut debitis",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=15.121348929196499",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 10,
      name: "Rory Considine",
      tel: "(848) 923-9219 x57430",
      address: "8586 Marlee Valley",
      opening_hours: "08:00",
      description: "Ea eligendi quaerat recusandae voluptatem repellat",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=89.6543126217202",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
  ],
  categories: [
    {
      id: 1,
      name: "中式料理",
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
    },
    {
      id: 2,
      name: "日本料理",
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
    },
    {
      id: 3,
      name: "義大利料理",
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
    },
    {
      id: 4,
      name: "墨西哥料理",
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
    },
    {
      id: 5,
      name: "素食料理",
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
    },
    {
      id: 6,
      name: "美式料理",
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
    },
    {
      id: 7,
      name: "複合式料理",
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
    },
  ],
  categoryId: "",
  page: 1,
  totalPage: [1, 2, 3, 4, 5],
  prev: 1,
  next: 2,
};

export default {
  name: "Restaurants",
  components: {
    Navtabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
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
    };
  },
  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants;
      this.categories = dummyData.categories;
      this.categoryId = dummyData.categoryId;
      this.currentPage = dummyData.page;
      this.totalPage = dummyData.totalPage;
      this.previousPage = dummyData.prev;
      this.nextPage = dummyData.next;
    },
  },
  created() {
    this.fetchRestaurants();
  },
};
</script>