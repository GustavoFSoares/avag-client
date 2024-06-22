<template>
  <AvPage class="activity-page" no-content-padding>
    <template #header>
      <SearchBar v-model="searchInput" />
    </template>

    <template #default>
      <div class="activity-list__wrapper">
        <ActivitiesList
          v-if="activiesGroups?.inProgress && activiesGroups.inProgress.length"
          :title="$t(`${I18N_PATH}.activitiesSteps.inProgress`)"
          :activities="activiesGroups.inProgress"
        />

        <ActivitiesList
          v-if="activiesGroups?.available && activiesGroups.available.length"
          :title="$t(`${I18N_PATH}.activitiesSteps.available`)"
          :activities="activiesGroups.available"
        />

        <ActivitiesList
          v-if="activiesGroups?.completed && activiesGroups.completed.length"
          :title="$t(`${I18N_PATH}.activitiesSteps.completed`)"
          :activities="activiesGroups.completed"
        />
      </div>
    </template>
  </AvPage>
</template>

<script setup>
const I18N_PATH = "modules.activities";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";

import AvPage from "organisms/AvPage.vue";

import SearchBar from "../components/SearchBar.vue";
import ActivitiesList from "../components/ActivitiesList.vue";

const $store = useStore();
const $router = useRouter();

const searchInput = ref();
const currentState = ref();
const activiesGroups = ref({
  available: [],
  inProgress: [],
  completed: [],
});

const currentActivies = computed(() => {
  if (!currentState.value) {
    return [];
  }

  return activiesGroups.value[currentState.value] || [];
});

const handleFilter = (state) => {
  currentState.value = state;
};

const handleStartActivity = (activityId) => {
  $router.push({
    name: "activities.stage-list",
    params: {
      id: activityId,
    },
  });
};

onMounted(async () => {
  const activiesData = await $store.dispatch("ActivitiesModule/getActivities");

  activiesGroups.value = activiesData;

  $store.dispatch("AuthModule/refreshUser");
  $store.dispatch("NotificationsModule/loadNotifications");
});
</script>

<style lang="scss" scoped>
.activity-page {
  .activity-list {
    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    display: grid;
    gap: 15px;

    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
