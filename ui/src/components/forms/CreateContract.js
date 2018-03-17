import React from "react";
import {Form, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';



class CreateContract extends React.Component {

    constructor(props){
        super(props);

        this.state = {


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


    }


    componentWillReceiveProps(){




    }







    render(){
        return(
            <div>
        <Form inline>
        <FormGroup controlId="name">
            <ControlLabel>Product Name</ControlLabel>{' '}
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