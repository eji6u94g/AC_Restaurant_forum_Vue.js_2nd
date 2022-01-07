<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ userFollowing.length }}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <router-link
        v-for="following in userFollowing"
        :key="following.id"
        :to="{ name: 'user', params: { userid: following.id } }"
      >
        <img
          :src="following.image | emptyImage"
          width="60"
          height="60"
          class="avatar"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/emptyImageFilter";

export default {
  name: "UserFollowingCard",
  mixins: [emptyImageFilter],
  props: {
    userFollowing: {
      type: Array,
      required: true,
    },
  },
};
</script>

