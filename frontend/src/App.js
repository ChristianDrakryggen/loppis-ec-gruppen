import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./components/views/Home";
import { Account } from "./components/views/Account";
import { Login } from "./components/views/Login";
import { Register } from "./components/views/Register";
import { Navbar } from "./components/general/Navbar";
import { PrivateRoute } from "./hocs/PrivateRoute";
import { UnPrivateRoute } from "./hocs/UnPrivateRoute";
import { Store } from "./components/views/Store";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/store/:id" component={Store} />
      <PrivateRoute path="/account" component={Account} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
    </Router>
  );
}

export default App;
