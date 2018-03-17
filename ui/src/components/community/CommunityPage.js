import React from "react";
import CheckForMetaMask from '../common/CheckForMetaMask';
import {Label, Tabs, Tab, Button, Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Redirect, BrowserRouter} from 'react-router-dom';
import {contractStateMapping, nudgeABI, nudgeFactoryABI, RINKEBY_CONTRACT_FACTORY_ADDRESS, INSTANTIATED_CONTRACT_ADDRESS} from '../common/Constants';
import asyncLoop from 'node-async-loop';
import Contract from '../contract/Contract'
import {withRouter} from "react-router-dom";


class CommunityPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            commitments: [],
            history: [],
            totalStaked: 0,
            totalForfeited: 0,
            commitmentsCompleted: 0,
            openCommitments : 0

        }

        this.handleListGroupItem = this.handleListGroupItem.bind(this);

    }



    componentWillMount(){
        let commitments = [];
        let totalStaked = 0;
        let totalForfeited = 0;
        let history = [];
        let commitmentsCompleted = 0;
        const myFactory = web3.eth.contract(nudgeFactoryABI);
        const myCommitment = web3.eth.contract(nudgeABI);
        const myFactoryContractInstance = myFactory.at(RINKEBY_CONTRACT_FACTORY_ADDRESS);
        myFactoryContractInstance.getFullList((err, commitmentContractsAddresses)=> {
            asyncLoop(commitmentContractsAddresses, function(contractAddress, next){
                let commitmentItem = {}
                commitmentItem.address = contractAddress;
                
                let myCommitmentInstance = myCommitment.at(contractAddress);
                console.log(myCommitmentInstance)
                myCommitmentInstance.moderator((err, moderatorKey)=>{
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
                                        commitmentsCompleted += 1;
                                        history.push(commitmentItem);
    
                                    }
                                    else{
                                        commitments.push(commitmentItem);
                                    }
    
                                });
                                next();
                            });
                        });

            });


            }, (err)=>{

                if(err){

                }
                else{
                    this.setState({
                        history : history,
                        commitments : commitments,
                        totalStaked : totalStaked,
                        totalForfeited : totalForfeited,
                        commitmentsCompleted: commitmentsCompleted,
                        openCommitments : commitments.length
                    });
                }


            });

          });
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
                <h1>Nudge Community Commitments</h1>
                <h3><Label>Total Staked: {this.state.totalStaked}</Label></h3>
                <h3><Label>Total Forfeited: {this.state.totalForfeited}</Label></h3>
                <h3><Label>Commitments Completed: {this.state.commitmentsCompleted}</Label></h3>
                <h3><Label>Open Commitments: {this.state.openCommitments}</Label></h3>

            </Jumbotron>
            <Tabs id="all-commitment-tabs"> 
                <Tab eventKey={1} title="Current Commitments">
                    <ListGroup>
                        {this.state.commitments.map((commitment,index)=>{
                            return <ListGroupItem key={'commitments'+index} onClick={this.handleListGroupItem.bind(this, commitment.address)}>{commitment.commitment}</ListGroupItem>}
                        )}
                    </ListGroup>
                </Tab>
                <Tab eventKey={2} title="Past Commitments">
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

export default CommunityPage;