import { format, parseISO } from 'date-fns';
import { api } from "boot/axios";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  loadNotifications: async ({ commit }) => {
    try {
      commit("SET_LOADING", true);

      const { data } = await api.post("/alunos/notificacao-user");

      commit("SET_NOTIFICATIONS", data);

      return data;
    } catch (err) {
      console.error("Notifications Error", err);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  fetchMessages: async ({ commit }, { notificationId, visualizate }) => {
    try {

      commit("SET_LOADING", true);

      if (visualizate) {
        const formData = new FormData();
        formData.append('notificacao_id', notificationId)
        await api.post('/alunos/notificacao-user/visualizar', formData)
      }

      const { data: notifications } = await api.post("/alunos/notificacao-user");

      const notification = notifications
        .find(item => String(item.id) === notificationId)

      const newMessages = []

      notification.items.forEach(message => {
        newMessages.push({
          _id: String(message.id),
          indexId: Date.now() + message.id,
          content: message.message,
          senderId: String(message.send_aluno_id ? message.send_aluno_id : notification.professore_id),
          avatar: '',
          date: format(new Date(message.created_at).toISOString(), 'dd/MM/yyyy'),
          timestamp: parseDate(message.created_at),
          system: false,
          saved: true,
          distributed: true,
          seen: message.status === 'visualizada',
          deleted: false,
          failure: false,
          disableActions: true,
          disableReactions: true,
          files: [],
          reactions: {},
        })
      });

      newMessages.unshift({
        _id: String(notification.id),
        indexId: Date.now() + notification.id,
        content: notification.message,
        senderId: String(notification.send_aluno_id ? notification.send_aluno_id : notification.professore_id),
        avatar: '',
        date: format(new Date(notification.created_at).toISOString(), 'dd/MM/yyyy'),
        timestamp: parseDate(notification.created_at),
        system: false,
        saved: true,
        distributed: true,
        seen: notification.status === 'visualizada',
        deleted: false,
        failure: false,
        disableActions: true,
        disableReactions: true,
        files: [],
        reactions: {},
      });

      return newMessages
    } catch (err) {
      console.error("Notifications Error", err);
    } finally {
      commit("SET_LOADING", false);
    }

    return []
  },
  async sendMessage({ commit, dispatch }, { roomId, content }) {
    try {
      commit("SET_LOADING", true);

      const formData = new FormData();
      formData.append('notificacao_id', roomId)
      formData.append('message', content)

      await api.post('/alunos/notificacao-user/send/', formData)

      return dispatch("fetchMessages", { notificationId: roomId, visualizate: false })
    } catch (error) {
      console.error("Send Notifications Error", err);
    } finally {
      commit("SET_LOADING", false);
    }
  }
}

function parseDate(dateString) {
  const date = new Date(dateString);
  const isoDate = date.toISOString();
  return (`${isoDate.substring(0, 10)} ${isoDate.substring(11, 19)}`);
}
