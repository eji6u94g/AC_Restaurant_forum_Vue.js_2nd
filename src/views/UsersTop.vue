<template>
  <div class="container py-5">
    <Navtabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <div v-for="user in users" :key="user.id" class="col-3">
        <a href="#">
          <img :src="user.image | emptyImage" width="140px" height="140px" />
        </a>
        <h2>{{ user.name }}</h2>
        <span class="badge badge-secondary"
          >追蹤人數：{{ user.FollowerCount }}</span
        >
        <p class="mt-3">
          <button
            @click.prevent.stop="unFollowUser(user.id)"
            v-if="user.isFollowed"
            type="button"
            class="btn btn-danger"
          >
            取消追蹤
          </button>
          <button
            @click.prevent.stop="followUser(user.id)"
            v-else
            type="button"
            class="btn btn-primary"
          >
            追蹤
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Navtabs from "../components/Navtabs.vue";
import { emptyImageFilter } from "./../utils/emptyImageFilter";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "UsersTop",
  mixins: [emptyImageFilter],
  components: {
    Navtabs,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await usersAPI.getUsersTop();
        if (res.statusText !== "OK") {
          throw new Error(res.statusText);
        }
        this.users = res.data.users.map((user) => ({
          id: user.id,
          image: user.image,
          name: user.name,
          FollowerCount: user.FollowerCount,
          isFollowed: user.isFollowed,
        }));
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't get Users information. Please try again latter.",
        });
      }
    },
    async followUser(userId) {
      try {
        const { data } = await usersAPI.followUser({ userId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.users = this.users.map((_user) => {
          if (_user.id === userId) {
            return {
              ..._user,
              FollowerCount: _user.FollowerCount + 1,
              isFollowed: true,
            };
          } else {
            return _user;
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't follow users. Please try again latter.",
        });
      }
    },
    async unFollowUser(userId) {
      try {
        const { data } = await usersAPI.unfollowUser({ userId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.users = this.users.map((_user) => {
          if (_user.id === userId) {
            return {
              ..._user,
              FollowerCount: _user.FollowerCount - 1,
              isFollowed: false,
            };
          } else {
            return _user;
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't unfollow users. Please try again latter.",
        });
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>