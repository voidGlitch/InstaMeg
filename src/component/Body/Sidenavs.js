import React from "react";
import { Sidenav, Nav } from "rsuite";
import DashboardToggle from "./dashboard/DashboardToggle";

const Sidenavs = () => {
  return (
    <div
      style={{
        display: "inline-block",
        justifyItems: "center",
        textAlign: "center",
      }}
    >
      <Sidenav>
        <Sidenav.Body>
          <Nav>
            <img
              src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-dashboard-user-interface-kmg-design-flat-kmg-design.png"
              alt="not"
              onClick={() => {
                console.log("clicked");
              }}
              className="mt-2 mb-2"
            />
            <DashboardToggle />
            <Nav.Item eventKey="2" className="pb-2">
              User Group
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};
export default Sidenavs;
