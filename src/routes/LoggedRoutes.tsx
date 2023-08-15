import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router";
import { LoginPage } from "../pages/login/LoginPage";
import React from "react";
import { WelcomePages } from "../pages/welcome/WelcomePages";
import { useAuthenticateContext } from "../context/AuthContext";
import { LogoutPage } from "../pages/logout/LogoutPage";
import { MapPages } from "../pages/map/MapPages";
import { FavoritesPage } from "../pages/favorites/FavoritesPage";

export const LoggedRoutes = () => {
  return (
    <React.Fragment>
      <IonRouterOutlet id="main" animated={false}>
        <Route path="/" exact={true}>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact={true}>
          <WelcomePages />
        </Route>
        <Route path={"/map"} exact={true}>
          <MapPages />
        </Route>
        <Route path="/favorites" exact={true}>
          <FavoritesPage />
        </Route>
        <Route path="/logout" exact={true}>
          <LogoutPage />
        </Route>
      </IonRouterOutlet>
    </React.Fragment>
  );
};
