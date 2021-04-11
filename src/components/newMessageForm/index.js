import React, { useState, useCallback } from "react";
import { Modal, Button, Form, Input } from "antd";

function NewMessageForm(props) {
  const [usernameValue, setUsernameValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const updateInputValue = useCallback((e) => {
    switch (e.target.name) {
      case "username":
        setUsernameValue(e.target.value);
        break;
      case "message":
        setMessageValue(e.target.value);
        break;
      default:
        return;
    }
  }, []);

  const submitForm = useCallback(() => {
    props.onSubmit(usernameValue.toLowerCase(), messageValue);
    setMessageValue("");
    setUsernameValue("");
  }, [messageValue, props, usernameValue]);

  return (
    <Modal
      title={props.title}
      visible={props.modalVisible}
      onCancel={props.closeModal}
      onOk={submitForm}
      footer={[
        <Button key="back" onClick={props.closeModal}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={submitForm}>
          Submit
        </Button>,
      ]}
    >
      <Form>
        <Form.Item>
          <Input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={usernameValue}
            onChange={updateInputValue}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="text"
            placeholder="Enter Message"
            name="message"
            value={messageValue}
            onChange={updateInputValue}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewMessageForm;
