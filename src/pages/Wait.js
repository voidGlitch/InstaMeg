import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Grid, Row, Col, Button, Panel, Container } from "rsuite";
import { Link } from "react-router-dom";

const Wait = () => {
  const { isverified } = useAuth();

  console.log(isverified);
  return (
    <>
      <Container>
        <Grid className="mt-page">
          <Row>
            <Col xs={24} md={12} mdOffset={6}>
              <Panel className="text-center back">
                <h3 className=" text-white" style={{ margin: "100px" }}>
                  {isverified ? (
                    <div>
                      Thanks for your patience!{" "}
                      <strong>You are now verified</strong> please Continue
                      <Link to="/">
                        <Button size="md" appearance="primary" color="violet">
                          Continue!
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    "A verification link Has been sent to your email Account."
                  )}
                </h3>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </Container>
    </>
  );
};

export default Wait;
