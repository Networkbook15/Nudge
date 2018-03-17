import React from "react";
import CheckForMetaMask from '../common/CheckForMetaMask';
import {Button, Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Redirect, BrowserRouter} from 'react-router-dom';
import {nudgeABI, nudgeFactoryABI, RINKEBY_CONTRACT_FACTORY_ADDRESS, INSTANTIATED_CONTRACT_ADDRESS} from '../common/Constants';

class ModeratePage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            pubKey : "",
            commitments: []

        }


    }



    componentWillMount(){
        CheckForMetaMask.then((web3)=>{
            if(web3){              
                web3.eth.getAccounts((err, res) => {
                  const pubKey = res[0];         
                  
                  //Need to look up all contracts that exist for this pub key, set this in commitments
                  this.setState({
                      pubKey: pubKey,
                  });
                });
            }
        });
    }



    render() {
        return (
            <div className="container">
            <Jumbotron><h1>My Moderated Commitments</h1></Jumbotron>
            <ListGroup>
                <ListGroupItem>Item 1</ListGroupItem>
                <ListGroupItem>Item 2</ListGroupItem>
                <ListGroupItem>...</ListGroupItem>
            </ListGroup>
            </div>
        );
    }
}

export default ModeratePage;