<template role="main">
  <div class="album py-5 bg-light">
    <div class="container">
      <UserProfileCard
        :profile="profile"
        :is-current-user="currentUser.id === profile.id"
        :initial-is-followed="isFollowed"
        @afterFollowingButtonClick="afterFollowingButtonClick"
      />

      <div class="row">
        <div class="col-md-4">
          <UserFollowingCard :user-following="profile.Followings" />
          <br />
          <UserFollowersCard :user-followers="profile.Followers" />
        </div>
        <div class="col-md-8">
          <UserCommentsCard :user-comments="profile.Comments" />
          <br />
          <UserFavoriteRestaurantsCard
            :user-favoritedrestaurants="profile.FavoritedRestaurants"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard.vue";
import UserFollowingCard from "../components/UserFollowingCard.vue";
import UserFollowersCard from "../components/UserFollowersCard.vue";
import UserCommentsCard from "../components/UserCommentsCard.vue";
import UserFavoriteRestaurantsCard from "../components/UserFavoriteRestaurantsCard.vue";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "User",
  components: {
    UserProfileCard,
    UserFollowingCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoriteRestaurantsCard,
  },
  data() {
    return {
      profile: {
        id: -1,
        name: "",
        email: "",
        isAdmin: false,
        image: "",
        Comments: [],
        FavoritedRestaurants: [],
        Followers: [],
        Followings: [],
      },
      isFollowed: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data, statusText } = await usersAPI.getUserInfo({ userId });
        if (statusText !== "OK") return new Error(statusText);

        const { profile, isFollowed } = data;
        this.profile.id = profile.id;
        this.profile.name = profile.name;
        this.profile.email = profile.email;
        this.profile.isAdmin = profile.isAdmin;
        this.profile.image = profile.image;
        this.profile.Comments = profile.Comments;
        this.profile.FavoritedRestaurants = profile.FavoritedRestaurants;
        this.profile.Followers = profile.Followers;
        this.profile.Followings = profile.Followings;
        this.isFollowed = isFollowed;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't get User information. Please try again later.",
        });
      }
    },
    afterFollowingButtonClick() {
      this.isFollowed = !this.isFollowed;
    },
  },
  created() {
    const { userid: id } = this.$route.params;
    this.fetchUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { userid: id } = to.params;
    this.fetchUser(id);
    next();
  },
};
</script>