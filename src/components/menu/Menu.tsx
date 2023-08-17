import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  cameraOutline,
  cameraSharp,
  home,
  homeOutline,
  mailOutline,
  mailSharp,
  mapOutline,
  mapSharp,
  peopleCircle,
  peopleCircleOutline,
  peopleOutline,
  peopleSharp,
  power,
  powerOutline,
  starOutline,
  starSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useAuthenticateContext } from "../../context/AuthContext";
import { Avatar, Text, rem, useMantineTheme } from "@mantine/core";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  isLogin?: boolean;
}

const appPages: AppPage[] = [
  {
    title: "Iniciar Sesión",
    url: "/login",
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircle,
    isLogin: false,
  },
  {
    title: "Registrarme",
    url: "/register",
    iosIcon: peopleOutline,
    mdIcon: peopleSharp,
    isLogin: false,
  },
  {
    title: "Inicio",
    url: "/home",
    iosIcon: homeOutline,
    mdIcon: home,
    isLogin: true,
  },
  {
    title: "Mapa",
    url: "/map",
    iosIcon: mapOutline,
    mdIcon: mapSharp,
    isLogin: true,
  },
  {
    title: "Lugares guardados",
    url: "/favorites",
    iosIcon: starOutline,
    mdIcon: starSharp,
    isLogin: true,
  },
  {
    title: "Momentos",
    url: "/photos",
    iosIcon: cameraOutline,
    mdIcon: cameraSharp,
    isLogin: true,
  },
  {
    title: "Logout",
    url: "/logout",
    iosIcon: powerOutline,
    mdIcon: power,
    isLogin: true,
  },
];

export const hexToRgb = (hex: string): string | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
};

const Menu: React.FC = () => {
  const location = useLocation();
  const { isAuth, auth } = useAuthenticateContext();
  const theme = useMantineTheme();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {!isAuth && <img src={"/LogoApp.png"} />}
          <IonListHeader>
            <Text color="yellow.8" fw={"bolder"} mb={rem(14)}>
              QuickTravel
            </Text>
          </IonListHeader>
          {isAuth && (
            <Avatar radius={"xl"} ml={rem(8)} mb={rem(8)} size={"lg"}>
              {auth?.email?.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <IonNote>{!isAuth ? "info@quicktravel.com" : auth?.email}</IonNote>
          {appPages
            .filter((x) => (isAuth ? x.isLogin === true : x.isLogin === false))
            .map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={
                      location.pathname === appPage.url ? "selected" : ""
                    }
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                    style={{
                      marginTop: "15px",
                      "--background":
                        location.pathname === appPage.url
                          ? `rgba(${hexToRgb(theme.colors.cyan[7])}, 0.3)`
                          : "transparent",
                    }}
                  >
                    <IonIcon
                      aria-hidden="true"
                      slot="start"
                      ios={appPage.iosIcon}
                      md={appPage.mdIcon}
                      style={{
                        color:
                          location.pathname === appPage.url
                            ? theme.colors.cyan[4]
                            : theme.colors.dark[3],
                      }}
                    />
                    <IonLabel
                      style={{
                        color:
                          location.pathname === appPage.url
                            ? theme.colors.dark[2]
                            : theme.colors.gray[5],
                      }}
                    >
                      {appPage.title}
                    </IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
