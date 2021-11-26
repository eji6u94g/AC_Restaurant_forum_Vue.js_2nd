<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 前一頁 previousPage -->
      <li :class="['page-item', { disabled: currentPage === 1 }]">
        <router-link
          :to="{ name: 'restaurants', query: { categoryId, previousPage } }"
          class="page-link"
          aria-label="Previous"
          href="#"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>

      <li
        v-for="page in totalPage"
        :key="page"
        :class="['page-item', { active: currentPage === page }]"
      >
        <router-link
          :to="{ name: 'restaurants', query: { categoryId, page } }"
          class="page-link"
          href="#"
        >
          {{ page }}
        </router-link>
      </li>

      <!-- 後一頁 nextPage -->
      <li
        :class="['page-item', { disabled: currentPage === totalPage.length }]"
      >
        <router-link
          :to="{ name: 'restaurants', query: { categoryId, nextPage } }"
          class="page-link"
          aria-label="Next"
          href="#"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "RestaurantsPagination",
  props: {
    categoryId: {
      type: [Number, String],
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Array,
      required: true,
    },
    previousPage: {
      type: Number,
      required: true,
    },
    nextPage: {
      type: Number,
      required: true,
    },
  },
};
</script>