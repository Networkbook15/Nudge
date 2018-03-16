import React from "react";

const contractStateMapping = [
  'AWAITING_COMMITMENT',
  'AWAITING_COMPLETION', 
  'AWAITING_JUDGING', 
  'SUCCESS',
  'FAILURE'
];

/*
In general, I want this to render all the public variables in the contract
This is not meants to be what the user sees, just an under-the-hood view

TODO: 
  Format Deadline time

*/

const ContractTable = (props) => {
    return (
      <table className="table table-bordered table-hover contract-table">
        <thead>
          <tr>
            <th scope="col">Contract Address</th>
            <th scope="col">{props.state.contractAddress}</th>
          </tr>
        </thead>
      
        <tbody>
          <tr>
            <td>User Address</td>
            <td>{props.state.user}</td>
          </tr>
          <tr>
            <td>Moderator Address</td>
            <td>{props.state.moderator}</td>
          </tr>
          <tr>
            <td>Payout if Fail Address</td>
            <td>{props.state.alternativePayout}</td>
          </tr>
          <tr>
            <td>Commitment</td>
            <td>{props.state.commitment}</td>
          </tr>
          <tr>
            <td>Has proof been provided</td>
            <td>{props.state.proofProvided}</td>
          </tr>
          <tr>
            <td>Current Time</td>
            <td>{props.state.currentTime}</td>
          </tr>
          <tr>
            <td>Deadline</td>
            <td>{props.state.deadline}</td>
          </tr>
          <tr>
            <td>Current State</td>
            <td>{contractStateMapping[props.state.currentState]}</td>
          </tr>
          <tr>
            <td>(Current) Verdict</td>
            <td>{props.state.verdict}</td>
          </tr>
        </tbody>
      </table>
    );
}

export default ContractTable;
