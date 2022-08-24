import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route to="/">
          <Dashboard></Dashboard>
        </Route>
        <Route to="/login">
          <Login></Login>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
