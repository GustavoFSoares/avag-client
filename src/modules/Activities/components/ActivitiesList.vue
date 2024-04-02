<template>
  <div :class="['activities-list', { 'activities-list--is-open': isOpen }]">
    <div v-if="!hideHeader" class="activities-list__header">
      <h2 class="activities-list__title">{{ title }}</h2>

      <QBtn flat :icon="!isOpen ? 'add' : 'remove'" :label="`
          ${!isOpen ? $t(`${I18N_PATH}.seeMore`) : $t(`${I18N_PATH}.seeLess`)}
        `" color="primary" padding="xs" @click="handleToggleActivities" />
    </div>

    <transition-group class="activities-list__activities" tag="div" v-bind:css="false" v-on:enter="enter">
      <ActivityCard v-for="(activity, activityIndex) in currentActivities" :class="[
    activityIndex,
    'activities-list__item',
    { 'activities-list__item--enter': !activity.enter },
  ]" :key="`activity-${activityIndex}-open-${isOpen}`" :data-index="activityIndex" :title="activity.name"
        :cover="activity.cover" :progress="activity.progress" @startNow="handleStartActivity(activity.id)" />
    </transition-group>
  </div>

  <QDialog :model-value="!!showPresentation" persistent maximized transition-show="slide-up"
    transition-hide="slide-down">
    <ActivitiesPresentation :presentation-id="showPresentation" @ended="startActivity()" />
  </QDialog>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ActivityCard from "./ActivityCard.vue";
import ActivitiesPresentation from "../partials/ActivitiesPresentation.vue";

const I18N_PATH = "modules.activities.components.activitiesList";

const $emits = defineEmits(["start-activity"]);
const $router = useRouter();
const $store = useStore();

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  activities: {
    type: Array,
    required: true,
  },
  hideHeader: {
    type: Boolean,
  },
});

const isOpen = ref(false);
const activityId = ref();
const showPresentation = ref(false);
const currentActivities = ref([]);
const showingActivitiesList = ref([]);

const mappedActivitiesList = computed(() => {
  if (isOpen.value) {
    return currentActivities.value;
  }
  return currentActivities.value.slice(0, 3);
});

const handleStartActivity = async (currentActivityId) => {
  activityId.value = currentActivityId;

  let presentationId = await $store.dispatch("ActivitiesModule/getActivityPresentationId");

  if (!presentationId) {
    return startActivity();
  }

  startPresentation(presentationId);
};

const startPresentation = (presentationId) => {
  showPresentation.value = presentationId;
};

const startActivity = () => {
  showPresentation.value = false;

  $router.push({
    name: "activities.stage-list",
    params: { id: activityId.value },
    query: { goal: true },
  });
};

const enter = (el, done) => {
  const datasetIndex = el.dataset.index > 6 ? 7 : el.dataset.index;
  let delay = datasetIndex * 150;

  setTimeout(() => {
    currentActivities.value[el.dataset.index].enter = true;
    done();
  }, delay);
};

const handleToggleActivities = () => {
  isOpen.value = !isOpen.value;

  handleActivitiesList();
};

const handleActivitiesList = () => {
  currentActivities.value = [];

  let activities = props.activities.map((activity) => ({
    ...activity,
    enter: false,
  }));

  if (!isOpen.value) {
    activities = activities.slice(0, 3);
  }

  currentActivities.value = activities;
};

onMounted(() => {
  handleActivitiesList();
});
</script>

<style lang="scss" scoped>
.activities-list {
  display: grid;

  &--is-open & {
    &__header {
      border-radius: 8px 8px 0 0;
    }

    &__activities {
      background: $white;
      border-radius: 0 0 8px 8px;
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;

    background: $white;
    padding: 10px 16px;
    border-radius: 8px;
  }

  &__title {
    font-size: 16px;
    align-self: center;
  }

  &__activities {
    padding: 27px 0 17px;
    padding-left: 8px;

    display: grid;
    gap: 15px;

    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__item {
    transition: all 0.3s ease;

    opacity: 1;
    transform: translateY(0);

    &--enter {
      opacity: 0;
      transform: translateY(50px);
    }
  }
}
</style>
