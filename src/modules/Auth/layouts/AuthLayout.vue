<template>
  <BaseLayout>
    <div class="auth-layout app-container">
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

      <div class="auth-layout__container">
        <router-view />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "layouts/BaseLayout.vue";

const theme = "teen";
const elements = [
  { id: "1", alt: 1 },
  { id: "2", alt: 2 },
  { id: "3", alt: 3 },
];
</script>

<style lang="scss" scoped>
.auth-layout {
  width: 100vw;
  height: 100vh;

  padding: 10px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

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

      transform: translate(50px, 1%) rotate(10deg);

      top: 0;
      left: 0;
    }

    &--3 {
      width: 350px;
      height: 350px;

      transform: translate(150px, 15%) rotate(-10deg);

      top: 0;
      left: 0;
    }

    &--2 {
      width: 300px;
      height: 300px;

      transform: translate(15px, 5%) rotate(5deg);

      bottom: 0;
      right: 0;
    }

    @media (min-width: $breakpoint-mobile) {
      &--1 {
        width: 250px;
        height: 250px;

        transform: translate(50px, 1%) rotate(10deg);

        top: 0;
        left: 0;
      }

      &--3 {
        width: 400px;
        height: 400px;

        transform: translate(400px, 5%) rotate(-10deg);

        top: 0;
        left: 0;
      }

      &--2 {
        width: 500px;
        height: 500px;

        transform: translate(150px, 40%) rotate(5deg);

        bottom: 0;
        left: 0;
      }
    }

    @media (min-width: $breakpoint-laptop) {
      &--1 {
        width: 300px;
        height: 300px;

        transform: translate(450px, 1%) rotate(10deg);

        top: 0;
        left: 0;
      }

      &--3 {
        width: 600px;
        height: 600px;

        transform: translate(0, 50%) rotate(-10deg);

        top: 0;
        left: 0;
      }

      &--2 {
        width: 700px;
        height: 700px;

        transform: translate(800px, 30%) rotate(5deg);

        top: 0;
        right: 0;
      }
    }
  }

  &__container {
    max-width: 400px;
    width: 100%;
  }
}
</style>
