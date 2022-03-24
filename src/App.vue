/* eslint-disable */
<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  created() {
    this.loadCart();
    const userAccessKey = localStorage.getItem("userAccessKey");
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
  },
  methods: {
    ...mapActions(["loadCart"]), //подмешаем методы
    ...mapMutations(["updateUserAccessKey"]),
  },
};
</script>
