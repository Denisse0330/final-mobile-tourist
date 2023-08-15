import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Menu from "../components/menu/Menu";
import { UserRoutes } from "./UserRoutes";
import { LoggedRoutes } from "./LoggedRoutes";
import { useAuthenticateContext } from "../context/AuthContext";

export const NormalRouter = () => {
  const { isAuth } = useAuthenticateContext();

  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        {isAuth ? <LoggedRoutes /> : <UserRoutes />}
      </IonSplitPane>
    </IonReactRouter>
  );
};
