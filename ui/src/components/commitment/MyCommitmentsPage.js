import React from "react";
import CheckForMetaMask from '../common/CheckForMetaMask';
import {Tabs, Tab, Button, Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Redirect, BrowserRouter} from 'react-router-dom';




class MyCommitmentsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            pubKey : "",
            commitments: [],
            history: []

        }


        this.handleAddCommitment = this.handleAddCommitment.bind(this);
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

    handleAddCommitment(){
        return <Redirect pubKey={this.state.pubKey} to='newcommitment'/>
    }


    render() {
        return (
            <div className="container">
            <Jumbotron><h1>My Commitments</h1></Jumbotron>
            <Button bsStyle="primary" onClick={this.handleAddCommitment}>Create New Commitment</Button>
            <br/><br/>
            <Tabs id="commitment-tabs"> 
                <Tab eventKey={1} title="Current Commitments">
                    <ListGroup>
                        <ListGroupItem>Item 1</ListGroupItem>
                        <ListGroupItem>Item 2</ListGroupItem>
                        <ListGroupItem>...</ListGroupItem>
                    </ListGroup>
                </Tab>
                <Tab eventKey={2} title="History">
                    <ListGroup>
                        <ListGroupItem>Item 1</ListGroupItem>
                        <ListGroupItem>Item 2</ListGroupItem>
                        <ListGroupItem>...</ListGroupItem>
                    </ListGroup>
                </Tab>
            </Tabs>

            </div>
        );
    }
}

export default MyCommitmentsPage;