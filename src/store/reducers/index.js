import Types from "../actionTypes";
import { createReducer } from "reduxsauce";

const INITIAL_STATE = {
  username: "",
  allChats: {
    "room": [],
  },
  selectedChatUsername: "room",
  chatWithUsers: [
    {
      title: "room",
      id: 0,
    },
  ],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case Types.UPDATE_SELECTED_CHAT:
      return {
        ...state,
        selectedChatUsername: action.username,
      };
    case Types.UPDATE_ALL_CHATS:
      return {
        ...state,
        allChats: {
          ...state.allChats,
          [action.username]: state.allChats[action.username]
            ? [...state.allChats[action.username], action.newMessage]
            : [...action.newMessage],
        },
      };
    case Types.UPDATE_CHAT_WITH_USERS:
      return {
        ...state,
        chatWithUsers: [
          ...state.chatWithUsers,
          { title: action.newUsername, id: state.chatWithUsers.length },
        ],
        allChats: {
          ...state.allChats,
          [action.newUsername]: [action.newMessage],
        },
      };
    case Types.UPDATE_CURRENT_CHAT_MESSAGES:
      return {
        ...state,
        allChats: {
          ...state.allChats,
          [state.selectedChatUsername]: [
            ...state.allChats[state.selectedChatUsername],
            action.newMessage,
          ],
        },
      };
    default:
      return {
        ...state,
      };
  }
};

const HANDLERS = {
  [Types.SET_USERNAME]: reducer,
  [Types.UPDATE_CHAT_WITH_USERS]: reducer,
  [Types.UPDATE_CURRENT_CHAT_MESSAGES]: reducer,
  [Types.UPDATE_SELECTED_CHAT]: reducer,
  [Types.UPDATE_ALL_CHATS]: reducer,
};

export default createReducer(INITIAL_STATE, HANDLERS);
