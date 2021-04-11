import React, { useEffect } from "react";
import socket from "../../socket.io";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import "./index.css";
import ChatUsers from "../chatUsers";
import ChatMessage from "../chatMessages";
import { withRouter } from "react-router-dom";
import "./index.css";
import SendMessage from "../sendMessage";
import Creators from "../../store/actionCreators";

function Chats(props) {
  const username = useSelector((state) => state.username);
  const selectedChatUsername = useSelector(
    (state) => state.selectedChatUsername
  );
  const allChats = useSelector((state) => state.allChats);
  const chatWithUsers = useSelector((state) => state.chatWithUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("join-room", username);
  }, [username]);
  useEffect(() => {
    socket.on(`${username}/new-message`, (senderUserName, message) => {
      if (allChats[senderUserName]) {
        dispatch(Creators.updateAllChats(senderUserName, message));
      } else {
        dispatch(Creators.updateChatWithUsers(senderUserName, message));
      }
    });
    socket.on("room/new-message", (senderUserName, message) => {
      dispatch(Creators.updateAllChats(senderUserName, message, true));
    });
    return () => {
      socket.removeAllListeners(`${username}/new-message`);
      socket.removeAllListeners("room/new-message");
    };
  }, [allChats, dispatch, username]);

  return (
    <Layout>
      <Layout.Sider width={300} className="chats-container">
        <ChatUsers data={chatWithUsers} />
      </Layout.Sider>
      <Layout.Content>
        <Layout>
          <Layout.Header className="chats-selected-username">
            {selectedChatUsername}
          </Layout.Header>
          <Layout.Content>
            <div className="chat-message-container">
              <ChatMessage data={allChats[selectedChatUsername]} />
            </div>
            <SendMessage
              username={username}
              selectedUsername={selectedChatUsername}
            />
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  );
}

export default withRouter(Chats);
