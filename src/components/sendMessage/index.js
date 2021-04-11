import React, { useState, useCallback } from "react";
import "./index.css";
import { Input, Button, Form } from "antd";
import socket from "../../socket.io";
import { useDispatch } from "react-redux";
import Creators from "../../store/actionCreators";

function SendMessage(props) {
  const [messageValue, setMessageValue] = useState("");
  const dispatch = useDispatch();

  const updateMessageValue = useCallback((e) => {
    setMessageValue(e.target.value);
  }, []);
  const sendMessageHandler = useCallback(() => {
    if (messageValue) {
      
      socket.emit(
        `send-message`,
        props.username,
        messageValue,
        props.selectedUsername
      );
      dispatch(
        Creators.updateCurrentChatMessages(props.username, messageValue)
      );
      setMessageValue("");
    }
  }, [dispatch, messageValue, props.selectedUsername, props.username]);
  return (
    <div className="send-message-container">
      <Form className="send-message-form" onFinish={sendMessageHandler}>
        <Form.Item className="send-message-form-item">
          <Input
            className="send-message-input"
            type="text"
            placeholder="Send Message"
            size="large"
            value={messageValue}
            onChange={updateMessageValue}
          />
        </Form.Item>
        <Form.Item className="send-message-form-item">
          <Button
            className="send-message-btn"
            size="large"
            type="primary"
            htmlType="submit"
            block
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SendMessage;
