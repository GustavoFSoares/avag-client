<template>
  <div class="stage-list">
    <ol
      class="stage-list__list-column"
      v-for="(stagesRow, stagesRowIndex) in preparedList"
      :key="stagesRowIndex"
    >
      <StageItem
        class="stage-list__item"
        v-for="(stage, stageIndex) in stagesRow"
        :key="stage.id"
        :active="stage.released"
        :position="stagesRowIndex * choosedDevice + stageIndex"
        :rank="stage.rank"
        :completed="stage.completed"
        @click-stage="handleClickStage(stage)"
      />
    </ol>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { Screen } from "quasar";

import StageItem from "../components/StageList/StageItem.vue";

export default {
  name: "StageList",
  emits: ["open-stage"],
  components: {
    StageItem,
  },
  props: {
    stages: {
      type: Array,
      required: true,
    },
  },
  setup(props, ctx) {
    const devices = {
      web: 5,
      tablet: 3,
      mobile: 1,
    };

    const choosedDevice = ref(devices.web);
    const isMobile = computed(() => Screen.xs);
    const isTabled = computed(() => Screen.sm);

    const stageList = computed(() => props.stages);

    watch(
      () => {
        choosedDevice.value = devices.web;
        if (isMobile.value) {
          choosedDevice.value = devices.mobile;
        }

        if (isTabled.value) {
          choosedDevice.value = devices.tablet;
        }
      },
      { deep: true, immediate: true }
    );

    const handleClickStage = ({ released, id }) => {
      if (!released) {
        return;
      }

      ctx.emit("open-stage", id);
    };

    const preparedList = computed(() => {
      const stages = [...props.stages];

      const rows = [];
      while (stages.length !== 0) {
        const stagesRow = stages.splice(0, choosedDevice.value);

        rows.push(stagesRow);
      }

      return rows;
    });

    return {
      isMobile,
      choosedDevice,
      stageList,
      preparedList,
      handleClickStage,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding-bottom: 32px;

  gap: 30px;

  ol {
    list-style: none;
  }

  &__list-column {
    display: flex;
  }

  &__item {
    &:first-of-type {
      &::before {
        z-index: -1;
      }
    }
  }
}
</style>
