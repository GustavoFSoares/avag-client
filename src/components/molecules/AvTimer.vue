<template>
  <div class="av-timer">
    <QCircularProgress
      class="av-timer__progress text-white"
      show-value
      font-size="16px"
      :value="currentPercentage"
      size="60px"
      :thickness="0.15"
      color="white"
      track-color="transparent"
    >
      <div class="av-timer__value">
        {{ currentTime > 0 ? currentTime : "Acabou!" }}
      </div>
    </QCircularProgress>
  </div>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref, toRef, watch } from "vue";

const $emit = defineEmits(["end-time", "current-time"]);
const props = defineProps({
  startTime: {
    type: Number,
    required: true,
  },
  autoStart: {
    type: Boolean,
    default: false,
  },
});

const start = () => {
  handleStart();
};

let interval = null;
const currentTime = ref(props.startTime);

const currentPercentage = computed(
  () => (currentTime.value / props.startTime) * 100
);

const handleStart = () => {
  currentTime.value = props.startTime;

  interval = setInterval(() => {
    currentTime.value -= 1;

    if (currentTime.value <= 0) {
      handleEndTimer();
    }
  }, 1000);
};

const handleEndTimer = () => {
  restartTimer();
  $emit("end-time");
};

const restartTimer = () => {
  if (interval) {
    clearInterval(interval);
  }

  interval = null;
};

watch(
  () => props.startTime,
  () => {
    restartTimer();

    if (props.autoStart) {
      handleStart();
    }
  },
  { immediate: true }
);

watch(
  () => currentTime.value,
  () => {
    $emit("current-time", currentTime.value);
  },
  { immediate: true }
);

defineExpose({
  start,
  restartTimer,
});
</script>

<style lang="scss" scoped>
.av-timer {
  background: hsla(201, 10%, 29%, 0.5);
  border-radius: 1000px;
  overflow: hidden;
  padding: 2px;

  &__progress {
  }

  &__value {
    font-size: 12px;
    font-weight: $font-weight-bold;
  }
}
</style>
