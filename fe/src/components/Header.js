import React, { useState } from 'react';
import UIULogo from '../static/uiulogo.png';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Header = ({
  toggle,
}) => {
  return (
    <div>
      <Navbar dark expand="md" style={{ backgroundColor: '#490e4c', padding: '20px 140px' }}>
        <NavbarBrand href="/">
          <img src={UIULogo} alt="UIU" height="70" />
        </NavbarBrand>
        <Collapse isOpen={true} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">
                <h1>Bio-informatics Research Lab</h1>
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink onClick={() => toggle('aboutModal')} style={{ cursor: 'pointer' }}>
                <h5>About</h5>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => toggle('publicationsModal')} style={{ cursor: 'pointer' }}>
                <h5>Publications</h5>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => toggle('contactModal')} style={{ cursor: 'pointer' }}>
                <h5>Contact</h5>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
