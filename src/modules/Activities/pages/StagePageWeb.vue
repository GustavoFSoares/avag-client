<template>
  <section class="stage-page-web">
    <div class="stage-page-web__container" v-if="activityData">
      <div class="stage-page-web__header">
        <AvTimer
          v-if="false && !currentStage.isInformative"
          ref="timer"
          :auto-start="!showingGoal"
          :start-time="currentStage.time"
          @end-time="handleEndTime"
          :class="[
            'stage-page-web__timer',
            { 'stage-page-web__timer--hide': showingGoal || stageIsOpening },
          ]"
        />

        <QBtn
          round
          icon="close"
          class="stage-page-web__close-button"
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
          'stage-page-web__wrapper',
          { 'stage-page-web__wrapper--showing-goal': showingGoal },
          { 'stage-page-web__wrapper--opening': stageIsOpening },
        ]"
      >
        <div class="stage-page-web__stage-content" v-if="!showingGoal">
          <h1 v-if="!currentStage.isInformative" class="stage-page-web__title">
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

            <StagePageSteps
              :current-stage-index="currentStageIndex"
              :stages="activityData.stages"
            />
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
  </section>

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
import AvReward from "molecules/AvReward.vue";
import AvTimer from "molecules/AvTimer.vue";

import AvPage from "organisms/AvPage.vue";

import StageContent from "../components/StagePage/StageContent.vue";
import StageEndActivity from "../components/StagePage/StageEndActivity.vue";
import StagePageSteps from "../components/StagePage/StagePageSteps.vue";

import { useStagePage } from "../hooks/useStagePage";

const {
  I18N_PATH,
  I18N_STAGE_TYPE_PATH,
  params: { trailId },
  currentStageIndex,
  timer,
  timedOut,
  activityData,
  activityIsFinished,
  showingGoal,
  stageIsOpening,
  hasStages,
  isLast,
  currentStage,
  handleEndTime,
  handleClose,
  handleNextStep,
  handleStartActivity,
  restartTimer,
  handleRestartActivity,
  handleReleaseStage,
} = useStagePage();

console.log(currentStageIndex, currentStage);
</script>

<style lang="scss">
.app-container:has(.stage-page-web) {
  height: 100vh;
}
</style>

<style lang="scss" scoped>
.stage-page-web {
  height: 100%;

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
    height: 64px;
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
  }
}
</style>
