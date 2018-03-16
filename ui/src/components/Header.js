import React from "react";
import {Nav, Navbar, NavDropdown, MenuItem, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const dummyPublicKey = '0xc02B48f6b5847c6d5aC4a2EEf3283D7436295788';

const Header = (props) => {
  return (
    <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Nudge</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>  
    
    <Navbar.Text>
      Signed in as: {dummyPublicKey}
    </Navbar.Text>
      

    <Nav pullRight>
      <LinkContainer to="/judging">
        <NavItem eventKey={1}>Judging Panel</NavItem>         
      </LinkContainer>
      <NavDropdown eventKey={2} title="Commitments" id="basic-nav-dropdown">
        <LinkContainer to="/newcommitment">
          <MenuItem eventKey={2.1}> New Commitment</MenuItem>
        </LinkContainer>
        <MenuItem divider />
        <LinkContainer to="/mycommitments">
          <MenuItem eventKey={2.2}>My Commitments</MenuItem>
        </LinkContainer>
      </NavDropdown>
        <LinkContainer to="/community">
          <NavItem eventKey={3}>Community</NavItem>
        </LinkContainer>
      </Nav>


    </Navbar.Collapse>
    </Navbar>    
  );
}

export default Header;