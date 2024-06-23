import { format, parseISO } from 'date-fns';

export default {
  count(state) {
    return state.notifications.reduce((acc, item) => {
      return acc + item.new_message_professor
    }, 0)
  },
  rooms(state) {
    let rooms = [];

    state.notifications.forEach((notification, index) => {

      const isAluno = notification.tipo === 'aluno';
      const lastMessageSenderId = isAluno ? notification.receive_aluno_id : notification.professore_id
      const lastSenderName = isAluno ? notification.nome_aluno_send : notification.nome_professor_send

      rooms.push({
        roomId: String(notification.id),
        roomName: String(notification.nome_professor_send),
        index: index,
        avatar: '',
        unreadCount: notification.new_message_professor,
        lastMessage: {
          _id: String(notification.id),
          content: notification.message,
          senderId: String(lastMessageSenderId),
          username: lastSenderName,
          timestamp: '13:00', //'notification.created_at',
          saved: true,
          distributed: false,
          seen: false,
          new: true
        },
        users: [
          {
            _id: String(notification.receive_aluno_id),
            username: notification.nome_aluno_send,
            avatar: '',
            status: {
              state: 'online',
              lastChanged: 'today, 14:30'
            }
          },
          {
            _id: String(notification.professore_id),
            username: notification.nome_professor_send,
            avatar: '',
            status: {
              state: 'online',
              lastChanged: 'today, 14:30'
            }
          }
        ],
        typingUsers: []
      })
    })

    return rooms;
  },
}
