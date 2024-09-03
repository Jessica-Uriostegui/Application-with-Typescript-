import {useState} from "react";
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navigationBar.css';

function NavigationBar() {

  const[expanded, setExpanded] = useState(false);

  const handleToggle = () =>  setExpanded(expanded ? false : 'expanded');
  const handleSelect = () =>  setExpanded(false);
  
  const { user, isAuthenticated } = useAuth0();
  return (
    <Navbar  bg='light' expand="lg" expanded={expanded} onToggle={handleToggle}>
      <Navbar.Brand href="/">Bobalicious</Navbar.Brand>
      <div className="d-flex align-items-center ms-auto">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {isAuthenticated ? (
              <>
                <Navbar.Text className="mx-3">
                  Signed in as:  <a href="/profile">{user?.name}</a>
                </Navbar.Text>
                <LogoutButton />
              </>
            ) : (
              <LoginButton />
            )}
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/" onClick={handleSelect}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-customer/" onClick={handleSelect}>
              Add Customers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/customers" onClick={handleSelect}>
              Customers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-product" onClick={handleSelect}>
              Add Product
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" onClick={handleSelect}>
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/orders" onClick={handleSelect}>
              Orders
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-order" onClick={handleSelect}>
              Add Order
            </Nav.Link>
          </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


export default NavigationBar; 