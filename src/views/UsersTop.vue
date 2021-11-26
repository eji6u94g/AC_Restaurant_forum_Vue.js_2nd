<template>
  <div class="container py-5">
    <Navtabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <div v-for="user in users" :key="user.id" class="col-3">
        <a href="#">
          <img
            :src="
              user.image
                ? user.image
                : 'http://via.placeholder.com/300x300?text=No+Image'
            "
            width="140px"
            height="140px"
          />
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

const dummyData = {
  users: [
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$vr7Byde8WjcCaI0VlTNjCuLCerpE8wiGo8ri2.ZSfAFrDg8k4wLbO",
      isAdmin: true,
      image: null,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false,
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$aKzWxsKppDwcpOuFgLwJquMpx62ju.jo3hQguSRdTx/0dYD9nH0iW",
      isAdmin: false,
      image: null,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false,
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$T6xw1J4f5CSva9DVTszSb.0kWEP7XSzVj.Xhp1xpQ7SmDiDPOtx3i",
      isAdmin: false,
      image: null,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false,
    },
  ],
};

export default {
  name: "UsersTop",
  components: {
    Navtabs,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users;
    },
    followUser(userId) {
      this.users = this.users.map((_user) => {
        if (_user.id === userId) {
          return { ..._user, isFollowed: true };
        } else {
          return { ..._user };
        }
      });
    },
    unFollowUser(userId) {
      this.users = this.users.map((_user) => {
        if (_user.id === userId) {
          return { ..._user, isFollowed: false };
        } else {
          return { ..._user };
        }
      });
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>