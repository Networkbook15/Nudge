import React from "react";
import CheckForMetaMask from '../common/CheckForMetaMask';
import {Label, Tabs, Tab, Button, Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap';
import {contractStateMapping, nudgeABI, nudgeFactoryABI, RINKEBY_CONTRACT_FACTORY_ADDRESS, INSTANTIATED_CONTRACT_ADDRESS} from '../common/Constants';
import asyncLoop from 'node-async-loop';
import Contract from '../contract/Contract'
import {withRouter} from "react-router-dom";

class ModeratePage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            pubKey : "",
            commitments: [],
            history: [],
            totalValueModerated : 0,
            commimentsModerated : 0

        }

        this.handleListGroupItem = this.handleListGroupItem.bind(this);

    }



    componentWillMount(){
        CheckForMetaMask.then((web3)=>{
            if(web3){              
                web3.eth.getAccounts((err, res) => {
                  const pubKey = res[0];
                  
                  let commitments = [];
                  let totalValueModerated = 0;
                  let commimentsModerated = 0;
                  let history = [];
                  const myFactory = web3.eth.contract(nudgeFactoryABI);
                  const myCommitment = web3.eth.contract(nudgeABI);
                  const myFactoryContractInstance = myFactory.at(RINKEBY_CONTRACT_FACTORY_ADDRESS);
                  
                  myFactoryContractInstance.getFullList((err, commitmentContractsAddresses)=> {
                    asyncLoop(commitmentContractsAddresses, function(contractAddress, next){
                        let commitmentItem = {}
                        commitmentItem.address = contractAddress;
                        
                        let myCommitmentInstance = myCommitment.at(contractAddress);
                        myCommitmentInstance.moderator((err, moderatorKey)=>{
                            if(moderatorKey == pubKey){
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
                                    });
                                });
                            }
                            else{
                                next();
                            }
                    });


                    }, (err)=>{

                        if(err){

                        }
                        else{
                            this.setState({
                                pubKey: pubKey,
                                history : history,
                                commitments : commitments,
                                totalValueModerated : totalValueModerated,
                                commimentsModerated : commimentsModerated
                            });
                        }


                    });

                  });


            });
        }
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
                <h1>My Moderated Commitments</h1>
                <h3><Label>Total Value Moderated: {this.state.totalValueModerated}</Label></h3>
                <h3><Label>Commitments Completed: {this.state.commimentsModerated}</Label></h3>
                </Jumbotron>
            <Tabs id="moderator-tabs"> 
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

export default withRouter(ModeratePage);