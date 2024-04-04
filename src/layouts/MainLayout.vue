<template>
  <BaseLayout class="main-layout">
    <div
      :class="`decoration-item decoration-item--${element.id}`"
      v-for="(element, elementIndex) in elements"
      :key="elementIndex"
    >
      <img
        class="decoration-item__wrapper"
        :src="`public/background/${theme}/decorations/${element.id}.png`"
        :alt="element.alt"
      />
    </div>

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

const theme = "teen";
const elements = [{ id: "1", alt: 1 }];

const handleStartActivity = async () => {
  let presentationId = await $store.dispatch(
    "ActivitiesModule/getActivityPresentationId"
  );

  if (!presentationId) {
    closePresentation();
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
  handleStartActivity();
});
</script>

<style lang="scss" scoped>
.main-layout {
  overflow: hidden;
  min-height: 100vh;

  .decoration-item {
    width: 250px;
    height: 250px;

    display: flex;
    justify-content: center;
    align-items: center;

    &__wrapper {
      height: 100%;
    }

    position: absolute;

    &--1 {
      width: 150px;
      height: 150px;

      transform: translate(65vw, 65vh) rotate(10deg);

      top: 0;
      left: 0;
    }

    @media (min-width: $breakpoint-mobile) {
      &--1 {
        width: 250px;
        height: 250px;

        transform: translate(65vw, 65vh) rotate(10deg);

        top: 0;
        left: 0;
      }
    }

    @media (min-width: $breakpoint-laptop) {
      &--1 {
        width: 300px;
        height: 300px;

        transform: translate(75vw, 65vh) rotate(10deg);

        top: 0;
        left: 0;
      }
    }
  }
}
</style>
