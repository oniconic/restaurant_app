import React from "react";
import { Route, Switch } from "react-router-dom";
import Error404 from "./pages/Error404";
import Header from "./pages/Header";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="bg-gray-50 h-screen w-full">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </div>
  );
}
