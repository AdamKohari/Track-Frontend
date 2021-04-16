import React from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import TopBar from "./shared-components/top-bar/TopBar";

function App() {
  return (
      <React.Fragment>
          <TopBar />
          <BrowserRouter>
              <Switch>
                  <Route path="//">
                      Login screen here
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
              </Switch>
          </BrowserRouter>
      </React.Fragment>
  );
}

export default App;
