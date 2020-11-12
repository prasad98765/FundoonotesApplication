import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import signUp from "./Pages/LoginPage/Sign_Up.jsx"
import signIn from "./Pages/LoginPage/Sign_In.jsx"
import forgotPass from "./Pages/LoginPage/Forgot_Pass.jsx"
import resetPass from "./Pages/LoginPage/Reset_Pass.jsx"

import "./App.scss";

class App extends Component {
  render() {
    return (
       <BrowserRouter>
         <Switch>
         <Route path="/" component={signIn} exact = {true} />
           <Route path="/signUp" component={signUp}  />
           <Route path="/forgotPass" component={forgotPass} />
           <Route path="/resetPass" component={resetPass} />
         </Switch>
       </BrowserRouter>
    );
  }
}

export default App;
