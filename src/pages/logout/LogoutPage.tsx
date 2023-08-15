import { useEffect } from "react";
import { useLogoutUserMutation } from "../../hooks/mutations/user/useLogoutUserMutation";
import { useAuthenticateContext } from "../../context/AuthContext";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Box, Button, Card, Text, rem } from "@mantine/core";
import { useGeolocationContext } from "../../context/GeolocationContext";

export const LogoutPage = () => {
  const { mutate } = useLogoutUserMutation();

  const { isAuth } = useAuthenticateContext();
  const { position } = useGeolocationContext();

  console.log(position);

  useEffect(() => {
    if (isAuth) {
      mutate();
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Logout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Box
          id="container"
          p={rem(16)}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Card w={"85%"} withBorder shadow="sm">
            <Card.Section p={rem(12)}>
              <Text size="lg" fw={"bolder"}>
                Has cerrado sesión
              </Text>
            </Card.Section>
            <Card.Section>
              <Text size="md" fw={500} mb="4" p={rem(8)}>
                {isAuth
                  ? "Cerrando sesión... 😴"
                  : "¡Gracias por ser un viajero entusiasta con nosotros! 🌟 Esperamos que hayas disfrutado de cada momento en nuestra app. ¡Vuelve pronto para más emocionantes aventuras! 👋"}
              </Text>
            </Card.Section>
            <Button
              fullWidth
              mt="md"
              color="cyan.6"
              disabled={isAuth}
              onClick={() => (window.location.href = "/login")}
            >
              Ir al Login
            </Button>
          </Card>
        </Box>
      </IonContent>
    </IonPage>
  );
};
