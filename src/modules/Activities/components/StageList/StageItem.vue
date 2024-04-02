<template>
  <li
    :class="[
      'stage-item',
      {
        'stage-item--completed no-pointer-events': completed,
        'stage-item--blocked': !active,
      },
    ]"
    @click="handleClick"
  >
    <div class="stage-item__stars" v-if="false">
      <QIcon
        :class="[
          'stage-item__stars-icon',
          { 'stage-item__stars-icon--checked': rankItem <= rank },
        ]"
        v-for="rankItem in TOTAL_STARS"
        :key="rankItem"
        name="svguse:/icons.svg#star"
      />
    </div>

    <div class="stage-item__container">
      <div class="stage-item__content">
        <div class="stage-item__position">{{ positionLabel }}</div>
        <div class="stage-item__badgse"></div>

        <div v-if="!active" class="stage-item__locked">
          <div class="stage-item__locked-icon">
            <QIcon name="fa-solid fa-lock" size="25px" />
          </div>
        </div>

        <div v-if="completed" class="stage-item__completed-flag">
          <div class="stage-item__completed-flag-icon">
            <QIcon name="check" color="green-9" size="25px" />
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
const TOTAL_STARS = 0;

import { computed } from "vue";
import { Screen } from "quasar";

export default {
  name: "StageItem",
  props: {
    position: {
      type: [String, Number],
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const isMobile = computed(() => Screen.xs);
    const itemProgress = computed(() => (100 * props.rank) / TOTAL_STARS);
    const positionLabel = computed(() => Number(props.position) + 1);

    const handleClick = (ev) => {
      if (props.active) {
        ctx.emit("click-stage");
      }
    };

    return {
      TOTAL_STARS,
      isMobile,
      itemProgress,
      positionLabel,
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-item {
  position: relative;
  width: 180px;
  height: 180px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  transition: all 0.5s ease 0s;
  border-top: thick groove white;
  border-width: thick thick thick;
  border-radius: 0px 55%;
  border-bottom: double;

  &--blocked,
  &--blocked &__content {
    cursor: not-allowed !important;
  }

  &--completed & {
    &__content {
      background-color: $positive;
    }
  }

  &::before {
    content: "";
    position: absolute;
    width: 68px;
    height: 14px;
    background: transparent;
    left: -2px;
  }

  &__container {
    display: flex;
    justify-content: center;
  }

  &__content {
    position: relative;

    cursor: pointer;
    background-color: rgb(205, 0, 41);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px,
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px inset,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

    border: 13px solid $white;
    border-radius: 100%;
  }

  &__position {
    color: $white;
    font-size: 48px;
    line-height: 91px;

    width: 91px;
    height: 91px;

    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;
  }

  &__locked,
  &__completed-flag {
    position: absolute;
    top: 85%;

    width: 100%;
    display: flex;
    justify-content: center;

    &-icon {
      background: $white;
      border-radius: 100%;
      padding: 8px;
    }
  }
}
</style>
