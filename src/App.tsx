import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./rootReducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Auth = lazy(() => import("./components/auth/signup/signup"));
const Home = lazy(() => import("./components/home/home"));

function App() {
  const isSignIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Suspense fallback={<p>Loading...</p>}>
              {isSignIn ? <Home /> : <Auth />}              
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
