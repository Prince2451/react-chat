import React, { useState, useCallback } from "react";
import { List, Button } from "antd";
import "./index.css";
import NewMessageForm from "../newMessageForm";
import { useDispatch, useSelector } from "react-redux";
import Creators from "../../store/actionCreators";
import socket from "../../socket.io";

function ChatUsers(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);
  const chatWithUsers = useSelector((state) => state.chatWithUsers);

  const changeSelectedChat = useCallback(
    (username, e) => {
      dispatch(Creators.updateSelectedChat(username));
    },
    [dispatch]
  );

  const renderItem = useCallback(
    (item) => {
      return (
        <List.Item
          onClick={changeSelectedChat.bind(null, item.title)}
          className="chat-users-userlist"
        >
          <List.Item.Meta
            title={<p className="chat-users-title">{item.title}</p>}
          />
        </List.Item>
      );
    },
    [changeSelectedChat]
  );

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);
  const sendNewMessage = useCallback(
    (newUsername, message) => {
      if (username && message) {
        setModalVisible(false);

        const chat = chatWithUsers.find(
          (ele) => ele.title === newUsername
        );
        if (chat) {
          dispatch(Creators.updateCurrentChatMessages(username, message));
        } else {
          dispatch(
            Creators.updateChatWithUsers(newUsername, message, username)
          );
        }
        socket.emit(`send-message`, username, message, newUsername);
      }
    },
    [username, chatWithUsers, dispatch]
  );
  return (
    <div className="chat-users-container">
      <List
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={renderItem}
      ></List>
      <Button type="primary" block size="large" onClick={openModal}>
        New Chat
      </Button>
      <NewMessageForm
        title="New Chat"
        key="submit"
        onSubmit={sendNewMessage}
        modalVisible={modalVisible}
        openModal={openModal}
        closeModal={closeModal}
        username={username}
      />
    </div>
  );
}

export default ChatUsers;
