<template>
  <div class="app-container__wrapper">
    <div class="app-container__content">
      <section class="default-layout">
        <article
          :class="[
            'default-layout__user-navigation',
            { 'default-layout__user-navigation--active': showMenu },
          ]"
        >
          <UserCard
            @toggleMenu="handleToggleMenu"
            @navigating="handleCloseMenu"
            :show-menu="showMenu"
          />
        </article>

        <aside class="default-layout__content">
          <router-view />
        </aside>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import UserCard from "modules/Home/components/UserCard/index.vue";

const showMenu = ref(false);

const handleCloseMenu = () => {
  showMenu.value = false;
};

const handleToggleMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  gap: 32px;

  position: relative;

  &__user-navigation {
    position: relative;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    &-button {
      --button-size: 30px;

      display: none;
      width: var(--button-size);
      height: var(--button-size);

      position: absolute;
      top: 5%;
      right: calc(-1 * (0% + var(--button-size)));
    }

    @media (max-width: $breakpoint-tablet) {
      z-index: 1;
      position: fixed;
      top: 56px;
      left: 0;

      width: 100%;
      max-width: 400px;
      height: 100vh;
      contain: none;

      transition: all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
      transform: translateX(calc(-100% + 40px));

      &--active {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }

      &-container {
        width: fit-content;
        height: 100%;
      }

      &-button {
        display: initial;
      }
    }
  }

  &__content {
    flex-grow: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
