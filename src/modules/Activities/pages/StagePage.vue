<template>
  <AvPage
    class="stage-page"
    :class="{ 'stage-page--showing-goal': showingGoal }"
    title="Estágios"
    no-header
    :go-back-route="{
      name: 'activities.stage-list',
      params: { id: trailId },
    }"
  >
    <template #default>
      <div class="stage-page__container" v-if="activityData">
        <div class="stage-page__header">
          <AvTimer
            v-if="!currentStage.isInformative"
            ref="timer"
            :auto-start="!showingGoal"
            :start-time="currentStage.time"
            @end-time="handleEndTime"
            :class="[
              'stage-page__timer',
              { 'stage-page__timer--hide': showingGoal || stageIsOpening },
            ]"
          />

          <QBtn
            round
            icon="close"
            class="stage-page__close-button"
            @click="handleClose"
          />
        </div>

        <section v-if="showingGoal" class="goals-content">
          <h1 class="goals-content__title">
            {{ $t(`${I18N_PATH}.benefits.title`) }}
          </h1>

          <p class="goals-content__description">
            {{ activityData.description }}
          </p>
        </section>

        <div
          :class="[
            'stage-page__wrapper',
            { 'stage-page__wrapper--showing-goal': showingGoal },
            { 'stage-page__wrapper--opening': stageIsOpening },
          ]"
        >
          <div class="stage-page__stage-content" v-if="!showingGoal">
            <h1 v-if="!currentStage.isInformative" class="stage-page__title">
              {{ currentStage.description }}
            </h1>

            <div v-if="hasStages && currentStage" class="stage-wrapper">
              <div class="stage-wrapper__content">
                <StageContent
                  :activity-id="activityData.id"
                  :stage-id="currentStage.id"
                  :content="currentStage.content"
                  :type="currentStage.type"
                  :is-informative="currentStage.isInformative"
                  :informative-title="currentStage.informativeText"
                  :informative-description="currentStage.description"
                  @finish="handleReleaseStage"
                />

                <QBtn
                  class="stage-wrapper__button"
                  :label="isLast ? 'Concluir' : 'Próximo'"
                  color="secondary"
                  :disable="!currentStage.canNext"
                  @click="handleNextStep(null)"
                />
              </div>

              <div class="stage-wrapper__steps-counter">
                <button
                  v-for="(
                    activityStep, activityStepIndex
                  ) of activityData.stages"
                  :key="activityStepIndex"
                  @click="handleNextStep(activityStepIndex)"
                  :class="[
                    'no-pointer-events',
                    'stage-wrapper__step-item',
                    {
                      'stage-wrapper__step-item--completed':
                        activityStep.completed,
                      'stage-wrapper__step-item--selected':
                        activityStepIndex === currentStageIndex,
                    },
                  ]"
                />
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

  <QDialog persistent :model-value="!!activityIsFinished">
    <StageEndActivity
      :trail-id="trailId"
      :activity="activityData"
      :timed-out="timedOut"
      :is-last="isLast"
      @restart="handleRestartActivity"
      @nextStep="handleNextStep"
    />
  </QDialog>
</template>

<script setup>
const I18N_PATH = "modules.courses.stagePage";
const I18N_STAGE_TYPE_PATH = "modules.activities.stageType";

import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";

import AvReward from "molecules/AvReward.vue";
import AvTimer from "molecules/AvTimer.vue";

import AvPage from "organisms/AvPage.vue";

import StageContent from "../components/StagePage/StageContent.vue";
import StageEndActivity from "../components/StagePage/StageEndActivity.vue";

const { appContext } = getCurrentInstance();
const $route = useRoute();
const $router = useRouter();
const $store = useStore();

const { id: trailId, stageId } = $route.params;

const currentStageIndex = ref(0);
const timer = ref(null);
const timedOut = ref(false);
const activityData = ref(null);
const selectedFile = ref(null);
const activityIsFinished = ref(false);
const showingGoal = ref(true);
const stageIsOpening = ref(false);

const hasStages = computed(() => activityData.value.stages?.length !== 0);
const isLast = computed(
  () => activityData.value.stages?.length === currentStageIndex.value + 1
);

const currentStage = computed(() => {
  if (!hasStages.value) {
    return null;
  }

  return activityData.value.stages[currentStageIndex.value];
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
      trailStudentStageId:
        activityData.value.stages[currentStageIndex.value].id,
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

      &__container {
        height: 100%;
        padding-bottom: initial;
      }
    }
  }

  &__container {
    max-width: 1366px;
    margin: 0 auto;
    width: 99%;
    height: 100%;
    position: relative;

    display: flex;
    flex-direction: column;
  }

  &__goals-description {
    height: 100%;
  }

  &__wrapper {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: $default-border-radius $default-border-radius 0 0;

    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 15px;
    transition: height 0.3s ease-in;

    &--opening {
      animation: bounce-in 0.3s ease-in forwards;

      @keyframes bounce-in {
        0% {
          position: absolute;
          bottom: 0;
        }

        99% {
          position: absolute;
          bottom: 0;
        }

        100% {
          position: initial;
        }
      }
    }

    &--showing-goal {
      height: 98px;
      position: absolute;
      bottom: 0;
    }
  }

  &__title {
    padding: 32px 32px 0;
    font-size: 23px;
    color: $text-color-1;
    margin-bottom: 30px;
  }

  &__header {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  &__timer {
    &--hide {
      opacity: 0;
    }
  }

  &__close-button {
    position: absolute;
    top: 0;
    right: calc(-1 * 0%);
    background: rgba(#cecece, 0.8) !important;
  }

  .goals-content {
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: rgba(69, 63, 63, 0.75);
    border-radius: 16px;
    padding: 10px;

    &__title {
      color: $white;
      font-size: 28px;
      font-weight: $font-weight-bold;
    }

    &__description {
      color: $white;
      font-size: 18px;
    }
  }

  .goal-control {
    &__button {
      padding: 20px 0 40px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .timed-out-image {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

    &__image {
      width: 250px;
      height: 250px;
    }
  }

  &__stage-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .stage-wrapper {
    height: 100%;
    margin-bottom: 35px;

    &__content {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 0 32px;
    }

    &__button {
      width: fit-content;
      align-self: flex-end;
    }

    &__steps-counter {
      width: 100%;
      position: absolute;
      bottom: 10px;

      display: flex;
      gap: 5px;
      justify-content: center;
    }

    &__step-item {
      width: 80px;
      height: 8px;
      border-radius: $default-border-radius;
      background: #e1e5e9;

      pointer-events: none;

      &--completed {
        pointer-events: initial;
        background: #84949d;
      }

      &--selected {
        background: #38d4b3;
      }
    }
  }
}
</style>
