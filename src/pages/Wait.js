import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Grid, Row, Col, Button, Panel, Container } from "rsuite";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../misc/Custom-hooks";

const Wait = () => {
  const { isverified } = useAuth();
  const isMobile = useMediaQuery("(max-width:992px)");
  console.log(isverified);
  useEffect(() => {
    if (!isverified) {
      document.body.style.backgroundColor = "#131318";
    }
  }, [isverified]);
  document.body.style.backgroundColor = "#131318";
  return (
    <>
      <Container>
        <Grid className="mt-page">
          <Row>
            <Col xs={24} md={12} mdOffset={6}>
              <Panel className="text-center">
                <img
                  src="https://img.icons8.com/external-tal-revivo-duo-tal-revivo/50/000000/external-face-scan-feature-on-digital-portable-devices-mobile-duo-tal-revivo.png"
                  alt="not"
                />
                <h1
                  style={{
                    fontSize: `${isMobile ? "large" : "x-large"}`,
                    color: "#1ef7d8",
                    fontFamily: "system-ui",
                  }}
                >
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
                </h1>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </Container>
    </>
  );
};

export default Wait;
