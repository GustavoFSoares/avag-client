<template>
  <div class="exam-game">
    <div class="teacher-response" v-if="teacherResponse">
      <p class="teacher-response__text">
        <span class="teacher-response__text-highlight">
          Resposta do professor:
        </span>

        {{ teacherResponse.response }}
      </p>

      <QRating
        :modelValue="teacherResponse.rate"
        max="5"
        size="3.5em"
        color="yellow"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
        no-dimming
        readonly
      />
    </div>

    <iframe :src="url" ref="iframeElement" @load="handleLoad" />
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";

const { appContext } = getCurrentInstance();
const $emit = defineEmits(["finish"]);

const iframeElement = ref(null);
const teacherResponse = ref(null);

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  parameters: {
    type: [Object, Array],
    default: () => {},
  },
});

const handleLoad = () => {
  const params = JSON.parse(JSON.stringify(props.parameters || {}));

  let gameOptions = {
    avaliacao: params.avaliacao.map((item) => {
      let path = item.path ? item.path : null;
      if (path && !params.response) {
        path = `${appContext.config.globalProperties.$appStorage}/${item.path}`;
      }

      return {
        ...item,
        path,
      };
    }),
    tituloAvaliacao: params.questionTitle,
  };

  if (params.response) {
    gameOptions = {
      params: gameOptions,
      response: JSON.parse(JSON.stringify(params.response.questions)),
    };

    if (params.response.avaliacao) {
      teacherResponse.value = {
        response: params.response.avaliacao.teacherResponse,
        rate: params.response.avaliacao.rate,
      };
    }
  } else {
    gameOptions = { gameOptions };
  }

  iframeElement.value.contentWindow.postMessage({ avag: gameOptions }, "*");

  window.onmessage = ({ data }) => {
    if (data.avag && data.avag.status === "finish") {
      $emit("finish", data.avag.data);
    }
  };
};
</script>

<style lang="scss" scoped>
.exam-game {
  max-width: 1150px;
  margin: 0 auto;
  height: 100%;

  .teacher-response {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    margin-bottom: 10px;

    &__text {
      font-weight: $font-weight-bold;
      font-size: 14px;
    }
  }

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
