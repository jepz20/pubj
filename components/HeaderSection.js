import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const HeaderSection = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">PubJ</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="https://github.com/jepz20/pubj">Github</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default HeaderSection;
