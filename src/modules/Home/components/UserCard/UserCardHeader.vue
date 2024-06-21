<template>
  <div :class="['user-card-header', { 'user-card-header--is-close': isClose }]">
    <div class="avatar">
      <router-link :to="{ name: 'user.edit-avatar' }">
        <QAvatar color="white">
          <AvatarCreatorViewer view-mode :data="avatarData" />
        </QAvatar>
      </router-link>
    </div>

    <div class="user-card-header__container">
      <div :class="['user', { 'user--is-close': isClose }]">
        <div class="user-info">
          <h5 class="user-info__name">{{ userData?.name }}</h5>
          <h6 class="user-info__level">{{ userData?.levelName }}</h6>
        </div>

        <div class="user-edit">
          <QBtn flat round icon="edit" color="primary" :to="{ name: 'user.edit' }"
            :title="$t(`${I18N_PATH}.editUser`)" />
        </div>
      </div>

      <div :class="['level-bar', { 'level-bar--is-close': isClose }]" :style="{ '--bar-progress': `${barProgress}%` }">
        <div class="level-bar-progress" />

        <div class="level-bar-index">
          <div class="level-bar-index__start">
            {{ levelFormatter(indexes.start) }}
          </div>

          <div class="level-bar-index__end">
            {{ levelFormatter(indexes.end) }}
          </div>
        </div>
      </div>

      <AvReward :points="rewardsData.points" :coins="rewardsData.coins" />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted, ref, defineProps } from "vue";
import { AvatarCreatorViewer } from "avag-avatar-creator";

import AvReward from "molecules/AvReward.vue";

const I18N_PATH = "modules.home.userCard";

const props = defineProps({
  isClose: {
    type: Boolean,
    required: true,
  },
});

const $store = useStore();
const $router = useRouter();

const userData = computed(() => $store.getters["AuthModule/userData"]);
const avatarData = computed(() => $store.getters["AuthModule/avatar/avatarOptions"]);

const rewardsData = computed(() => $store.getters["AuthModule/rewardsData"]);

const indexes = computed(() => ({
  start: userData.value?.range.start,
  end: userData.value?.range.end,
}));

const barProgress = computed(() => (rewardsData.value.points / indexes.value.end) * 100);

const levelFormatter = (val) => {
  return val?.toLocaleString("pt-BR");
};

const getRewardIcon = (rewardName) => {
  const rewards = {
    coins: "o_paid",
    points: "o_grade",
  };

  return rewards[rewardName] || null;
};
</script>

<style lang="scss" scoped>
@keyframes closeAnimation {
  from {
    width: 100%;
    opacity: 1;
  }

  to {
    width: 0;
    opacity: 0;
  }
}

@keyframes openAnimation {
  from {
    width: 0;
    opacity: 0;
  }

  to {
    width: 100%;
    opacity: 1;
  }
}

@keyframes rewardCloseAnimation {
  0% {
    display: flex;
    flex-direction: row;
  }

  50%,
  100% {
    display: flex;
    flex-direction: column;
  }
}

$transitionDuration: 0.3s;

.user-card-header {
  padding: 16px 0;

  &--is-close {
    .avatar {
      .q-avatar {
        font-size: 48px !important;
      }
    }

    .user,
    .level-bar {
      display: none !important;
    }

    .user-card-header__container {
      padding: 0 4px;
    }

    :deep {
      .av-reward {
        animation: rewardCloseAnimation 0.5s ease-in-out forwards;

        &-item {
          display: flex;
          justify-content: center;

          &__label {
            display: none;
          }
        }
      }
    }
  }

  &__container {
    padding: 0 16px;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }

  .avatar {
    z-index: 0;
    position: relative;

    width: 100%;
    height: 90px;

    display: flex;
    align-items: center;
    justify-content: center;

    :deep(.avatar-preview) {
      display: flex;
      justify-content: center;
      pointer-events: none;
    }

    :deep(svg) {
      width: 315px;
      height: 350px;
      transform: translate(-10px, -25px);
    }

    .q-avatar {
      font-size: 90px;

      transition: ease-in font-size 0.3s;
    }

    &:before {
      content: "";
      background: $primary;

      position: absolute;
      z-index: -1;
      top: -50%;

      width: 100%;
      height: 100%;
    }
  }

  .user {
    width: 100%;

    display: flex;
    align-items: center;

    &-info {
      flex-grow: 1;
      display: grid;
      gap: 5px;

      &__name {
        font-size: 18px;
        color: $primary;
      }

      &__level {
        font-size: 12px;
        color: $text-color-1;
        font-weight: $font-weight-bold;

        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
  }

  .level-bar {
    width: 100%;

    &-progress {
      content: "";
      width: 100%;
      height: 5px;

      border-radius: 4px;
      overflow: hidden;

      background-color: $grey-transparent;

      position: relative;

      &:before {
        content: "";
        position: absolute;

        background: $primary;
        width: var(--bar-progress);
        height: 100%;
      }
    }

    &-index {
      display: flex;
      justify-content: space-between;
      color: $secondary;
      font-weight: $font-weight-bold;
    }
  }

  .user,
  .level-bar {
    animation: openAnimation $transitionDuration ease-in-out forwards;

    &--is-closed {
      background: red;
      animation: closeAnimation $transitionDuration ease-in-out forwards;
    }
  }
}
</style>
