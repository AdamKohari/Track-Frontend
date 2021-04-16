import React, {lazy, Suspense} from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"))
const TopBar = lazy(() => import("./shared-components/top-bar/TopBar"));
const Login =  lazy(() => import ("./components/login/Login"));

function App() {
  return (
      <div className="app-div">
          <BrowserRouter>
              <Switch>
                  <Route path="//">
                      <Suspense fallback={<div>Loading...</div>}>
                          <TopBar />
                          <Login />
                      </Suspense>
                  </Route>

                  <Route path="/dashboard">
                      <Suspense fallback={<div>Loading...</div>}>
                          <TopBar />
                          <Dashboard />
                      </Suspense>
                  </Route>

                  <Route path="/update">
                      <Suspense fallback={<div>Loading...</div>}>
                          <TopBar />
                          Forms to update data
                      </Suspense>
                  </Route>

                  <Route path="/graphs">
                      <Suspense fallback={<div>Loading...</div>}>
                          <TopBar />
                          Graphs of historical data
                      </Suspense>
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
