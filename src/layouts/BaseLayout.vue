<template>
  <main class="base-layout">
    <slot />
  </main>
</template>

<script>
export default {
  name: "BaseLayout",
};
</script>

<style lang="scss" scoped>
.base-layout {
  position: relative;
  /* height: 100%; */
  /* overflow: auto; */
}
</style>
