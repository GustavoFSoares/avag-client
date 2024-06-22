export default {
  count(state) {
    return state.notifications.reduce((acc, item) => {
      return acc + item.new_message_professor
    }, 0)
  }
}
