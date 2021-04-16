import React from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import TopBar from "./shared-components/top-bar/TopBar";
import Login from "./components/login/Login";

function App() {
  return (
      <div className="app-div">
          <TopBar />
          <BrowserRouter>
              <Switch>
                  <Route path="//">
                      <Login />
                  </Route>

                  <Route path="/dashboard">
                      <Dashboard />
                  </Route>

                  <Route path="/update">
                      Forms to update data
                  </Route>

                  <Route path="/graphs">
                      Graphs of historical data
                  </Route>

                  <Route path="*">
                      404
                  </Route>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
