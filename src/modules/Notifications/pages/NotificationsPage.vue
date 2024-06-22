<template>
  <div class="notifications">

    <h4 class="text-white">Notificações</h4>

    <div v-if="loading" class="circular-progress">
      <q-spinner
        color="primary"
        size="3em"
      />
    </div>

   <div class="q-mt-lg notifications__container">
    <q-list class="q-px-none q">
      <template
        v-for="notification in notifications"
        :key="notification.id"
      >
        <q-expansion-item
          expand-separator
          icon="perm_identity"
          class="q-mt-md bg-white rounded-borders"
          :label="notification.message"
          :caption="notificationCaption(notification)"
        >
        <q-separator />
          <q-card v-if="showLast(notification)">
            <q-card-section class="text-sm">
              ... Mostrando as últimas {{ LENGTH }} mensagens
            </q-card-section>
          </q-card>
          <q-separator />

          <template  v-for="(item) in notification.items.slice(0, LENGTH)" v-bind:key="item">
            <q-card>
              <q-card-section>
                {{ item.message }}
              </q-card-section>
            </q-card>
            <q-separator/>
          </template>
          <q-card>
            <q-card-actions align="center">
              <q-btn color="darkblue" @click="() => replyMessage(notification.id)" flat>Responder</q-btn>
            </q-card-actions>
          </q-card>
          <q-separator />
        </q-expansion-item>
        <q-separator />
      </template>
    </q-list>
   </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onBeforeMount } from "vue";

const LENGTH = 3;

const $router = useRouter();
const $store = useStore();

const loading = computed(() => $store.state.NotificationsModule.loading);
const notifications = computed(() => $store.state.NotificationsModule.notifications);

const showLast = (item) => {
  return item.items.length > 3;
}

const notificationCaption = (item) => {
  const visualizado = item.status === 'visualizada';
  const naoVisualizados = item.items.filter(item => !item.lido).length;
  return visualizado ? item.status : `${naoVisualizados} Não lidas`;
}

const replyMessage = (id) => {
    $router.push({name: 'notifications.chat', query: { id }})
}

onBeforeMount(() => {
  $store.dispatch("NotificationsModule/loadNotifications");
})

</script>

<style lang="scss" scoped>
.circular-progress {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.notifications {
  display: flex;
  flex-direction: column;
  padding: 24px;

  &__container {

    &__item {

      &__section {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}

.capitalize {
  text-transform: capitalize;
  font-size: 13px;
  font-weight: 600;
}

.notifications {
  width: 100%;
}

.inactive {
  color: green;
}

.active {
  color: darkblue;
}

.text-sm {
  font-size: 12px;
  text-align: center;
  padding: 10px 0;
}
</style>

<style lang="scss">
.q-item__label {
  text-transform: capitalize;
}
</style>
