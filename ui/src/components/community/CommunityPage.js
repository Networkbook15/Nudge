import React from "react";
import CheckForMetaMask from '../common/CheckForMetaMask';
import {Label, Button, Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Redirect, BrowserRouter} from 'react-router-dom';

class CommunityPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            commitments: [],
            totalStaked: "",
            totalForfeited: "",
            totalReturned: "",
            commitmentsCompleted: ""

        }


    }



    componentWillMount(){

    }



    render() {
        return (
            <div className="container">
            <Jumbotron>
                <h1>Nudge Community Commitments</h1>
                <h3><Label>Total Staked: {this.state.totalStaked}</Label></h3>
                <h3><Label>Total Forfeited: {this.state.totalForfeited}</Label></h3>
                <h3><Label>Total Return: {this.state.totalReturned}</Label></h3>
                <h3><Label>Commitments Completed: {this.state.commitmentsCompleted}</Label></h3>
            </Jumbotron>
            <ListGroup>
                <ListGroupItem>Item 1</ListGroupItem>
                <ListGroupItem>Item 2</ListGroupItem>
                <ListGroupItem>...</ListGroupItem>
            </ListGroup>
            </div>
        );
    }
}

export default CommunityPage;