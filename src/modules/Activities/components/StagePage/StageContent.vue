<template>
  <div class="stage-content">
    <StageInformative v-if="isInformative" :path="content" :title="informativeTitle"
      :description="informativeDescription" />

    <component v-else-if="renderComponent && stageFileTypeComponent" :is="stageFileTypeComponent" :path="content"
      @finish="handleFinish" />
  </div>
</template>

<script setup>
import { computed, defineProps, watch, nextTick, ref } from "vue";

import StageInformative from "./StageInformative.vue";
import StageFileTypeAudio from "./StageFileTypeAudio.vue";
import StageFileTypeImage from "./StageFileTypeImage.vue";
import StageFileTypePdf from "./StageFileTypePdf.vue";
import StageFileTypeVideo from "./StageFileTypeVideo.vue";
import StageFileGameExternal from "./StageFileGameExternal.vue";
import StageFileGameInternal from "./StageFileGameInternal.vue";

const $emit = defineEmits(["finish"]);

const props = defineProps({
  activityId: {
    type: Number,
    required: true,
  },
  stageId: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  isInformative: {
    type: Boolean,
    default: false,
  },
  informativeTitle: {
    type: String,
    default: null,
  },
  informativeDescription: {
    type: String,
    default: null,
  },
});

const stageFilesMap = {
  music: StageFileTypeAudio,
  image: StageFileTypeImage,
  document: StageFileTypePdf,
  video: StageFileTypeVideo,
  "game-external": StageFileGameExternal,
  "game-internal": StageFileGameInternal,
};

const renderComponent = ref(false);

const stageFileTypeComponent = computed(() => {
  return stageFilesMap[props.type] || null;
});

watch(
  () => props.content,
  (val) => {
    renderComponent.value = false;

    nextTick(() => {
      renderComponent.value = true;
    });
  },
  { deep: true, immediate: true }
);

const handleFinish = (data) => {
  $emit("finish", data);
};
</script>

<style lang="scss" scoped>
.stage-content {
  height: 100%;
  overflow: auto;
}
</style>
