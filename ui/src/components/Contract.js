import React from "react";
import _ from 'lodash';

import {Redirect} from 'react-router-dom';

const willRinkebyAccount1 = "0xdC0B7b902192AACDd56a52221cC8A146E8da2f54";
const willRinkebyAccount2 = "0x477B431C3B36331050c32712535034F7085E56a1";
const willRinkebyAccount3 = "0xc02B48f6b5847c6d5aC4a2EEf3283D7436295788";


export default class Contract extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect:false
    }
  }

  componentDidMount(){
    // NOTE: Have to import web3 in here to check state
    if(typeof web3 !== 'undefined'){
      console.log("Using web3 detected from external source like Metamask")
      this.web3 = new Web3(web3.currentProvider)
      this.setState({redirect:false});
    }
    else{
      this.setState({redirect:true});
    }
  }

  render() {
    if (this.state.redirect) {
			return <Redirect to='/locked'/>;
    }
    
    return (
        <div className="container">
            <h1>Contract</h1>
        </div>
    );
  }
}