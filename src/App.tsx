import React, {lazy, Suspense} from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoadingFullPage from "./shared-components/loading-full-page/LoadingFullPage";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddLog from "./components/add/AddLog";
import Graphs from "./components/graphs/Graphs";

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"))
const TopBar = lazy(() => import("./shared-components/top-bar/TopBar"));
const Login =  lazy(() => import ("./components/login/Login"));
const Registration = lazy(() => import("./components/registration/Registration"));
const ProgressCalendar = lazy(() => import('./components/progress-calendar/ProgressCalendar'));

function App() {
  return (
      <div className="app-div">
          <ToastContainer />
          <BrowserRouter>
              <Switch>
                  <Route path="//">
                      <Suspense fallback={<LoadingFullPage />}>
                          <TopBar place="login"/>
                          <Login />
                      </Suspense>
                  </Route>

                  <Route path="/registration">
                      <Suspense fallback={<LoadingFullPage />}>
                          <TopBar place="registration"/>
                          <Registration />
                      </Suspense>
                  </Route>

                  <Route path="/dashboard">
                      <Suspense fallback={<LoadingFullPage />}>
                          <TopBar place="dashboard"/>
                          <Dashboard />
                      </Suspense>
                  </Route>

                  <Route path="/add">
                      <Suspense fallback={<LoadingFullPage />}>
                          <TopBar place="add"/>
                          <AddLog />
                      </Suspense>
                  </Route>

                  <Route path="/graphs">
                      <Suspense fallback={<LoadingFullPage />}>
                          <TopBar place="graphs"/>
                          <Graphs />
                      </Suspense>
                  </Route>

                  <Route path="/progress-calendar">
                      <Suspense fallback={<LoadingFullPage />}>
                          <TopBar place="progress-calendar" />
                          <ProgressCalendar />
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
