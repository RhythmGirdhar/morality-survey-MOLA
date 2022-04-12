import { Navbar, Nav, Container } from "react-bootstrap";

export const NavBar = (props) => {
  const { nav, setNav } = props;
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#">Morality</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link active={nav === 0} onClick={() => setNav(0)}>
            Take survey
          </Nav.Link>
          <Nav.Link active={nav === 1} onClick={() => setNav(1)}>
            Get responses
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
