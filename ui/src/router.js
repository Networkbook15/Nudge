import React from "react";
import { BrowserRouter, Route, Switch, Redirect, Link, withRouter } from "react-router-dom";
import App from "./components/App";
import Home from "./components/common/Home";
import NotFound from "./components/common/NotFound";
import Contract from "./components/Contract";
import MetaMaskLocked from "./components/common/MetaMaskLocked";
import Header from "./components/common/Header";
import ModeratePage from "./components/moderate/ModeratePage";
import CommunityPage from "./components/community/CommunityPage";
import MyCommitmentsPage from "./components/commitment/MyCommitmentsPage";



// build the router
const router = (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/contract" component={Contract}/>
        <Route path="/locked" component={MetaMaskLocked}/>

        <Route path="/moderate" component={ModeratePage}/>
        <Route path="/mycommitments" component={MyCommitmentsPage}/>
        <Route path="/community" component={CommunityPage}/>

        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  </BrowserRouter>
);

// export
export { router };
