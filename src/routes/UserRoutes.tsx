import React from "react";
import { Redirect, Route } from "react-router";
import { LoginPage } from "../pages/login/LoginPage";
import { RegisterPage } from "../pages/register/RegisterPage";
import { useAuthenticateContext } from "../context/AuthContext";
import { IonRouterOutlet } from "@ionic/react";
import { LogoutPage } from "../pages/logout/LogoutPage";

export const UserRoutes = () => {
  return (
    <React.Fragment>
      <IonRouterOutlet id="main" animated={false}>
        <Route path="/" exact={true}>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path={"/register"} exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/logout" exact={true}>
          <LogoutPage />
        </Route>
      </IonRouterOutlet>
    </React.Fragment>
  );
};
