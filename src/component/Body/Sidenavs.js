import React from "react";
import { Sidenav, Nav, Toggle } from "rsuite";
import DashboardToggle from "./dashboard/DashboardToggle";

const Sidenavs = ({ isMobile }) => {
  console.log(isMobile);
  return (
    <div
      style={{
        textAlign: "center",
        margin: `${isMobile ? "0px" : "0px 10px 0px 0px"}`,
      }}
    >
      <Sidenav
        expanded={isMobile ? "true" : "false"}
        style={{
          backgroundColor: "#21325E",
          borderRadius: `${isMobile ? "0%" : "10px"}`,
          padding: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Sidenav.Body style={{ textAlign: "center" }}>
          <Nav>
            <img
              src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-dashboard-user-interface-kmg-design-flat-kmg-design.png"
              alt="not"
              className="mt-2 mb-2 "
            />
            <DashboardToggle />
            <DashboardToggle />
            <DashboardToggle />
            <DashboardToggle />
            <DashboardToggle />
            <DashboardToggle />
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};
export default Sidenavs;
