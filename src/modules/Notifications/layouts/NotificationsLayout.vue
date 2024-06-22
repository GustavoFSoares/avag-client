<template>
  <div class="notifications-layout">
    <router-view />
  </div>
</template>

<script >

export default {
  name: "NotificationsLayout",
  components: {
  },
};
</script>

<style lang="scss" scoped>
.notifications-layout {
  height: calc(100vh - 58px);
}
</style>
