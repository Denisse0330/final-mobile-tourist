import React from "react";
import { createContext } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage, useSessionStorage } from "@mantine/hooks";

const AuthenticateContext = createContext({
  isAuth: false,
  auth: { email: "", uid: "", photoURL: "", phoneNumber: "" },
  authUser: (authData: any) => {},
  logOut: () => {},
});

export const useAuthenticateContext = () => {
  const context = React.useContext(AuthenticateContext);

  if (!context) {
    throw new Error(
      "useAuthenticateContext debe estar dentro del proveedor AuthenticateContext"
    );
  }

  return context;
};

export const AuthenticateProvider = ({ children }: any) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "light" ? "dark" : "light"));
  };

  const [isAuth, setIsAuth] = useSessionStorage<boolean>({
    key: "isAuth",
    defaultValue: false,
    getInitialValueInEffect: true,
  });

  const [auth, setAuth] = useSessionStorage<any>({
    key: "auth",
    defaultValue: {},
    getInitialValueInEffect: true,
  });

  const authUser = (authData: any) => {
    console.log(authData);
    setIsAuth(true);
    setAuth(authData);
  };

  const logOut = () => {
    setIsAuth(false);
    setAuth({});
  };

  return (
    <React.Fragment>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <AuthenticateContext.Provider
            value={{
              isAuth,
              auth,
              authUser,
              logOut,
            }}
          >
            {children}
          </AuthenticateContext.Provider>
        </MantineProvider>
      </ColorSchemeProvider>
    </React.Fragment>
  );
};
