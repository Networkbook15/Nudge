import React from "react";

const TrueFalseForm = (props) => {
    return (
      <div>
          <form onSubmit={props.onSubmit} className="form-inline">  
					{props.mainLabel}
					<input 
						className="form-check-input" type="radio" 
						name="inlineRadioOptions" 
						id="inlineRadio1" 
						value="true"
						checked={props.checked === 'true'}
						onChange={props.onChange} 
					/>
					<label className="form-check-label">{props.optionTrueLabel}</label>

					<input 
						className="form-check-input" type="radio" 
						name="inlineRadioOptions" 
						id="inlineRadio2" 
						value="false"
						checked={props.checked === 'false'}
						onChange={props.onChange} 
					/>
					<label className="form-check-label">{props.optionFalseLabel}</label>

					<button className="btn ">Submit</button>
				</form>
      </div>
    );
}

export default TrueFalseForm;
