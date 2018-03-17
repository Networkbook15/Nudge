import React from "react";
import _ from 'lodash';

import ContractTable from './contract/contract_table';
import ContractFunctions from './contract/contract_functions';

// import constants 
import {nudgeABI, nudgeFactoryABI, RINKEBY_CONTRACT_FACTORY_ADDRESS, INSTANTIATED_CONTRACT_ADDRESS} from '../components/common/Constants';

export default class Contract extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      factoryContractCount: "Loading",
      contractAddress: this.props.contractAddress,      
      user: "Loading...",
      moderator: "Loading...",
      alternativePayout: "Loading...",
      commitment: "Loading...",
      deadline: "Loading...",
      proof: "Loading...",
      verdict: "Loading...",
      proofProvided: "Loading...",
      currentState: "Loading...",
      currentTime: "Loading...",
      deadline: "Loading...",
      redirect:false     
    }
  }

  componentDidMount(){
    if(typeof web3 !== 'undefined'){
      console.log("Using web3 detected from external source like Metamask")
			this.web3 = new Web3(web3.currentProvider)
      this.setState({redirect:false});
      
			// import ABI, put contract in state
			const MyContract = web3.eth.contract(nudgeABI);
			this.state.ContractInstance = MyContract.at(this.props.contractAddress);
    }
    else {
      this.setState({redirect:true});
		}

		// Need to do once
		this.updateUserAddressState();
		this.updateAlternativePayoutAddressState();
		this.updateCommitmentState();
		this.updateDeadlineState();
		this.updateModeratorAddressState();
		this.updateProofProvided();
		this.updateVerdict();
		this.updateContractStateMachine();
			
		// Will be updated every second
		this.updateState();
		setInterval(this.updateState.bind(this), 1000);
	}

	// Contract Emitted Events 
	componentWillUpdate() {
    this.state.ContractInstance.deadlineTime([], [], function(error, result){
      console.log("Event! Deadline Time Provided!")
      if (!error){
        console.log(result)
      }
    });
    
    // Throws an error bc variable and function have the same name!
    this.state.ContractInstance.proofHasBeenProvided([], [], function(error, result){
      console.log("Event! Proof Provided!")
      if (!error){
        console.log(result)
      }
    });
  
    this.state.ContractInstance.noProofProvided([], [], function(error, result){
      console.log("Event! No Proof Provided!")
      if (!error){
        console.log(result)
      }
    });
  
    this.state.ContractInstance.verdictDecided([], [], function(error, result){
      console.log("Event! Verdict Decided!")
      if (!error){
        console.log(result)
      }
    });
	}

  // User Address State
  updateUserAddressState(){
    this.state.ContractInstance.user((err, result) => {
      if (result != null){
        this.setState({
          user: result
        })
      }
    })
  }
  
  // Moderator Address State
  updateModeratorAddressState(){
    this.state.ContractInstance.moderator((err, result) => {
      if (result != null){
        this.setState({
          moderator: result
        })
      }
    })
  }
  
  // Alternative Payout Address State
  updateAlternativePayoutAddressState(){
    this.state.ContractInstance.alternativePayout((err, result) => {
      if (result != null){
        this.setState({
          alternativePayout: result
        })
      }
    })
  }
  
  // commitment State
  updateCommitmentState(){
    this.state.ContractInstance.commitment((err, result) => {
      if (result != null){
        this.setState({
          commitment: result
        })
      }
    })
  }
  
  // Deadline State
  updateDeadlineState(){
    this.state.ContractInstance.deadline((err, result) => {
      if (result != null){
        this.setState({
          deadline: result.toString()
        })
      }
    }); 
  }

	// Proof Provided State
	updateProofProvided(){
		this.state.ContractInstance.proofProvided((err, result) => {
			if (result != null){
				this.setState({
					proofProvided: result.toString()
				})
			}
		})  
	}

	// Current Verdict (defaults to false)
	updateVerdict(){
		this.state.ContractInstance.verdict((err, result) => {
			if (result != null){
				this.setState({
					verdict: result.toString()
				})
			}
		}) 
	}

	// Current State-machine/contract state
	updateContractStateMachine(){
		this.state.ContractInstance.currentState((err, result) => {
			if (result != null){
				this.setState({
					currentState: result.toString()
				})
			}
		})
	} 


  updateState() {      
    // Current Time 
    var timeNow = new Date();
    this.setState({
      currentTime: timeNow.toString()
    })
  }
  


  render() {
    return (
        <div className="container">
            <h1>Contract</h1>
            <ContractTable state={this.state}/>
            <ContractFunctions ContractInstance={this.state.ContractInstance}/> 
        </div>
    );
  }
}

