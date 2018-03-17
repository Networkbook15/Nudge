import React from "react";
import CheckForMetaMask from '../common/CheckForMetaMask';
import {Label, Tabs, Tab, Button, Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Redirect, BrowserRouter} from 'react-router-dom';

import {nudgeABI, nudgeFactoryABI, RINKEBY_CONTRACT_FACTORY_ADDRESS, INSTANTIATED_CONTRACT_ADDRESS} from '../common/Constants';
import {withRouter} from "react-router-dom";

import Contract from '../contract/Contract'


class MyCommitmentsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            pubKey : "",
            commitments: [],
            history: [],
            totalStaked: "",
            totalForfeited: "",
            totalReturned: "",
            commitmentsCompleted: ""

        }


        this.handleAddCommitment = this.handleAddCommitment.bind(this);
    }



    componentWillMount(){
        CheckForMetaMask.then((web3)=>{
            if(web3){              
                web3.eth.getAccounts((err, res) => {
                  const pubKey = res[0];         
                  
                  //Need to look up all contracts that exist for this pub key, set this in commitments
                    let commitments  = []
                    let history = []
                    const MyFactory = web3.eth.contract(nudgeFactoryABI);
                    const MyFactoryContractInstance = MyFactory.at(RINKEBY_CONTRACT_FACTORY_ADDRESS);
                    MyFactoryContractInstance.getContractsList('0xc02b48f6b5847c6d5ac4a2eef3283d7436295788', (err, list)=>{
                        
                        //set history and commitments []
                        console.log(list);
                    });

                  this.setState({
                      pubKey: pubKey,
                      commitments : commitments,
                      history : history
                  });
                });
            }
        });
    }

    handleAddCommitment(){
        this.props.history.push({
            pathname: '/createcontract',
            state: {pubKey : this.state.pubKey}
        })
    }


    render() {
        return (
            <div className="container">
            <Jumbotron>
                <h1>My Commitments</h1>
                <h3><Label>Total Staked: {this.state.totalStaked}</Label></h3>
                <h3><Label>Total Forfeited: {this.state.totalForfeited}</Label></h3>
                <h3><Label>Total Return: {this.state.totalReturned}</Label></h3>
                <h3><Label>Commitments Completed: {this.state.commitmentsCompleted}</Label></h3>
            </Jumbotron>
            <Button bsStyle="primary" onClick={this.handleAddCommitment}>Create New Commitment</Button>
            <br/><br/>
            <Tabs id="commitment-tabs"> 
                <Tab eventKey={1} title="Current Commitments">
                    <ListGroup>
                        <ListGroupItem><Contract contractAddress="0x9ccfe3d7f0e78e726fe5f728ae624ea3009cf4cd"/></ListGroupItem>
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

export default withRouter(MyCommitmentsPage);