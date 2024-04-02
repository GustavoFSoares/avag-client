<template>
  <AvPage class="stage-page" title="Estágios" no-header :go-back-route="{
    name: 'activities.stage-list',
    params: { id: trailId },
  }">
    <template #default>
      <component :is="isMobile ? StagePageMobile : StagePageWeb" />
    </template>
  </AvPage>
</template>

<script setup>
import { computed } from "vue";
import { useQuasar } from "quasar";

import AvPage from "organisms/AvPage.vue";
import StagePageWeb from "./StagePageWeb.vue";
import StagePageMobile from "./StagePageMobile.vue";

import { useStagePage } from "../hooks/useStagePage";

const {
  params: { trailId },
} = useStagePage();

const $q = useQuasar();

const isMobile = computed(() => {
  return $q.screen.xs || $q.screen.sm;
});

</script>

<style lang="scss">
.app-container:has(.stage-page) {
  height: 100vh;
}
</style>

<style lang="scss" scoped>
.stage-page {
  :deep {
    .av-page-content {
      display: initial;
      padding: 0;

      @media (max-width: $breakpoint-tablet) {
        overflow-x: hidden;
      }

      &__container {
        height: 100%;
        padding-bottom: initial;

        @media (max-width: $breakpoint-tablet) {
          padding: 5px 5px 0;
        }
      }
    }
  }
}
</style>