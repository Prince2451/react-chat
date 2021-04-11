import React, { useState, useCallback } from "react";
import "./index.css";
import { Input, Form, Button } from "antd";
import { useDispatch } from "react-redux";
import Creators from "../../store/actionCreators";
import { withRouter } from "react-router-dom";

function SetUsername(props) {
  const [usernameInput, setUsernameInput] = useState("");
  const dispatch = useDispatch();

  const valueChangeHandler = useCallback((e) => {
    setUsernameInput(e.target.value);
  }, []);

  const setUsername = useCallback(() => {
    if (usernameInput) {
      dispatch(Creators.setUsername(usernameInput));
      props.history.push("/chat");
    }
  }, [dispatch, props.history, usernameInput]);

  return (
    <div className="set-username">
      <div className="set-username-center-box">
        <Form name="set-username" layout="inline" onFinish={setUsername}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              type="text"
              value={usernameInput.value}
              onChange={valueChangeHandler}
              placeholder="Enter Username"
              bordered
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Set Username
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default withRouter(SetUsername);
