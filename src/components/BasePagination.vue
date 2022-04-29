<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === 1 }"
        aria-label="Предыдущая страница"
        @click.prevent="paginateLeft(page)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>

    <li class="pagination__item" v-for="pageNumber in totalPages" :key="pageNumber">
      <a
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === page }"
        href="#"
        @click.prevent="gotoPage(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>

    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="paginateRight(page, totalPages)"
        :class="{ 'pagination__link--disabled': page === totalPages }"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["page", "totalPages"],
  methods: {
    paginateRight(page, totalPages) {
      if (page < totalPages) {
        this.$emit("paginate", page + 1);
      }
    },
    paginateLeft(page) {
      if (page > 1) {
        this.$emit("paginate", page - 1);
      }
    },
    gotoPage(page) {
      // alert(page)
      this.$emit("paginate", page);
    },
  },
};
</script>
