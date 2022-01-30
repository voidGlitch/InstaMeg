import React from "react";
import { Drawer, Button } from "rsuite";
import { useAuth } from "../../../Context/AuthContext";
const Dashboard = ({ SignOut }) => {
  const { authprofile, isverfied } = useAuth();
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>DashBoard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey,{isverfied ? "Guest" : `${authprofile.name}`}</h3>
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
