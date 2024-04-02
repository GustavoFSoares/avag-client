<template>
  <q-card class="stage-list-detail">
    <div class="stage-list-detail__content">
      <QBtn
        class="stage-list-detail__close"
        icon="close"
        flat
        rounded
        padding="sm"
        @click="handleClose"
      />

      <div class="stage-list-detail__position">{{ positionLabel }}</div>

      <h1 class="stage-list-detail__title">{{ stage.name }}</h1>

      <div class="stage-list-detail__stars" v-if="false">
        <QIcon
          :class="[
            'stage-list-detail__stars-icon',
            {
              'stage-list-detail__stars-icon--checked': rankItem <= stage.rank,
            },
          ]"
          v-for="rankItem in TOTAL_STARS"
          :key="rankItem"
          name="svguse:/icons.svg#star"
        />
      </div>

      <div v-if="stageTypes" class="stage-list-detail__types">
        <div
          class="stage-list-detail__type"
          v-for="stageType in stageTypes"
          :key="stageType"
        >
          <QTooltip>
            {{ $t(`${I18N_STAGE_TYPE_PATH}.${stageType.name}`) }}
          </QTooltip>

          <QIcon class="stage-list-detail__type-icon" :name="stageType.icon" />
        </div>
      </div>

      <AvProgressBar
        v-if="false"
        class="stage-list-detail__progress-bar"
        :progress="stage.progress"
      />

      <AvReward
        v-if="stage.reward"
        class="stage-list-detail__rewards"
        :points="stage.reward.points"
        :coins="stage.reward.coins"
        column
      />

      <QBtn
        class="stage-list-detail__start-activity"
        :label="$t(`${I18N_PATH}.startActivity`)"
        color="primary"
        :disable="stage.types?.length === 0"
        :to="{
          name: 'activities.stage',
          params: {
            id: stage.trailId,
            stageId: stage.id,
          },
        }"
      />

      <p v-if="stage.types?.length === 0">Sem fases cadastradas</p>

      <div class="library" v-if="stage.library">
        <h4 class="library__title">{{ $t(`${I18N_PATH}.library`) }}:</h4>
        <div class="library__itens">
          <QBtn
            v-for="(libraryItem, libraryItemIndex) in stage.library.itens"
            :key="libraryItemIndex"
            class="library-item"
            flat
            size="sm"
            padding="6px"
            @click="handleOpenDocument(libraryItem)"
          >
            <QIcon
              class="library-item__icon"
              :name="iconsMap[libraryItem.type]"
              size="10px"
            />

            <div class="library-item__description">
              {{ libraryItem.description }}
            </div>

            <QIcon
              class="library-item__download-icon"
              name="fa-solid fa-download"
              size="10px"
            />
          </QBtn>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
const TOTAL_STARS = 3;
const I18N_PATH = "modules.activities.pages.stageList.detail";
const I18N_STAGE_TYPE_PATH = "modules.activities.stageType";

import { iconsMap } from "maps/iconsMaps.json";

import { computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";

import AvReward from "molecules/AvReward.vue";
import AvProgressBar from "atoms/AvProgressBar.vue";

const props = defineProps({
  stage: {
    type: Object,
    default: () => ({ progress: 0 }),
  },
});
const $emits = defineEmits(["close"]);
const $store = useStore();

const { appContext } = getCurrentInstance();

const stageTypes = computed(() => {
  if (!props.stage.types) {
    return null;
  }

  const icons = props.stage.types.map((type) => {
    return {
      icon: appContext.config.globalProperties.$iconsMap[type] || type,
      name: type,
    };
  });

  return icons;
});

const positionLabel = computed(() => Number(props.stage.position) + 1);

const handleClose = () => {
  ctx.emit("close");
};

const handleOpenDocument = ({ id, file }) => {
  console.log(id, "  ++ Detail");
  window.open(
    `${appContext.config.globalProperties.$appStorage}/${file}`,
    "_blank"
  );

  $store.dispatch("AchievementsModule/downloadingContent", id);
};
</script>

<style lang="scss" scoped>
.stage-list-detail {
  background: $card-background;
  border: $card-border-line;
  border-radius: $default-border-radius;
  backdrop-filter: $default-backdrop;

  padding: 70px 30px;

  position: relative;

  width: 500px;
  @media (max-width: $breakpoint-mobile) {
    width: 90vw;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 250px;
    margin: 0 auto;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: $text-color-3;
  }

  &__position {
    border-radius: 50px;
    width: 72px;
    height: 72px;
    border-radius: $default-border-radius;

    border: $card-border-line;
    border-color: $primary;
    background: $primary;
    color: $text-color-3;

    padding: 2px;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
  }

  &__title {
    font-size: 14px;
    font-weight: $font-weight-semibold;
    color: $text-color-1;
  }

  &__stars {
    display: flex;
    gap: 4px;

    &-icon {
      font-size: 18px;
      stroke: $white;
      fill: $secondary;

      &--checked {
        stroke: $secondary;
        fill: $secondary;
      }
    }
  }

  &__rewards {
    max-width: 200px;
  }

  &__progress-bar {
    margin-top: 20px;
  }

  &__types {
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    color: $text-color-2;
  }

  &__type {
    &-name {
      font-size: 12px;
    }

    &-icon {
      font-size: 20px;
    }
  }

  &__start-activity {
    text-transform: none !important;
    margin-top: 40px;
  }

  .library {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    width: 100%;

    &__title {
      font-size: 12px;
      font-weight: $font-weight-semibold;
      color: $text-color-1;
    }

    &__itens {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;

      width: 100%;
    }

    &-item {
      width: 100%;

      :deep(.q-btn__content) {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
      }

      &__icon,
      &__download-icon {
        color: $text-color-2;
      }
    }
  }
}
</style>
