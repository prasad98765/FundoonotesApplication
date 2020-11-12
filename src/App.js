import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import signUp from "./Pages/LoginPage/Sign_Up.jsx"
import signIn from "./Pages/LoginPage/Sign_In.jsx"

import "./App.css";

class App extends Component {
  render() {
    return (
       <BrowserRouter>
         <Switch>
           <Route path="/" component={signUp} exact = {true} />
           <Route path="/signIn" component={signIn} />

         </Switch>
       </BrowserRouter>
    );
  }
}

export default App;
