<template>
  <div class="notifications">

    <div class="header">
      <h4>Notificações</h4>

      <q-btn color="white" text-color="black" @click="goBack">
        Voltar
      </q-btn>
    </div>

    <vue-advanced-chat
      load-first-room
      room-info-enabled
      :current-user-id="String(studentId)"
      :rooms="JSON.stringify(rooms)"
      :messages="JSON.stringify(messages)"
      :text-messages="JSON.stringify(TEXT_MESSAGES)"
      :room-actions="JSON.stringify(roomActions)"
      :show-audio="false"
      :show-files="false"
      :show-reaction-emojis="false"
      :show-add-room="false"
      :loading-rooms="false"
      :rooms-loaded="loading"
      :messages-loaded="!loading"
      @fetch-messages="fetchMessages"
      @send-message="sendMessage"
    />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import { register } from 'vue-advanced-chat'

register()

const $router = useRouter();
const $store = useStore();

const loading = computed(() => $store.state.NotificationsModule.loading);
const studentId = computed(() => $store.state.AuthModule.user.studentId);
const rooms = computed(() => $store.getters["NotificationsModule/rooms"]);

const roomActions = ref([])
const messages = ref([])

const TEXT_MESSAGES = {
  ROOMS_EMPTY: 'Sem conversas',
  ROOM_EMPTY: 'Sem conversa',
  NEW_MESSAGES: 'Novas mensages',
  MESSAGE_DELETED: 'Mensagem deletada',
  MESSAGES_EMPTY: 'Aucun message',
  CONVERSATION_STARTED: 'A conversa começou em:',
  TYPE_MESSAGE: 'Digite sua mensagem',
  SEARCH: 'Pesquisar',
  IS_ONLINE: 'está online',
  LAST_SEEN: 'última conexão ',
  IS_TYPING: 'está digitando...',
  CANCEL_SELECT_MESSAGE: 'Cancelar seleção'
}

const loadMessages = () => $store.dispatch("NotificationsModule/loadNotifications");

const fetchMessages = async ({ detail }) => {
  const [currentDetail] = detail;
  const newMessages = await $store.dispatch("NotificationsModule/fetchMessages", { notificationId: currentDetail.room.roomId, visualizate: true });
  messages.value = newMessages;
};

const sendMessage = async ({ detail }) => {
  const [currentDetail] = detail;
  await $store.dispatch("NotificationsModule/sendMessage", currentDetail);
  const newMessages = await $store.dispatch("NotificationsModule/fetchMessages", { notificationId: currentDetail.roomId, visualizate: false });
  messages.value = newMessages;
}

const goBack = () => $router.back();

onBeforeMount(() => {
  loadMessages()
})

</script>

<style lang="scss" scoped>
.circular-progress {
  margin-top: 20px;
}

.notifications {
  padding: 24px;
}

.header {
  margin-bottom: 20px;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

</style>
