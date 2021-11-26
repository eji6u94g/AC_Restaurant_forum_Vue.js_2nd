<template>
  <div>
    <h2 class="my-4">所有評論：</h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          v-if="currentUser.isAdmin"
          type="button"
          class="btn btn-danger float-right"
          @click.stop.prevent="handleDeleteButtonClicked(comment.id)"
        >
          Delete
        </button>
        <h3>
          <router-link
            :to="{ name: 'user', params: { userid: comment.User.id } }"
          >
            {{ comment.User.name }}
          </router-link>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/fromNow";

const dummyUser = {
  currentUser: {
    id: 1,
    name: "root",
    email: "root@example.com",
    isAdmin: true,
  },
  isAuthenticated: true,
};

export default {
  name: "RestaurantComments",
  props: {
    restaurantComments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentUser: dummyUser.currentUser,
    };
  },
  mixins: [fromNowFilter],
  methods: {
    handleDeleteButtonClicked(commentId) {
      console.log("handleDeleteButtonClicked", commentId);
      this.$emit("after-delete-comment", commentId);
    },
  },
};
</script>