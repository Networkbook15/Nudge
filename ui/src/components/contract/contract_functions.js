import React from 'react';
import InputForm from '../forms/input_form';
import TrueFalseForm from '../forms/radio_form';
/*
Is it worth making this a redux-form?

I think this should partly remain as-is so we have a barebones 
contract interaction interface / testing ground

The actual judging and contract creation will need to use forms 
like this though
*/
export default class ContractFunctions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      judgedValidityForm: "true",
      constructorParamsInputVal: "",
      proofInputVal: ""
    };

    this.onConstructorFormSubmit = this.onConstructorFormSubmit.bind(this);
		//this.onProvideProofFormSubmit = this.onProvideProofFormSubmit.bind(this);
		this.onNoProofFormSubmit = this.onNoProofFormSubmit.bind(this);
		this.onDetermineValidityFormSubmit = this.onDetermineValidityFormSubmit.bind(this);
		
		this.handleValidityFormChange = this.handleValidityFormChange.bind(this);
    this.handleConstructorInput = this.handleConstructorInput.bind(this);
    this.handleProofInput = this.handleProofInput.bind(this);
  }

  componentWillMount(){
    if(typeof web3 !== 'undefined'){
      this.web3 = new Web3(web3.currentProvider)
    }
  }

  // OnSubmit Form handling
  //
	onConstructorFormSubmit(event) {
		event.preventDefault();
		console.log("Create Contract Clicked");
  }



	onNoProofFormSubmit(event) {
    event.preventDefault();
    console.log(this.props.ContractInstance)
		console.log("No Proof Provided Clicked");
		this.props.ContractInstance.noProofAfterDeadline({}, function(err, result){
      if (!err){
        console.log(result)
      }
    });
  }

	onDetermineValidityFormSubmit(event) {
		event.preventDefault();
		console.log("Determine Validity (Judgement) Clicked", this.state.judgedValidityForm);
  }
  
  // OnChange Form handlers 
  // 
	handleValidityFormChange(event){
		this.setState({
			'judgedValidityForm': event.target.value
		});
  }
  
  handleConstructorInput(event){
    this.setState({
      'constructorParamsInputVal': event.target.value
    })
  }

  handleProofInput(event){
    this.setState({
      'proofInputVal': event.target.value
    })
  }


  render() {		
    if (this.props.pubKey === this.props.user){
      return (
        <div>
          <InputForm
            onSubmit={this.props.onProvideProofFormSubmit(this.state.proofInputVal)}
            label="Provide Proof"
            placeholder="Proof"
            value={this.state.proofInputVal}
            onChange={this.handleProofInput}
            disabled={false}
          />
        </div>
      );
    }

    if (this.props.pubKey === this.props.moderator) {
      return (
        <div>
				<form onSubmit={this.onNoProofFormSubmit} className="form-inline">  
						<button className="btn">No Proof Provided</button>
				</form>
				<br/>

				<TrueFalseForm
					onSubmit={this.onDetermineValidityFormSubmit}
					mainLabel="Judgement"
					checked={this.state.judgedValidityForm}
					onChange={this.handleValidityFormChange}
					optionTrueLabel="Success"
					optionFalseLabel="Failure"
				/>
      </div>
      )
    }

    else{
      return (
        <div></div>
      )
    }
  }
}
