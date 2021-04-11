import "./App.css";
import { Layout } from "antd";
import SetUsername from "./components/setUsername";
import { Switch, Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
import socket from "./socket.io";
import { useSelector } from "react-redux";
import Chats from "./components/chats";

function App() {
  const username = useSelector((state) => state.username);
  useEffect(() => {
    socket.on("connect", (socket) => {
      
    });
    return () => {
      socket.disconnect();
    }
  }, []);
  return (
    <Layout className="layout">
      <Layout.Header className="layout-header">
        <h2 className="layout-header-content">React Chat</h2>
      </Layout.Header>
      <Layout.Content>
        <Switch>
          <Route path="/chat">
            {username ? <Chats/> : <Redirect to="/" />}
          </Route>
          <Route path="/" exact>
            {username ? <Redirect to="/chat" /> : <SetUsername />}
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout.Content>
    </Layout>
  );
}

export default App;
