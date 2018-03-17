import React from "react";
import {Form, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

// import consts
import {nudgeABI, nudgeFactoryABI, RINKEBY_CONTRACT_FACTORY_ADDRESS, INSTANTIATED_CONTRACT_ADDRESS, willRinkeby1, willRinkeby2, willRinkeby3} from '../common/Constants';
import {Redirect} from "react-router-dom";
import toastr from 'toastr';
toastr.options = '../common/toastrOptions.js';

class CreateContract extends React.Component {

    constructor(props){
		super(props);
		
        this.state = {
			pubKey: this.props.location.state.pubKey || "",
			commitment: '',
			ethValue: '',
			duration: '',
			moderatorAddress: '',
			payoutAddress: ''
        }

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt){
        const value = evt.target.value;
        
        this.setState({
            [evt.target.id] : value
        });
    }

    componentWillMount(){
        if(typeof web3 !== 'undefined'){
            this.web3 = new Web3(web3.currentProvider)
                
            // import ABI, put contract in state
            const MyFactory = web3.eth.contract(nudgeFactoryABI);
            this.state.FactoryContractInstance = MyFactory.at(RINKEBY_CONTRACT_FACTORY_ADDRESS);

            // console.log(this.state.FactoryContractInstance);
        }
    }

	handleSubmit(){
		console.log(this.state);

		// user, mod, payout, commitment, duration
		this.state.FactoryContractInstance.newCookie(this.state.pubKey, this.state.moderatorAddress, this.state.payoutAddress,
			this.state.commitment, this.state.duration, {from: this.web3.eth.accounts[0], gas: 6500000, value: web3.toWei(this.state.ethValue)},
			function(err, result){
				if (!err){
					console.log(result)
				}
			}			
		);
	}

    render(){
        return(
            <div className="container">
				<h1>New Commitment</h1>
				<br/>
				<Form>
					<FormGroup controlId="pubKey">
						<ControlLabel>Your Wallet Address</ControlLabel>{' '}
						<FormControl value={this.state.pubKey} type="text" placeholder="Ethereum Wallet " />
					</FormGroup>{' '}    
					<FormGroup controlId="commitment">
						<ControlLabel>Commitment</ControlLabel>{' '}
						<FormControl  value={this.state.commitment} onChange={this.handleChange} type="text" placeholder="Describe your commitment here" />
					</FormGroup>{' '}
					<FormGroup controlId="ethValue">
						<ControlLabel>Ethereum</ControlLabel>{' '}
						<FormControl value={this.state.ethValue} onChange={this.handleChange} type="text" placeholder="How much Ethereum you are staking" />
					</FormGroup>{' '}      
					<FormGroup controlId="duration">
						<ControlLabel>Duration</ControlLabel>{' '}
						<FormControl value={this.state.duration} onChange={this.handleChange} type="text" placeholder="Duration in Minutes" />
					</FormGroup>{' '}       
					</Form>
					
					<Form>    
					<FormGroup controlId="moderatorAddress">
						<ControlLabel>Moderator Address</ControlLabel>{' '}
						<FormControl value={this.state.moderatorAddress} onChange={this.handleChange} type="text" placeholder="Ethereum Wallet address of trusted moderator" />
					</FormGroup>{' '} 
					<FormGroup controlId="payoutAddress">
						<ControlLabel>Payout Address</ControlLabel>{' '}
						<FormControl  value={this.state.payoutAddress} onChange={this.handleChange} type="text" placeholder="Ethereum Wallet address to pay if you fail" />
					</FormGroup>{' '}    
					<Button onClick={this.handleSubmit}>Create</Button>
				</Form>
            </div>
        );
    }



}


export default CreateContract;