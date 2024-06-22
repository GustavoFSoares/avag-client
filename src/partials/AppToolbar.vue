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

    <div class="controls">
      <q-btn flat round class="notification" @click="handleClickNotification">
        <QIcon class="controls__icon" name="fa-solid fa-bell" />
        <q-badge v-if="notificationsCount > 0" color="dark-blue" floating>
          <q-circular-progress
            v-if="notificationsLoading"
            indeterminate
            rounded
            color="white"
            size="10px"
          />
          <template v-else>
            {{ notificationsCount }}
          </template>
        </q-badge>
        <q-tooltip>
          Visualizar notificações
        </q-tooltip>
      </q-btn>

      <q-btn round flat @click="handleLogoutUser" title="logout">
        <QIcon class="controls__icon" name="fa-solid fa-power-off" />
        <q-tooltip>
          Sair
        </q-tooltip>
      </q-btn>
    </div>
  </QToolbar>
</template>

<script setup>

import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const $store = useStore();
const $router = useRouter();

const $emit = defineEmits(["navigating"]);

const handleClickNavigationItem = () => {
  $emit("navigating");
};

const notificationsCount = computed(() => $store.getters["NotificationsModule/count"]);
const notificationsLoading = computed(() => $store.state.NotificationsModule.loading);

const handleClickNotification = () => {
  handleClickNavigationItem();
  $router.push({ name: "notifications" });
}

const handleLogoutUser = async () => {
  $store.dispatch("AuthModule/invalidateUser");
  $router.push({ name: "auth.login" });
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
