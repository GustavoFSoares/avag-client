<template>
  <section class="stage-file-game-internal">
    <component
      :is="gameComponent"
      :url="gameUrl"
      :parameters="gameParameters"
      @finish="handleFinish"
    />
  </section>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted } from "vue";
import { useStore } from "vuex";

// import InternalGamesMap from "maps/internalGamesMap.json";

import SevenErrors from "./InternalGames/SevenErrors.vue";
import ExamGame from "./InternalGames/ExamGame.vue";
import MemoryGame from "./InternalGames/MemoryGame.vue";
import EmptyGame from "./InternalGames/EmptyGame.vue";
import ExamMuptipleChooseGame from "./InternalGames/ExamMuptipleChooseGame.vue";

import QuizGame from "./InternalGames/QuizGame.vue";
import WordPuzzle from "./InternalGames/WordPuzzle.vue";
import HangmanGame from "./InternalGames/HangmanGame.vue";
import PuzzleGame from "./InternalGames/PuzzleGame.vue";

const { appContext } = getCurrentInstance();
const InternalGamesMap = {
  "word-puzzle": "WordPuzzle",
  hangman: "HangmanGame",
  quiz: "QuizGame",
  "7-erros": "games/game_7_erros",
  "jogo-da-velha": "games/jogo_da_velha",
  "jogo-forca": "games/jogo_da_forca",
  "jogo-memoria": "games/jogo_da_memoria",
  "Quiz--arraste-as-letras": "games/quiz_arraste_as_letras",
  "Quiz--arraste-palavras-corretas": "games/quiz_arraste_as_palavras_corretas",
  "Quiz--emparedado": "games/quiz_emparedado",
  "Quiz--escolha-multiplas-palavras":
    "games/quiz_escolha_multiplas_alternativa",
  "Quiz--escolha-uma-alternativa": "games/quiz_escolha_uma_alternativa",
  "Quiz--acerte-figura-multipla-escolha":
    "games/quiz_acerte_as_figuras_multipla_escolha",
  "Quiz--avaliacao": "games/quiz_provas/avaliacao",
  "Quiz--avaliacao-resposta": "games/quiz_provas/response",
  "quebra-cabeca": "games/quiz_quebra_cabeca",
};

const $store = useStore();
const $emit = defineEmits(["finish"]);

const props = defineProps({
  path: {
    type: Object,
    required: true,
  },
  parameters: {
    type: Array,
    default: () => [],
  },
});

const preparedPath = computed(() => {
  return typeof props.path === "string" ? JSON.parse(props.path) : props.path;
});

const gameComponent = computed(() => {
  const gamesMap = {
    "7-erros": SevenErrors,
    "Quiz--avaliacao": ExamGame,
    "Quiz--avaliacao-resposta": ExamGame,
    "jogo-memoria": MemoryGame,
    "quebra-cabeca": PuzzleGame,
    "Quiz--acerte-figura-multipla-escolha": ExamMuptipleChooseGame,
  };

  return gamesMap[preparedPath.value.game] || EmptyGame;
});

const gameUrl = computed(() => {
  return (
    `${appContext.config.globalProperties.$appPublic}/${
      InternalGamesMap[preparedPath.value.game]
    }` || preparedPath.value.game
  );
});

const gameParameters = computed(() => {
  return preparedPath.value.gameData;
});

const handleFinish = (data) => {
  $emit("finish", data);
};

onMounted(() => {
  $store.dispatch("AchievementsModule/accessingGames");
});
</script>

<style lang="scss" scoped>
.stage-file-game-internal {
  max-width: 1150px;
  margin: 0 auto;
  height: 100%;

  border-radius: $default-border-radius;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 600px;
    border: none;
  }
}
</style>
