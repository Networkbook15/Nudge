import React from "react";
import CheckForMetaMask from '../common/CheckForMetaMask';

class MyCommitmentsPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            pubKey : ""
        }
    }



    componentWillMount(){
        CheckForMetaMask.then((web3)=>{
            if(web3){              
                web3.eth.getAccounts((err, res) => {
                  const pubKey = res[0];                   
                  this.setState({
                      pubKey: pubKey,
                  });
                });
            }
        });
    }

    render() {
        return (
            <div className="container">
                <h1>My Commitments</h1>
            </div>
        );
    }
}

export default MyCommitmentsPage;