import React, {lazy, Suspense} from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoadingFullPage from "./shared-components/loading-full-page/LoadingFullPage";

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"))
const TopBar = lazy(() => import("./shared-components/top-bar/TopBar"));
const Login =  lazy(() => import ("./components/login/Login"));

function App() {
  return (
      <div className="app-div">
          <BrowserRouter>
              <Switch>
                  <Route path="//">
                      <Suspense fallback={<LoadingFullPage />}>
                          <TopBar />
                          <Login />
                      </Suspense>
                  </Route>

                  <Route path="/dashboard">
                      <Suspense fallback={<LoadingFullPage />}>
                          <TopBar />
                          <Dashboard />
                      </Suspense>
                  </Route>

                  <Route path="/update">
                      <Suspense fallback={<LoadingFullPage />}>
                          <TopBar />
                          Forms to update data
                      </Suspense>
                  </Route>

                  <Route path="/graphs">
                      <Suspense fallback={<LoadingFullPage />}>
                          <TopBar />
                          Graphs of historical data
                      </Suspense>
                  </Route>

                  <Route path="*">
                      <h1>Error 404</h1>
                  </Route>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
