<template>
  <div
    :class="[
      'side-menu-options',
      {
        'side-menu-options--showing': isShowing,
        'side-menu-options--hide-transition': hideTransation,
      },
    ]"
    @mouseleave="handleCloseMenuMenu"
  >
    <div class="side-menu-options__container" v-if="currentStage">
      <button class="side-menu-options__button" @click="handleToggleOptions">
        {{ remainingTimeText }}
      </button>

      <div class="side-menu-options__content">
        <div class="side-menu-options__timer-wrapper">
          <AvTimer
            v-if="!currentStage.isInformative"
            ref="timer"
            :start-time="currentStage.time"
            @end-time="handleEndTime"
            @currentTime="handleSetRemainingTime"
          />
        </div>

        <div class="side-menu-options__button-container">
          <QBtn
            class="stage-wrapper__button"
            :label="isLast ? 'Concluir' : 'Próximo'"
            color="secondary"
            @click="handleNextStep"
            :disable="!currentStage.canNext"
          />

          <QBtn
            icon="close"
            class="stage-page-mobile__close-button"
            label="Sair"
            @click="handleClose"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, computed } from "vue";

import AvTimer from "molecules/AvTimer.vue";

import { useTimer } from "../../hooks/useStagePage";

const isShowing = ref(false);
const hideTransation = ref(false);
const remainingTime = ref(0);

const $emit = defineEmits(["next-step", "close", "end-time"]);
const props = defineProps({
  isLast: {
    type: Boolean,
    required: true,
  },
  currentStage: {
    type: Object,
    required: true,
  },
});

const { timer } = useTimer();

const remainingTimeText = computed(() => {
  if (remainingTime.value > 100) {
    return "+100s";
  }

  return remainingTime.value + "s";
});

function handleSetRemainingTime(currentTime) {
  remainingTime.value = currentTime;
}

function handleToggleOptions() {
  isShowing.value = !isShowing.value;
}

function handleCloseMenuMenu() {
  isShowing.value = false;
}

function handleNextStep() {
  handleCloseMenuMenu();
  $emit("next-step");
}
function handleClose() {
  handleCloseMenuMenu();
  $emit("close");
}
function handleEndTime() {
  $emit("end-time");
}

window.addEventListener("orientationchange", () => {
  hideTransation.value = true;

  setTimeout(() => {
    hideTransation.value = false;
  }, 1000);
});
</script>

<style lang="scss" scoped>
.side-menu-options {
  --buttonSize: 65px;

  position: absolute;
  top: 70px;
  z-index: 10;

  transition: transform 0.2s ease-in;
  transform: translateX(calc(100vw));

  display: flex;

  &--showing {
    transform: translateX(calc(100vw - 100%));
  }

  &--hide-transition {
    transition: none;
  }

  &__container {
    position: relative;
    display: flex;

    border: 2px solid $primary;
    border-radius: $default-border-radius 0 0 $default-border-radius;

    background: $white;
  }

  &__button {
    overflow: hidden;
    width: var(--buttonSize);
    height: 40px;

    border: 2px solid $primary;
    border-right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 20px;
    left: calc(-1 * var(--buttonSize));

    background: $white;
    border-radius: $default-border-radius 0 0 $default-border-radius;
  }

  &__content {
    width: 200px;
    height: 200px;
    padding: 10px;

    display: flex;
    flex-direction: column;
    gap: 8px;

    /* justify-content: center;
    align-items: center; */
  }

  &__timer-wrapper {
    align-self: center;
  }

  &__button-container {
    display: flex;
    flex-direction: column;

    gap: 5px;
  }
}

@keyframes closeAnimation {
  from {
    width: 100%;
    opacity: 1;
  }

  to {
    width: 0;
    opacity: 0;
  }
}

@keyframes openAnimation {
  from {
    width: 0;
    opacity: 0;
  }

  to {
    width: 100%;
    opacity: 1;
  }
}

@keyframes rewardCloseAnimation {
  0% {
    display: flex;
    flex-direction: row;
  }

  50%,
  100% {
    display: flex;
    flex-direction: column;
  }
}
</style>
