import React from "react";

import { Container, Row, Col, Grid, Panel } from "rsuite";

const Signin = () => {
  //tell React that your component needs to do something after render.

  return (
    <div>
      <Container>
        <Grid className="mt-page">
          <Row>
            <Col xs={24} md={12} mdOffset={6}>
              {/* panel use gives padding */}
              <Panel className="text-center mt-mid">
                <h1>Welcome to the Blog-app</h1>
                <p>An intractive app filled with your memories</p>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Signin;
