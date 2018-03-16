import React from "react";
import _ from 'lodash';

import ContractTable from './contract/contract_table';
import ContractFunctions from './contract/contract_functions';

const willRinkebyAccount1 = "0xdC0B7b902192AACDd56a52221cC8A146E8da2f54";
const willRinkebyAccount2 = "0x477B431C3B36331050c32712535034F7085E56a1";
const willRinkebyAccount3 = "0xc02B48f6b5847c6d5aC4a2EEf3283D7436295788";

const nudgeABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "verdict",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "user",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "proofProvided",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "proof",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "moderator",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "deadline",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "currentState",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "commitment",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "alternativePayout",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "deadline",
				"type": "uint256"
			}
		],
		"name": "deadlineTime",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_verdict",
				"type": "bool"
			}
		],
		"name": "didCompleteCommitment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "noProofAfterDeadline",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "noProofProvided",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "proof",
				"type": "string"
			}
		],
		"name": "proofHasBeenProvided",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_proof",
				"type": "string"
			}
		],
		"name": "proveCommitment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_user",
				"type": "address"
			},
			{
				"name": "_moderator",
				"type": "address"
			},
			{
				"name": "_alternativePayout",
				"type": "address"
			},
			{
				"name": "_commitment",
				"type": "string"
			},
			{
				"name": "_durationMinutes",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "verdict",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "payout",
				"type": "address"
			}
		],
		"name": "verdictDecided",
		"type": "event"
	}
]

const RINKEBY_CONTRACT_FACTORY_ADDRESS = '0xF8CEfACe50d6Df6d6e37Bb0E8Fbfda8B71f75B35';
const CONTRACT_ADDRESS = "0xb4d07ab520c3b18496d3c267c0fd62a8870917a0";

export default class Contract extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      factoryContractCount: "Loading",


      contractAddress: CONTRACT_ADDRESS,      
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
			const MyContract = web3.eth.contract(disincentiveABI);
			this.state.ContractInstance = MyContract.at(CONTRACT_ADDRESS);
    }
    else {
      this.setState({redirect:true});
    }
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
          referee: result
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


  // TODO: Trim down, need to use events to update instead 
	//			 of just looping
	//	 Eg: Deadline time provided -> update deadline, statemachine
	//	 Eg: Verdict decided -> update verdict, statemachine state
	//
	// Runs every second
  updateState() {
    // Proof Provided State
    this.state.ContractInstance.proofProvided((err, result) => {
      if (result != null){
        this.setState({
          proofProvided: result.toString()
        })
      }
    })  
      
    // Current Verdict (defaults to false)
    this.state.ContractInstance.verdict((err, result) => {
      if (result != null){
        this.setState({
          verdict: result.toString()
        })
      }
    }) 
  
    // Current State-machine/contract state
    this.state.ContractInstance.currentState((err, result) => {
      if (result != null){
        this.setState({
          currentState: result.toString()
        })
      }
    }) 
      
    // Current Time 
    var timeNow = new Date();
    this.setState({
      currentTime: timeNow.toString()
    })
	

		//
		// Contract Emitted Events 
		//
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