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

    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a class="pagination__link pagination__link--current"> 1 </a>
    </li>

    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>
<script>
export default {};
// <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
//   <a
//     class="pagination__link pagination__link--arrow pagination__link--disabled"
//     aria-label="Предыдущая страница"
//   >
//     <svg width="8" height="14" fill="currentColor">
//       <use xlink:href="#icon-arrow-left"></use>
//     </svg>
//   </a>
// </li>
</script>
