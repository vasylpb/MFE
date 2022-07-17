import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingPage = lazy(() => import("./components/MarketingApp"));
const AuthPage = lazy(() => import("./components/AuthApp"));
const DashboardPage = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  production: "co",
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth" component={AuthPage}>
                <AuthPage onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardPage />
              </Route>
              <Route path="/" component={MarketingPage} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
