<template>
  <div class="container py-5">
    <Navtabs />
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
            <img class="card-img" :src="restaurant.image" />
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
  </div>
</template>

<script>
import Navtabs from "../components/Navtabs.vue";

const dummyData = {
  restaurants: [
    {
      id: 50,
      name: "Abdiel Lesch",
      tel: "415.470.5261 x4797",
      address: "9217 Itzel Avenue",
      opening_hours: "08:00",
      description: "Molestias est voluptatum nihil quia dolorem.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=34.37060217826933",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 49,
      name: "Mr. Jamir Huel",
      tel: "423-505-5814",
      address: "8068 Klocko Loop",
      opening_hours: "08:00",
      description: "Sequi quia voluptas et tempora.\nNulla et enim.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=16.22286749725039",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 48,
      name: "Kian Hahn",
      tel: "870.648.7494 x85702",
      address: "092 Durgan Stravenue",
      opening_hours: "08:00",
      description: "Et culpa et minima aut fugiat. Exercitationem eum ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=15.614602510303843",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 47,
      name: "Roslyn Hammes",
      tel: "150.532.7325",
      address: "144 Delia Shoals",
      opening_hours: "08:00",
      description: "Eum beatae quidem voluptates voluptatibus. Est bea",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=31.951782365833225",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 46,
      name: "Leonie Kohler",
      tel: "265-023-4491 x5165",
      address: "95309 Nayeli Corner",
      opening_hours: "08:00",
      description: "ipsa in natus",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=66.37597903074635",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 2,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 45,
      name: "Hans Metz",
      tel: "1-529-603-0857 x424",
      address: "4775 Albertha Mission",
      opening_hours: "08:00",
      description: "Est earum qui.\nQuod culpa id.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=78.74846801660328",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 5,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 44,
      name: "Gladys Bailey MD",
      tel: "1-832-096-4793 x0189",
      address: "909 Elroy Mission",
      opening_hours: "08:00",
      description: "magni",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=21.52210407845785",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 43,
      name: "Enrique Maggio",
      tel: "689-938-7211 x4791",
      address: "09906 Brendan Walk",
      opening_hours: "08:00",
      description: "Ea unde eos et provident delectus nostrum enim mag",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=75.11446440640334",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 42,
      name: "Mrs. Scarlett Gleichner",
      tel: "1-145-483-6725 x7452",
      address: "10259 Fay Summit",
      opening_hours: "08:00",
      description: "nobis",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=85.14947981944181",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 5,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 41,
      name: "Sofia Larson",
      tel: "(491) 571-0080 x5354",
      address: "6246 Torp Drive",
      opening_hours: "08:00",
      description: "Commodi eveniet laboriosam.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=47.57333572074587",
      viewCounts: 0,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
  ],
};

export default {
  name: "RestaurantsTop",
  components: {
    Navtabs,
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
    };
  },
  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants;
    },
    addFavorite(restaurantId) {
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
    },
    deleteFavorite(restaurantId) {
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
    },
  },
  created() {
    this.fetchRestaurants();
  },
};
</script>