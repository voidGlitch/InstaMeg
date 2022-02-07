import React from "react";
import { Container, Content, Footer, Header, Sidebar } from "rsuite";
import CreateRoombtnModal from "./ChatRoom/CreateRoombtnModal";
import Sidenavs from "./Sidenavs";

const Sidebars = () => {
  return (
    <Container>
      <Sidebar>{<Sidenavs />}</Sidebar>
      <Container>
        <Header>{<CreateRoombtnModal />}</Header>
        <Content>Diplay contenet her</Content>
        <Footer>Footer</Footer>
      </Container>
    </Container>
  );
};

export default Sidebars;
