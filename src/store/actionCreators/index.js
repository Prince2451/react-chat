import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  setUsername: ["username"],
  updateSelectedChat: ["username"],
  updateAllChats: (username, message, room = false) => ({
    type: "UPDATE_ALL_CHATS",
    username: room ? "room" : username,
    newMessage: {
      username: username,
      message: message,
    },
  }),
  updateChatWithUsers: (newUsername, message, username) => ({
    type: "UPDATE_CHAT_WITH_USERS",
    newUsername: newUsername,
    newMessage: {
      username: username ? username : newUsername,
      message: message,
    },
  }),
  updateCurrentChatMessages: (username, message) => ({
    type: "UPDATE_CURRENT_CHAT_MESSAGES",
    newMessage: {
      username: username,
      message: message,
    },
  }),
});

export { Types };
export default Creators;
