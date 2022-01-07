<template>
  <div class="container py-5">
    <form @submit.prevent.stop="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="user.name"
          id="name"
          type="text"
          name="name"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="user.image"
          :src="user.image"
          class="d-block img-thumbnail mb-3"
          width="200"
          height="200"
          alt=""
        />
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleImageFileChange"
        />
      </div>

      <button :disabled="isProcessing" type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "UserEdit",
  data() {
    return {
      user: {
        id: "",
        name: "",
        image: "",
        email: "",
      },
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    currentUser(newValue) {
      if (newValue.id === -1) return;
      const { userid } = this.$route.params;
      this.setUser(userid);
    },
  },
  created() {
    if (this.currentUser.id === -1) return;
    const { userid } = this.$route.params;
    this.setUser(userid);
  },
  beforeRouteUpdate(to, from, next) {
    if (this.currentUser.id === -1) return;
    const { userid } = to.params;
    this.setUser(userid);
    next();
  },
  methods: {
    setUser(userId) {
      const { id, name, image, email } = this.currentUser;
      if (id.toString() !== userId.toString()) {
        this.$route.push({ name: "Not-found" });
        return;
      }
      this.user = { ...this.user, id, name, image, email };
    },
    handleImageFileChange(e) {
      const { files } = e.target;
      if (!files.length) {
        this.user.image = "";
      } else {
        const imageUrl = window.URL.createObjectURL(files[0]);
        this.user.image = imageUrl;
      }
    },
    async handleSubmit(e) {
      try {
        if (!this.name) {
          Toast.fire({
            icon: "warning",
            title: "Please fill in your name.",
          });
        }
        this.isProcessing = true;

        const form = e.target;
        const formData = new FormData(form);
        const { data } = await usersAPI.update({ userId: this.id, formData });

        if (data.status !== "success") return new Error(data.message);

        this.$route.push({ name: "user", params: { id: this.id } });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can't update profile. Please try again later.",
        });
      }
    },
  },
};
</script>