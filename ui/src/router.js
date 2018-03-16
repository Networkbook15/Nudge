import React from "react";
import { BrowserRouter, Route, Switch, Redirect, Link, withRouter } from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Contract from "./components/Contract";
import MetaMaskLocked from "./components/MetaMaskLocked";
import Header from "./components/Header";
import JudgingPanel from "./components/JudgingPanel";
import Community from "./components/Community";
import NewCommitment from "./components/NewCommitment";
import MyCommitments from "./components/MyCommitments";



// build the router
const router = (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/contract" component={Contract}/>
        <Route path="/locked" component={MetaMaskLocked}/>

        <Route path="/judging" component={JudgingPanel}/>
        <Route path="/newcommitment" component={NewCommitment}/>
        <Route path="/mycommitments" component={MyCommitments}/>
        <Route path="/community" component={Community}/>

        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  </BrowserRouter>
);

// export
export { router };
