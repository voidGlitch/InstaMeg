import React from "react";
import { Drawer, Button, toaster, Message } from "rsuite";
import { useAuth } from "../../../Context/AuthContext";
import { database } from "../../../misc/firebase";
import Editableinput from "./Editableinput";
const Dashboard = ({ SignOut }) => {
  const { authprofile } = useAuth();

  const onSave = async (newData) => {
    const userNickname = database
      .ref(`/profiles/${authprofile.uid}`)
      .child("/name");
    try {
      userNickname.set(newData);
      toaster.push(
        <Message showIcon type="info">
          Successfully updated nickname
        </Message>,
        { placement: "topCenter" }
      );
    } catch (err) {
      toaster.push(
        <Message showIcon type="info">
          {err.message}
        </Message>,
        { placement: "topCenter" }
      );
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>DashBoard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body style={{ padding: "0px 0px", margin: "0px 20px" }}>
        <h2>Good to see you @{authprofile.name}</h2>
        <Editableinput
          name="nickname"
          initialValue={authprofile.name}
          onSave={onSave}
          label={<strong className="mb-2">Nickname</strong>}
        />
      </Drawer.Body>

      <div className="footer">
        <Button block appearance="primary" color="red" onClick={SignOut}>
          Signout
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
