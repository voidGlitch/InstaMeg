import React from "react";
import { Container, Content, Footer, Header, Sidebar } from "rsuite";
import { useMediaQuery } from "../../misc/Custom-hooks";
import CreateRoombtnModal from "./ChatRoom/CreateRoombtnModal";
import Sidenavs from "./Sidenavs";

const Sidebars = () => {
  const isMobile = useMediaQuery("(max-width:992px)");

  return (
    <Container style={{ flexDirection: `${isMobile ? "column" : "row"}` }}>
      <Sidebar style={{ width: "100%", flex: "0 0 30px" }}>
        {<Sidenavs isMobile={isMobile} />}
      </Sidebar>
      <Container>
        <Header>{<CreateRoombtnModal />}</Header>
        <Content>Diplay contenet her</Content>
        <Footer>Footer</Footer>
      </Container>
    </Container>
  );
};

export default Sidebars;
