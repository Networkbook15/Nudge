import React from "react";

const InputForm = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit} className="form-inline">
                {props.label}
                <input
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                />
                {props.disabled ? 
                    <button className="btn disabled">Submit</button> :
                    <button className="btn">Submit</button>
                }
            </form>
        </div>
    );
}

export default InputForm;
