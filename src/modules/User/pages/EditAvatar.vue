<template>
  <AvPage class="edit-avatar" no-header>
    <template #default>
      <div class="edit-avatar__wrapper">
        <div class="edit-avatar__avatar-preview">
          <AvatarCreatorViewer :height="480" />

          <QBtn
            class="edit-avatar__save-avatar-button"
            color="primary"
            :label="$t(`${I18N_PATH}.submit`)"
            @click="handleSubmit"
          />

          <QBtn
            class="edit-avatar__back-button"
            color="primary"
            icon="arrow_back"
            :to="{ name: 'home' }"
            flat
            rounded
            padding="5px"
          />
        </div>

        <div class="edit-avatar__avatar-options">
          <AvatarCreatorOptions />
        </div>
      </div>
    </template>
  </AvPage>
</template>

<script setup>
const I18N_PATH = "modules.user.pages.edit";

import "vue-avatar-creator/dist/style.css";
import {
  AvatarCreatorOptions,
  AvatarCreatorViewer,
  useAvatarCreatorStore,
} from "vue-avatar-creator";

import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AvReward from "molecules/AvReward.vue";

import AvPage from "organisms/AvPage.vue";

const $store = useStore();
const $router = useRouter();
const avatarStore = useAvatarCreatorStore();

const rewards = computed(() => $store.getters["AuthModule/rewardsData"]);
const userData = computed(() => $store.getters["AuthModule/userData"]);

const avatarIsLoading = computed(() => $store.state.AuthModule.avatar.loading);

const handleSubmit = async () => {
  const toSubmitAvatarData = avatarStore.items;

  await $store.dispatch("AuthModule/avatar/sendAvatar", toSubmitAvatarData);

  await $store.dispatch("AuthModule/refreshUser");

  $router.push({ name: "home" });
};

onMounted(() => {
  const data = $store.state.AuthModule.avatar.avatarOptions;

  const avatarData = Object.keys(data).reduce((amount, itemKey) => {
    if (Array.isArray(data[itemKey])) {
      amount[itemKey] = [...data[itemKey]];
    } else {
      amount[itemKey] = data[itemKey];
    }

    return amount;
  }, {});

  avatarStore.setAvatar(avatarData);
});
</script>

<style lang="scss" scoped>
.edit-avatar {
  :deep(.av-page-content__container) {
    height: 100%;

    @media (max-width: $breakpoint-mobile) {
      padding: 20px 10px;
      display: flex;
      justify-content: center;
    }
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    gap: 50px;

    @media (max-width: $breakpoint-mobile) {
      flex-direction: column;
      width: 100%;
    }
  }

  &__avatar-preview {
    position: relative;
    background: $white;
    border-radius: $default-border-radius;
  }

  &__avatar-options {
    width: 100%;

    :deep(.widget-option-list-item__debug) {
      display: none;
    }

    @media (max-width: $breakpoint-mobile) {
      margin-top: 10px;

      :deep(.widget-option-list__options) {
        justify-content: center;
      }
    }
  }

  &__save-avatar-button {
    width: 100%;
    position: absolute;
    margin-top: 10px;
    text-transform: initial;

    :deep(span) {
      font-weight: $font-weight-bold;
    }
  }

  &__back-button {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .user-content {
    width: 25%;

    display: flex;
    flex-direction: column;
    gap: 30px;

    &__name {
      legend {
        color: $text-color-2;
      }

      font-size: 25px;
      color: $text-color-3;
    }

    &__level {
      legend {
        color: $text-color-2;
      }

      font-size: 20px;
      color: $text-color-3;
      font-variant-caps: all-small-caps;
    }

    &__reward {
      max-width: 200px;
    }
  }

  .avatar {
    display: flex;
    gap: 20px;

    &-controller {
      margin-top: 40px;

      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &-configurator {
      overflow-x: auto;

      &::-webkit-scrollbar {
        width: 8px;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(#010203, 60%);
        border-radius: 10px;
      }
    }
  }
}
</style>
