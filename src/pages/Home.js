import React from "react";
import { Grid, Row, Col } from "rsuite";
import Sidebars from "../component/Body/Sidebars";

const Home = () => {
  return (
    <Grid fluid className="h-100" style={{ backgroundColor: "white" }}>
      <Row>
        <Col xs={24} md={8}>
          <Sidebars />
        </Col>
      </Row>
    </Grid>
  );
};

export default Home;
