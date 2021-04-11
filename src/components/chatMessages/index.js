import React from "react";
import { List } from "antd";
import "./index.css";

function ChatMessage(props) {
  function renderItem(item) {
    return (
      <List.Item className="chat-messages">
        <List.Item.Meta
          title={<p className="chat-messages-title">{item.username}</p>}
          description={
            <p className="chat-messages-description">{item.message}</p>
          }
        />
      </List.Item>
    );
  }
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.data}
      renderItem={renderItem}
    ></List>
  );
}

export default ChatMessage;
