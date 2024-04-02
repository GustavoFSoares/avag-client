<template>
  <AvPage class="stage-page" title="Estágios" no-header :go-back-route="{
    name: 'activities.stage-list',
    params: { id: trailId },
  }">
    <template #default>

      <div class="stage-page__container" v-if="activityData">
        <div class="stage-page__header">
          <AvTimer v-if="!currentStag?.isInformative" ref="timer" :auto-start="!showingGoal"
            :start-time="currentStage.time" @end-time="handleEndTime" :class="[
    'stage-page__timer',
    { 'stage-page__timer--hide': showingGoal || stageIsOpening },
  ]" />

          <QBtn round icon="close" class="stage-page__close-button" @click="handleClose" />
        </div>

        <section v-if="showingGoal" class="goals-content">
          <h1 class="goals-content__title">
            {{ $t(`${I18N_PATH}.benefits.title`) }}
          </h1>

          <p class="goals-content__description">
            {{ activityData.description }}
          </p>
        </section>

        <div :class="[
    'stage-page__wrapper',
    { 'stage-page__wrapper--showing-goal': showingGoal },
    { 'stage-page__wrapper--opening': stageIsOpening },
  ]">
          <div class="stage-page__stage-content" v-if="!showingGoal">
            <h1 v-if="!currentStage?.isInformative" class="stage-page__title">
              {{ currentStage.description }}
            </h1>

            <div v-if="hasStages && currentStage" class="stage-wrapper">
              <div class="stage-wrapper__content">
                <StageContent :activity-id="activityData.id" :stage-id="currentStage.id" :content="currentStage.content"
                  :type="currentStage.type" :is-informative="currentStage?.isInformative"
                  :informative-title="currentStage.informativeText" :informative-description="currentStage.description"
                  @finish="handleReleaseStage" />

                <QBtn class="stage-wrapper__button" :label="isLast ? 'Concluir' : 'Próximo'" color="secondary"
                  :disable="!currentStage.canNext" @click="handleNextStep(null)" />
              </div>

              <div class="stage-wrapper__steps-counter">
                <button v-for="(activityStep, activityStepIndex) of activityData.stages" :key="activityStepIndex"
                  @click="handleNextStep(activityStepIndex)" :class="[
    'no-pointer-events',
    'stage-wrapper__step-item',
    {
      'stage-wrapper__step-item--completed': activityStep.completed,
      'stage-wrapper__step-item--selected':
        activityStepIndex === currentStageIndex,
    },
  ]" />
              </div>
            </div>

            <p v-else>Sem atividades</p>
          </div>

          <div class="goal-control" v-else>
            <button class="goal-control__button" @click="handleStartActivity">
              <QIcon class="goal-control__button-icon" name="expand_less" />

              <span class="goal-control__button-text">Continuar</span>
            </button>
          </div>
        </div>
      </div>

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


const handleEndTime = () => {
  timedOut.value = true;
  activityIsFinished.value = true;
  currentStage.value.canNext = true;

  if (stageId && trailId) {
    $store.dispatch("ActivitiesModule/timeOut", {
      trailId,
      activityId: stageId,
      stageId: currentStage.value.id,
      trailStudentStageId: activityData.value.stages[currentStageIndex.value].id,
    });
  }
};

const handleClose = () => {
  activityIsFinished.value = true;
};

const handleNextStep = (nextStep = null) => {
  const currentStage = activityData.value.stages[currentStageIndex.value];

  if (nextStep !== null) {
    if (currentStage) {
      currentStageIndex.value = nextStep;
    }

    return;
  }

  currentStage.completed = true;

  $store.dispatch("ActivitiesModule/completeStage", {
    trailId,
    activityId: stageId,
    trailStudentStageId: currentStage.id,
    completed: true,
  });

  if (isLast.value) {
    handleClose();
    return;
  }

  currentStageIndex.value += 1;

  $store.dispatch("ActivitiesModule/completeStage", {
    trailId,
    activityId: stageId,
    trailStudentStageId: activityData.value.stages[currentStageIndex.value].id,
    completed: false,
  });
};

const handleStartActivity = () => {
  stageIsOpening.value = true;
  showingGoal.value = false;

  setTimeout(() => {
    stageIsOpening.value = false;
    if (timer.value) {
      timedOut.value = false;
      timer.value.start();
    }
  }, 3 * 100);
};

const restartTimer = () => {
  if (timer.value) {
    timedOut.value = false;
    activityIsFinished.value = false;
    timer.value.restartTimer();
    timer.value.start();
  }
};

const handleRestartActivity = () => {
  activityIsFinished.value = false;

  activityData.value.stages.forEach((stage) => {
    stage.completed = false;
  });

  currentStageIndex.value = 0;
};

const loadStageData = async (currentStageId) => {
  activityData.value = await $store.dispatch("ActivitiesModule/getStagesData", {
    stageId: currentStageId,
  });

  $store.dispatch("ActivitiesModule/completeStage", {
    trailId,
    activityId: stageId,
    trailStudentStageId: activityData.value.stages[currentStageIndex.value].id,
    completed: false,
  });

  $store.dispatch("AuthModule/refreshUser");
};

const handleReleaseStage = (gameAnswer) => {
  if (gameAnswer) {
    $store.dispatch("ActivitiesModule/gameResponse", {
      trailId,
      activityId: stageId,
      stageId: currentStage.value.id,
      gameAnswer,
    });
  }

  handleNextStep();
};

watch(
  () => currentStageIndex.value,
  () => {
    restartTimer();
  }
);

onMounted(async () => {
  loadStageData(stageId);
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