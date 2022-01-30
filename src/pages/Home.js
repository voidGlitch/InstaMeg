import React from "react";
import { Grid, Row, Col } from "rsuite";
import Sidebar from "../component/Body/Sidebar";

const Home = () => {
  return (
    <Grid fluid className="h-100" style={{ backgroundColor: "white" }}>
      <Row>
        <Col xs={24} md={8}>
          <Sidebar />
        </Col>
      </Row>
    </Grid>
  );
};

export default Home;
