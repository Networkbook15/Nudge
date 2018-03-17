import React from "react";
import CheckForMetaMask from '../common/CheckForMetaMask';
import {Label, Tabs, Tab, Button, Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap';
import {contractStateMapping, nudgeABI, nudgeFactoryABI, RINKEBY_CONTRACT_FACTORY_ADDRESS, INSTANTIATED_CONTRACT_ADDRESS} from '../common/Constants';
import {withRouter} from "react-router-dom";
import asyncLoop from 'node-async-loop';
import Contract from '../contract/Contract'


class MyCommitmentsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            pubKey : "",
            commitments: [],
            history: [],
            totalStaked: 0,
            totalForfeited: 0,
            totalReturned: 0,
            commitmentsCompleted: 0

        }


        this.handleAddCommitment = this.handleAddCommitment.bind(this);
        this.handleListGroupItem = this.handleListGroupItem.bind(this);
    }



    componentWillMount(){
        CheckForMetaMask.then((web3)=>{
            if(web3){              
                web3.eth.getAccounts((err, res) => {
                  const pubKey = res[0];         
                  
                    //Need to look up all contracts that exist for this pub key, set this in commitments
                    let commitments  = []
                    let history = []
                    let totalStaked = 0;
                    let totalForfeited = 0;
                    let totalReturned = 0;
                    let commitmentsCompleted = 0;

                    const myFactory = web3.eth.contract(nudgeFactoryABI);
                    const myCommitment = web3.eth.contract(nudgeABI);
                    const myFactoryContractInstance = myFactory.at(RINKEBY_CONTRACT_FACTORY_ADDRESS);
                    myFactoryContractInstance.getContractsList(this.state.pubKey, (err, contractsAddresses)=>{


                        asyncLoop(contractsAddresses, function(contractAddress, next){

                            let commitmentItem = {}
                            commitmentItem.address = contractAddress;
                            
                            let myCommitmentInstance = myCommitment.at(contractAddress);
                            myCommitmentInstance.commitment((err,c)=>{
                                commitmentItem.commitment = c;
                                myCommitmentInstance.deadline((err, d)=>{
                                    //Need to handle date here 
                                    commitmentItem.deadline = d;
                                    myCommitmentInstance.currentState((err,result)=>{
                                        if(err) next(err);
                                        let state = parseInt(result.toString());
                                        if(contractStateMapping[state] == 'SUCCESS') {
                                            commitmentsCompleted += 1;
                                            history.push(commitmentItem);
                                        }
                                        else if(contractStateMapping[state] == 'FAILURE'){
                                            history.push(commitmentItem);
        
                                        }
                                        else{
                                            commitments.push(commitmentItem);
                                        }
        
                                    });
                                    next();
                                })
                            });
                        }, (err)=>{
                            if(err){



                            }
                            else{
                                this.setState({
                                    pubKey : pubKey,
                                    commitments : commitments,
                                    history : history,
                                    totalForfeited : totalForfeited,
                                    totalReturned : totalReturned,
                                    totalStaked : totalStaked
                                })
                            }
                        })





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

    handleListGroupItem(address){
        this.props.history.push({
            pathname: '/contract',
            state : {contractAddress :address}
        });
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
                        {this.state.commitments.map((commitment,index)=>{
                            return <ListGroupItem key={'commitments'+index} onClick={this.handleListGroupItem.bind(this, commitment.address)}>{commitment.commitment}</ListGroupItem>}
                        )}
                    </ListGroup>
                </Tab>
                <Tab eventKey={2} title="History">
                    <ListGroup>
                    {this.state.history.map((history,index)=>{
                            return <ListGroupItem key={'history' + index} onClick={this.handleListGroupItem.bind(this, history.address)}>{history.commitment}</ListGroupItem>}
                    )}
                    </ListGroup>
                </Tab>
            </Tabs>

            </div>
        );
    }
}

export default withRouter(MyCommitmentsPage);