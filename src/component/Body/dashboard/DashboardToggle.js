import React, { useCallback } from "react";
import { Button, Drawer, toaster, Message } from "rsuite";
import { auth } from "../../../misc/firebase";
import Dashboard from ".";

import { useModalState, useMediaQuery } from "../../../misc/Custom-hooks";

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery("(max-width:992px)");

  const SignOut = useCallback(() => {
    auth.signOut();
    toaster.push(<Message type="error">Signed out!</Message>, {
      placement: "topCenter",
    });
    close();
  }, [close]);

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
        <Dashboard SignOut={SignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
