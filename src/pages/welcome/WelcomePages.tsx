import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Box, Button, Card, Divider, Text, rem } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { useGeolocationContext } from "../../context/GeolocationContext";
export const WelcomePages = () => {
  const { position } = useGeolocationContext();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Box
          display={"flex"}
          mt={"lg"}
          sx={{
            justifyContent: "center",
          }}
        >
          <Card w={"85%"} withBorder shadow="lg">
            <Card.Section p={rem(11)}>
              <Text
                mt={"sm"}
                mb={"xs"}
                fw="bolder"
                size={"lg"}
                color="yellow.9"
              >
                Bienvenid@s a QuickTravel
              </Text>
              <Divider />
            </Card.Section>
            <Card.Section p={rem(12)}>
              <Text size={"md"} fw={500}>
                🌍🚀 ¡Bienvenido a QuickTravel! 🚀🌍 Descubre los lugares
                turísticos más fascinantes cerca de ti con nuestra increíble
                aplicación. 🗺️ Simplemente pulsa el botón "Buscar" 📍 y déjanos
                llevarte a un emocionante viaje para descubrir joyas ocultas,
                restaurantes deliciosos, parques encantadores y mucho más. 🌟✨
                Prepárate para una aventura inolvidable mientras exploras todo
                lo que tu destino tiene para ofrecer. 🌳🏰🍽️🏖️ ¡QuickTravel te
                acompaña en cada paso del camino para asegurarte de que tengas
                una experiencia única y maravillosa! 🌈🌠
                <br />
                position actual : 📍 {position?.coords?.latitude} /{" "}
                {position?.coords?.longitude}
              </Text>

              <Button
                variant="filled"
                onClick={() => (window.location.href = "/map")}
                leftIcon={<IconMapPin />}
                color="cyan.7"
                mt={"md"}
                fullWidth
              >
                Buscar
              </Button>
            </Card.Section>
          </Card>
        </Box>
      </IonContent>
    </IonPage>
  );
};
