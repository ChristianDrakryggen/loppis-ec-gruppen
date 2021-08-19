import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./components/views/Home";
import { Account } from "./components/views/Account";
import { Login } from "./components/views/Login";
import { Register } from "./components/views/Register";
import { Navbar } from "./components/general/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/account" component={Account} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  );
}

export default App;
