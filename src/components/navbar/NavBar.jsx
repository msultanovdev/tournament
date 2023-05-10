import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import cl from './NavBar.module.css';
import {useContext, useState} from "react";
import { Context } from '../..';

function OffcanvasExample() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const {store} = useContext(Context);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setShowOffcanvas(false);
  };

  const handleLeaveClick = () => {
    setShowOffcanvas(false);
    store.isAuth = false;
    store.role = "";
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
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
          className={`${cl.nv}`}
          variant="dark"
        >
          <Container fluid>
            <Navbar.Brand><Link to="/" style={{color: "white"}}>Турнир</Link></Navbar.Brand>
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
                  {!store.isAuth && <LinkContainer to="/form" onClick={handleLinkClick}>
                    <Nav.Link>Регистрация</Nav.Link>
                  </LinkContainer>}
                  {!store.isAuth && <LinkContainer to="/login" onClick={handleLinkClick}>
                    <Nav.Link>Вход</Nav.Link>
                  </LinkContainer>}
                  {store.isAuth && <LinkContainer to="/account" onClick={handleLinkClick}>
                    <Nav.Link>Личный Кабинет</Nav.Link>
                  </LinkContainer>}
                  {store.isAuth && <LinkContainer to="/" onClick={handleLeaveClick}>
                    <Nav.Link>Выйти</Nav.Link>
                  </LinkContainer>}
                  

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



