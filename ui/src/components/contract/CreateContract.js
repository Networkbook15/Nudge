import React from "react";
import {Form, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';


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
		"name": "handlePayment",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
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
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
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
const nudgeFactoryABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "key",
				"type": "address"
			}
		],
		"name": "getContractsList",
		"outputs": [
			{
				"name": "contractsList",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "key",
				"type": "address"
			}
		],
		"name": "getContractCount",
		"outputs": [
			{
				"name": "contractCount",
				"type": "uint256"
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
				"name": "c",
				"type": "address"
			}
		],
		"name": "newContractMade",
		"type": "event"
	},
	{
		"constant": false,
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
		"name": "newCookie",
		"outputs": [
			{
				"name": "newContract",
				"type": "address"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
]

const RINKEBY_CONTRACT_FACTORY_ADDRESS = '0x1DF4a755947530aA81eEC403dA84FcE3E671c3ec';
const INSTANTIATED_CONTRACT_ADDRESS = '0x17e205837a0ffaec6197b946aff5a08a5456f64f';
// instantiated should have 0.0993 ETH

class CreateContract extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            pubKey: this.props.pubKey
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt){
        const value = evt.target.value;
        
        this.setState({
            [evt.target.id] : value
        });
    }

    componentWillMount(){
        if(typeof web3 !== 'undefined'){
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
                
            // import ABI, put contract in state
            const MyFactory = web3.eth.contract(nudgeFactoryABI);
            this.state.FactoryContractInstance = MyFactory.at(RINKEBY_CONTRACT_FACTORY_ADDRESS);

            console.log(this.state.FactoryContractInstance);

            
            this.state.FactoryContractInstance.getContractsList( function(error, result){
                if (!error){
                  console.log(result)
                }
            });
        }
    }





    render(){
        return(
            <div>
        <Form inline>
        <FormGroup controlId="name">
            <ControlLabel>Your Address</ControlLabel>{' '}
            <FormControl value={this.state.name}  onChange={this.handleChange} type="text" placeholder="Name" />
        </FormGroup>{' '}    
        <FormGroup controlId="quantity">
            <ControlLabel>Quantity</ControlLabel>{' '}
            <FormControl  value={this.state.Quantity} onChange={this.handleChange} type="text" placeholder="Quantity" />
        </FormGroup>{' '}
        <FormGroup controlId="startingPrice">
            <ControlLabel>Starting Price</ControlLabel>{' '}
            <FormControl value={this.state.startingPrice} onChange={this.handleChange} type="text" placeholder="Price" />
        </FormGroup>{' '}      
        <FormGroup controlId="duration">
            <ControlLabel>Duration</ControlLabel>{' '}
            <FormControl value={this.state.duration} onChange={this.handleChange} type="text" placeholder="Duration in Minutes" />
        </FormGroup>{' '}       
        </Form>
        
        <Form>    
        <FormGroup controlId="trustedRedeemer">
            <ControlLabel>Trusted Redeemers</ControlLabel>{' '}
            <FormControl value={this.state.trustedRedeemer} onChange={this.handleRedeemersChange} type="text" placeholder="Addresses of trusted redeemer" />
        </FormGroup>{' '} 
        <FormGroup controlId="payoutAddress">
            <ControlLabel>Payout Address</ControlLabel>{' '}
            <FormControl  value={this.state.payoutAddress} onChange={this.handleChange} type="text" placeholder="Payout Address" />
        </FormGroup>{' '}    
        <Button onClick={this.handleSubmit}>Create</Button>
        </Form>



            </div>
        );
    }



}


export default CreateContract;