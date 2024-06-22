<template>
  <div class="notifications">

    <h4 class="text-white">Chat</h4>

    <div v-if="loading" class="circular-progress">
      <q-spinner
        color="primary"
        size="3em"
      />
    </div>

  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onBeforeMount } from "vue";

const $router = useRouter();
const $store = useStore();

const loading = computed(() => $store.state.NotificationsModule.loading);
const notifications = computed(() => $store.state.NotificationsModule.notifications);


</script>

<style lang="scss" scoped>
.circular-progress {
  margin-top: 20px;
}

.notifications {
  padding: 24px;
}

</style>
