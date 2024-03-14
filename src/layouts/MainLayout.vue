<template>
  <BaseLayout>
    <div class="app-container">
      <AppToolbar />

      <router-view />

      <QDialog
        :model-value="!!showPresentation"
        persistent
        maximized
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <ActivitiesPresentation
          :presentation-id="showPresentation"
          @ended="closePresentation"
        />
      </QDialog>
    </div>
  </BaseLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

import BaseLayout from "./BaseLayout.vue";
import AppToolbar from "partials/AppToolbar.vue";
import ActivitiesPresentation from "../modules/Activities/partials/ActivitiesPresentation.vue";

const $store = useStore();
const showPresentation = ref(false);

const handleStartActivity = async () => {
  let presentationId = await $store.dispatch("ActivitiesModule/getActivityPresentationId");

  if (!presentationId) {
    closePresentation()
  }

  startPresentation(presentationId);
};

const startPresentation = (presentationId) => {
  showPresentation.value = presentationId;
};

const closePresentation = () => {
  showPresentation.value = null;
};

onMounted(() => {
  handleStartActivity()
});
</script>

