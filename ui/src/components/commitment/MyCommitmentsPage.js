import React from "react";
import CheckForMetaMask from '../common/CheckForMetaMask';
import {Button, Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Redirect, BrowserRouter} from 'react-router-dom';




class MyCommitmentsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            pubKey : "",
            commitments: []

        }


        this.handleAddCommitment = this.handleAddCommitment.bind(this);
    }



    componentWillMount(){
        CheckForMetaMask.then((web3)=>{
            if(web3){              
                web3.eth.getAccounts((err, res) => {
                  const pubKey = res[0];         
                  
                  //Need to look up all contracts that exist for this pub key
                  this.setState({
                      pubKey: pubKey,
                  });
                });
            }
        });
    }

    handleAddCommitment(){
        return <Redirect pubKey={this.state.pubKey} to='newcommitment'/>
    }


    render() {
        return (
            <div className="container">
            <Jumbotron><h1>My Commitments</h1></Jumbotron>
            <Button bsStyle="primary" bsSize="large" onClick={this.handleAddCommitment}>+</Button>
            <ListGroup>
                <ListGroupItem>Item 1</ListGroupItem>
                <ListGroupItem>Item 2</ListGroupItem>
                <ListGroupItem>...</ListGroupItem>
            </ListGroup>
            </div>
        );
    }
}

export default MyCommitmentsPage;