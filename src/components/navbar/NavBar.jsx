import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Outlet } from 'react-router-dom';
import cl from './NavBar.module.css';
import {useState} from "react";
import {Button} from "react-bootstrap";

function OffcanvasExample() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleLinkClick = () => {
    setShowOffcanvas(false);
  };

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          bg="snow"
          expand={expand}
          className="mb-3"
          className={cl.nv}
          variant="dark"
        >
          <Container fluid>
            <Navbar.Brand href="#">Турнир</Navbar.Brand>
            <Navbar.Toggle
                style={{color: "white"}}
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              onClick={() => setShowOffcanvas(true)}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              show={showOffcanvas}
              onHide={handleOffcanvasClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Меню
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <LinkContainer to="/" onClick={handleLinkClick}>
                    <Nav.Link>Главная</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/form" onClick={handleLinkClick}>
                    <Nav.Link>Регистрация</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/entry" onClick={handleLinkClick}>
                    <Nav.Link>Вход</Nav.Link>
                  </LinkContainer>

                  <NavDropdown
                    title="Виды спорта"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <LinkContainer to="/competitions" onClick={handleLinkClick}>
                      <NavDropdown.Item href="#action3">
                        Настольный теннис
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <Outlet />
    </>
  );
}

export default OffcanvasExample;



