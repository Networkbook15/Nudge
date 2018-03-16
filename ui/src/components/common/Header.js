import React from "react";
import {Nav, Navbar, NavDropdown, MenuItem, NavItem, Image} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Redirect, BrowserRouter} from 'react-router-dom';
import CheckForMetaMask from './CheckForMetaMask';


class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect:false,
      pubKey : ""
    }

    // console.log(window.location.pathname);
  }

  componentDidMount(){
    // NOTE: Have to import web3 in here to check state
    CheckForMetaMask.then((web3)=>{
      if(web3){              
          web3.eth.getAccounts((err, res) => {                   
            this.setState({
                redirect : false,
                pubKey: res[0],
            });
          });
      }
      else{
        this.setState({redirect:true});
      }
    });

  }

  render() {


    if(this.state.redirect){
      return <Redirect to='/locked'/>;
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
          <a href="/"><img src="http://www.iconj.com/ico/s/w/swd92ivv5f.ico"/></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      <Navbar.Collapse>  
    
      <Navbar.Text>
        Signed in as: {this.state.pubKey}
      </Navbar.Text>
      

      <Nav pullRight>
        <LinkContainer to="/community">
            <NavItem eventKey={1}>Community</NavItem>
          </LinkContainer>
          <LinkContainer to="/mycommitments">
            <MenuItem eventKey={2}>My Commitments</MenuItem>
          </LinkContainer>
          <LinkContainer to="/moderate">
          <NavItem eventKey={3}>Moderate</NavItem>         
        </LinkContainer>
      </Nav>
      </Navbar.Collapse>
      </Navbar>    
    );
  }
}


export default Header;