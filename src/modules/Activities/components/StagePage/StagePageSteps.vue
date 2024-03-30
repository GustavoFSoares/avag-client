<template>
  <div class="stage-page-steps">
    <button
      v-for="(activityStep, activityStepIndex) of stages"
      :key="activityStepIndex"
      @click="handleNextStep(activityStepIndex)"
      :class="[
        'no-pointer-events',
        'stage-page-steps__step-item',
        {
          'stage-page-steps__step-item--completed': activityStep.completed,
          'stage-page-steps__step-item--selected':
            activityStepIndex === currentStageIndex,
        },
      ]"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  currentStageIndex: {
    type: Number,
    required: true,
  },
  stages: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.stage-page-steps {
  width: 100%;
  position: absolute;
  bottom: 10px;

  display: flex;
  gap: 5px;
  justify-content: center;

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
</style>
