import React from "react";
import {Nav, Navbar, NavDropdown, MenuItem, NavItem, Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Redirect, BrowserRouter} from 'react-router-dom';


class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect:false,
      pubkey : ""
    }

    // console.log(window.location.pathname);
  }

  componentDidMount(){
    // NOTE: Have to import web3 in here to check state
    if(typeof web3 !== 'undefined'){
      console.log("Using web3 detected from external source like Metamask")
      this.web3 = new Web3(web3.currentProvider)
      this.setState({redirect:false});
      this.web3.eth.getAccounts((err, res) =>{
        this.setState({
          pubkey : res[0]
        })
      })


    }
    else{
      this.setState({redirect:true});
    }
  }

  render() {


    if(this.state.redirect){
      return <Redirect to='/locked'/>;
    }

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
        Signed in as: {this.state.pubkey}
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
}


export default Header;