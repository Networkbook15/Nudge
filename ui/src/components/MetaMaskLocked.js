import React from "react";
import {Image, Alert, Button} from "react-bootstrap"

// Reach page if metamask is locked
class MetaMaskLocked extends React.Component {
  constructor(props, context){
    super(props, context);
    
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: true
    };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if (this.state.show) {
      return (
        <div className="container">
          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
            <h4>You don't have MetaMask!</h4>
            <p>
              You can install the MetaMask browser extension by clicking the orange button below
            </p>
          </Alert>

          <div className="container" style={{width: '200px'}}>
            <a href="https://metamask.io/">
              <Image responsive src="https://raw.githubusercontent.com/MetaMask/faq/master/images/download-metamask.png"/>
            </a>
          </div>
        </div>
      );
    }
    <div className="container">
      return <Button onClick={this.handleShow}>Show Alert</Button>;
    </div>
  }
}

export default MetaMaskLocked;