import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";

export function useStagePage() {
  const $route = useRoute();
  const $store = useStore();

  const I18N_PATH = "modules.courses.stagePage";
  const I18N_STAGE_TYPE_PATH = "modules.activities.stageType";

  const { id: trailId, stageId } = $route.params;

  const currentStageIndex = ref(0);
  const timer = ref(null);
  const timedOut = ref(false);
  const activityData = ref(null);
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

  function handleEndTime() {
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
  }

  function handleClose() {
    activityIsFinished.value = true;
  }

  function handleNextStep(nextStep = null) {
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
      trailStudentStageId:
        activityData.value.stages[currentStageIndex.value].id,
      completed: false,
    });
  }

  function handleStartActivity() {
    stageIsOpening.value = true;
    showingGoal.value = false;

    setTimeout(() => {
      stageIsOpening.value = false;
      if (timer.value) {
        timedOut.value = false;
        timer.value.start();
      }
    }, 3 * 100);
  }

  function restartTimer() {
    if (timer.value) {
      timedOut.value = false;
      activityIsFinished.value = false;
      timer.value.restartTimer();
      timer.value.start();
    }
  }

  function handleRestartActivity() {
    activityIsFinished.value = false;

    activityData.value.stages.forEach((stage) => {
      stage.completed = false;
    });

    currentStageIndex.value = 0;
  }

  const loadStageData = async (currentStageId) => {
    activityData.value = await $store.dispatch(
      "ActivitiesModule/getStagesData",
      {
        stageId: currentStageId,
      }
    );

    $store.dispatch("ActivitiesModule/completeStage", {
      trailId,
      activityId: stageId,
      trailStudentStageId:
        activityData.value.stages[currentStageIndex.value].id,
      completed: false,
    });

    $store.dispatch("AuthModule/refreshUser");
  };

  function handleReleaseStage(gameAnswer) {
    if (gameAnswer) {
      $store.dispatch("ActivitiesModule/gameResponse", {
        trailId,
        activityId: stageId,
        stageId: currentStage.value.id,
        gameAnswer,
      });
    }

    handleNextStep();
  }

  watch(
    () => currentStageIndex.value,
    () => {
      restartTimer();
    }
  );

  onMounted(async () => {
    loadStageData(stageId);
  });

  return {
    I18N_PATH,
    I18N_STAGE_TYPE_PATH,
    params: {
      trailId,
      stageId,
    },
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
  };
}
