<template>
  <div class="toolbar-settings">

  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const $store = useStore();
const $router = useRouter();


</script>

<style lang="scss" scoped>
.toolbar-settings {
  .setting-item {
    display: flex;
    align-items: center;
    gap: 10px;

    border-radius: $default-border-radius;

    width: 100%;
    font-size: 22px;

    color: $text-color-1;

    transition: 0.3s color ease-in;

    &:hover {
      color: $text-color-1-hover;
    }

    &__text {
      font-size: 14px;
      line-height: 18px;
    }
  }
}
</style>
