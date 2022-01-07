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
import commentsAPI from "../apis/comments";
import { Toast } from "../utils/helpers";

export default {
  name: "RestaurantComments",
  props: {
    restaurantComments: {
      type: Array,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  mixins: [fromNowFilter],
  methods: {
    async handleDeleteButtonClicked(commentId) {
      try {
        const { data } = await commentsAPI.delete({ commentId });
        console.log(data);
        if (data.status !== "success") return new Error(data.message);
        this.$emit("after-delete-comment", commentId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't delete this comment. Please try again later.",
        });
      }
    },
  },
};
</script>