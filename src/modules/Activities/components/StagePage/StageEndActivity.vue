<template>
  <q-card class="stage-end-activity">
    <div class="stage-end-activity__header">
      <h1 class="stage-end-activity__situation">
        <span v-if="isCompleted">
          {{ $t(`${I18N_PATH}.completed`) }}
        </span>

        <span v-else-if="timedOut">
          {{ $t(`${I18N_PATH}.timedOut`) }}
        </span>

        <span v-else>
          {{ $t(`${I18N_PATH}.uncompleted`) }}
        </span>
      </h1>

      <h2 class="stage-end-activity__title">
        {{ activity.name }}
      </h2>
    </div>

    <div class="stage-end-activity__reward">
      <div v-if="activity.reward.coins" class="reward-item reward-item--coins">
        <QIcon class="reward-item__icon" name="o_paid" />

        <span :class="['reward-item__value', {'reward-item__value--timed-out': timedOut}]">
          {{ activity.reward.coins }}
        </span>

        <span class="reward-item__text">Moedas</span>
      </div>

      <div
        v-if="activity.reward.points"
        class="reward-item reward-item--points"
      >
        <QIcon class="reward-item__icon" name="o_grade" />

        <span :class="['reward-item__value', {'reward-item__value--timed-out': timedOut}]">
          {{ activity.reward.points }}
        </span>

        <span class="reward-item__text">Pontos</span>
      </div>
    </div>

    <div class="stage-end-activity__buttons">
      <QBtn
        v-if="false"
        color="primary"
        outline
        :label="$t(`${I18N_PATH}.buttons.tryAgain`)"
        class="stage-end-activity__button stage-end-activity__button--try-again"
        @click="handleRestart"
      />

      <QBtn
        v-if="isCompleted"
        class="stage-end-activity__button"
        color="primary"
        :label="$t(`${I18N_PATH}.buttons.goBackList`)"
        @click="handleFisnishActivity"
      />

      <QBtn
        v-else-if="timedOut"
        class="stage-end-activity__button"
        color="primary"
        :label="!isLast ? $t(`${I18N_PATH}.buttons.nextStep`) : $t(`${I18N_PATH}.buttons.finish`)"
        @click="handleNextStep"
      />

      <QBtn
        v-else
        class="stage-end-activity__button"
        color="primary"
        :label="$t(`${I18N_PATH}.buttons.goBackList`)"
        :to="{ name: 'activities.stage-list', params: { id: trailId } }"
      />
    </div>
  </q-card>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const I18N_PATH = "modules.courses.stagePage.endActivity";

const $router = useRouter();
const $store = useStore();

const props = defineProps({
  trailId: {
    type: [String, Number],
    required: true,
  },
  activity: {
    type: Object,
    required: true,
  },
  timedOut: {
    type: Boolean,
    required: true,
  },
  isLast: {
    type: Boolean,
    required: true,
  },
});
const $emits = defineEmits(["restart", "nextStep"]);

const isCompleted = computed(() => {
  const uncompletedActivity = props.activity.stages.find((stage) => {
    return stage.completed === false;
  });

  return !uncompletedActivity;
});

const handleRestart = () => {
  $emits("restart");
};

const handleNextStep = () => {
  if (props.isLast) {
    return handleFisnishActivity()
  }

  $emits("nextStep");
};

const handleFisnishActivity = async () => {
  // const nextStageId = await $store.dispatch("ActivitiesModule/completeStage", {
  //   trailId: props.trailId,
  //   activityId: props.activity.id,
  //   trailStudentStageId: props.activity.trailStudentStageId,
  //   completed: isCompleted.value,
  // });

  // $router.push({
  //   name: "activities.stage",
  //   params: { id: props.trailId, stageId: nextStageId },
  // });
  $router.push({
    name: "activities.stage-list",
    params: { id: props.trailId },
  });
};
</script>

<style lang="scss" scoped>
.stage-end-activity {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 25px;

  border-radius: $default-border-radius;
  padding: 20px 15px;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  &__situation {
    text-transform: uppercase;
    font-size: 24px;
    color: $text-color-2;
  }

  &__title {
    font-size: 22px;
    color: $text-color-1;
  }

  &__reward {
    display: flex;
    gap: 15px;
    width: 100%;
    flex-direction: row-reverse;
  }

  .reward-item {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    border: 2px solid $text-color-2;
    padding: 10px;
    border-radius: $default-border-radius;

    &__icon {
      padding: 10px;
      border-radius: 1000px;
      border: 2px solid $text-color-2;
      font-size: 25px;
    }

    &__value {
      font-weight: $font-weight-semibold;
      font-size: 16px;

      &--timed-out {
        text-decoration: line-through;
        font-style: italic;
      }
    }

    &__text {
      font-weight: $font-weight-semibold;
      font-size: 10px;
      color: $text-color-1;
    }

    $rewards: (
      coins: (
        color: $yellow-14,
      ),
      points: (
        color: $primary,
      ),
    );

    @each $rewardItem, $rewardColor in $rewards {
      &--#{$rewardItem} {
        .reward-item__icon {
          color: map-get($rewardColor, "color");
        }

        .reward-item__value {
          color: map-get($rewardColor, "color");
        }
      }
    }
  }

  &__buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__button {
    :deep(span) {
      text-transform: initial;
    }

    &--try-again {
      :deep() {
        &::before {
          border-width: 2px;
        }

        span {
          font-weight: $font-weight-semibold;
        }
      }
    }
  }
}
</style>
