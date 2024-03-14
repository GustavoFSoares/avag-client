<template>
  <div class="activities-presentation">
    <video
      autoplay
      :width="$q.screen.width"
      :height="$q.screen.height"
      @ended="handleEndVideo"
    >
      <source
        :src="`/activities-presentation/animacao-${presentationId}.mp4`"
        type="video/mp4"
      />

    </video>

    <QBtn
      class="activities-presentation__close-button"
      color="secondary"
      padding="xs"
      label="Pular"
      icon="skip_next"
      @click="handleEndVideo"
    />
  </div>
</template>

<script setup>
import { toRef, defineProps } from "vue";

const $emits = defineEmits(["ended"]);
const props = defineProps({
  presentationId: {
    type: [Number, String],
    reuqired: true,
  },
});

const handleEndVideo = () => {
  $emits("ended");
};
</script>

<style lang="scss" scoped>
.activities-presentation {
  background: $dark-background;
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: 99%;
  }

  &__close-button {
    position: absolute;
    bottom: 10px;
    right: 10px;

  }
}
</style>
