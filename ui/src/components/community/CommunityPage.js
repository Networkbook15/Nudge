import React from "react";
import CheckForMetaMask from '../common/CheckForMetaMask';
import {Button, Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Redirect, BrowserRouter} from 'react-router-dom';

class CommunityPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            commitments: []

        }


    }



    componentWillMount(){

    }



    render() {
        return (
            <div className="container">
            <Jumbotron><h1>Nudge Community Commitments</h1></Jumbotron>
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