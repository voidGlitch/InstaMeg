import React from "react";
import { Button, Drawer } from "rsuite";
import Dashboard from ".";

import { useModalState, useMediaQuery } from "../../../misc/Custom-hooks";

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery("(max-width:992px)");
  return (
    <>
      <Button block appearance="primary" color="violet" onClick={open}>
        <img
          src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/20/000000/external-fox-origami-vitaliy-gorbachev-lineal-vitaly-gorbachev.png"
          alt="not"
          className="mx-2"
        />
        Dashboard
      </Button>
      <Drawer full={isMobile} open={isOpen} onClose={close} placement="left">
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
        </Drawer.Header>
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
