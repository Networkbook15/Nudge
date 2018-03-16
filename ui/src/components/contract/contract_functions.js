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
		this.onProvideProofFormSubmit = this.onProvideProofFormSubmit.bind(this);
		this.onNoProofFormSubmit = this.onNoProofFormSubmit.bind(this);
		this.onDetermineValidityFormSubmit = this.onDetermineValidityFormSubmit.bind(this);
		
		this.handleValidityFormChange = this.handleValidityFormChange.bind(this);
    this.handleConstructorInput = this.handleConstructorInput.bind(this);
    this.handleProofInput = this.handleProofInput.bind(this);
  }

  // OnSubmit Form handling
  //
	onConstructorFormSubmit(event) {
		event.preventDefault();
		console.log("Create Contract Clicked");
  }

	onProvideProofFormSubmit(event) {
		event.preventDefault();
		console.log("Provide Proof Clicked");
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
    return(
      <div>
				<InputForm
					onSubmit={this.onConstructorFormSubmit}
					label="Create Contract"
					placeholder="address _referee, address _alternativePayout, string _commitment, uint _durationMinutes"
					value={this.state.constructorParamsInputVal}
					onChange={this.handleConstructorInput}
					disabled={true}
				/>

				<br/>

				<InputForm
					onSubmit={this.onProvideProofFormSubmit}
					label="Provide Proof"
					placeholder="Proof"
					value={this.state.proofInputVal}
					onChange={this.handleProofInput}
					disabled={false}
				/>

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
    );
  }
}
