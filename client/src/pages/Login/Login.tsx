import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import getGoogleOauthUrl from "../../utils/getGoogleUrl";

function LoginPage() {
  return (
    <>
      <Header />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Row>
          <Col>
            <Card style={{ width: "18rem" }} className="text-center">
              <Card.Body>
                <Card.Title>Welcome</Card.Title>
                <Card.Text>Please login to continue</Card.Text>
                <Button variant="primary">
                  <Link
                    to={getGoogleOauthUrl()}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login with Google
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginPage;
