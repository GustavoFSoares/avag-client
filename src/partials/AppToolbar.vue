<template>
  <QToolbar class="app-toolbar">
    <QBtn
      class="app-toolbar__logo"
      :to="{ name: 'home' }"
      flat
      texted
      padding="0"
    >
      <div class="app-toolbar__logo-content" />
    </QBtn>
    <!-- <div class="navigation">
      <router-link
        :class="[
          'navigation-item',
          { 'router-link-active': $route.name.includes(routeItem.route) },
        ]"
        v-for="(routeItem, routeKey) in routes"
        :key="routeKey"
        :to="{ name: `home.${routeItem.route}` }"
        @click="handleClickNavigationItem"
      >
        <h4 class="navigation-item__text">
          {{ $t(`modules.${routeKey}.seo.title`) }}
        </h4>
      </router-link>
    </div> -->

    <div class="controls">
      <div class="notification">
        <QIcon class="controls__icon" name="fa-solid fa-bell" />
      </div>

      <AppToolbarSettings />
    </div>
  </QToolbar>
</template>

<script setup>
import AppToolbarSettings from "./AppToolbar/ToolbarSettings.vue";

const $emit = defineEmits(["navigating"]);

const routes = {
  activities: { route: "activities" },
  ranking: { route: "rankings" },
  achievements: { route: "achievements" },
  certificates: { route: "certificates" },
};

const handleClickNavigationItem = () => {
  $emit("navigating");
};
</script>

<style lang="scss" scoped>
.app-toolbar {
  min-height: 56px;
  background: $white;

  padding: 8px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .notification {
    cursor: pointer;
  }

  &__logo {
    width: fit-content;
    height: fit-content;

    &-content {
      width: 80px;
      height: 40px;
      background-image: url('/brand.svg');
      background-repeat: no-repeat;
      background-size: 90px;
      background-position: center;
    }
  }

  .controls {
    height: 100%;

    display: flex;
    gap: 20px;
    align-items: center;

    &__icon {
      color: $text-color-1;
      font-size: 22px;
    }
  }

  // .navigation {
  //   display: flex;
  //   flex-direction: column;

  //   @media (min-width: $breakpoint-tablet) {
  //     flex-direction: row;
  //   }
  // }

  // .navigation-item {
  //   padding: 20px 30px;
  //   text-decoration: none;

  //   color: $text-color;
  //   border-bottom: 2px solid transparent;

  //   transition: 0.3s color, border-bottom ease-in;

  //   &__text {
  //     font-size: 15px;
  //     font-weight: $font-weight-normal;
  //   }

  //   &.router-link-active {
  //     color: $text-color-3;
  //     border-bottom: 2px solid $text-color-3;
  //   }

  //   &:hover {
  //     color: $text-color-2;
  //     border-bottom: 2px solid $text-color-2;
  //   }
  // }

  .avatar {
    width: 32px;
    height: 32px;

    border: 2px solid $text-color-3;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
}
</style>
