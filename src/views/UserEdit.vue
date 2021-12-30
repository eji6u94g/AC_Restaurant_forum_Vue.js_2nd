<template>
  <div class="container py-5">
    <form @submit.prevent.stop="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="currentUser.name"
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
          v-if="currentUser.image"
          :src="currentUser.image"
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

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
const dummyData = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};

export default {
  name: "UserEdit",
  data() {
    return {
      currentUser: {
        id: -1,
        name: "",
        email: "",
        image: "",
        isAdmin: false,
      },
      isAuthenticated: false,
    };
  },
  methods: {
    fetchCurrentUser(userid) {
      console.log(userid);
      this.currentUser = {
        ...this.currentUser,
        ...dummyData.currentUser,
      };
      this.isAuthenticated = dummyData.isAuthenticated;
    },
    handleImageFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.currentUser.image = "";
      } else {
        const imageUrl = window.URL.createObjectURL(files[0]);
        this.currentUser.image = imageUrl;
      }
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      for (let [key, value] of formData) {
        console.log(key, ":", value);
      }
    },
  },
  created() {
    const { userid } = this.$route.params;
    this.fetchCurrentUser(userid);
  },
};
</script>