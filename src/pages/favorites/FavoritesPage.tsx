import { Box, Button, Card, Grid, Text, rem } from "@mantine/core";
import { useGetFavoritePlacesQuery } from "../../hooks/query/favorite/useGetFavoritePlaces";
import { useRemoveFavoriteMutation } from "../../hooks/mutations/favorite/useRemoveFavoriteMutation";
import { FavoriteCardComponent } from "../../components/favorites/FavoriteCardComponent";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IconHeartBroken } from "@tabler/icons-react";

export const FavoritesPage = () => {
  const { data: favoritePlaces } = useGetFavoritePlacesQuery();
  const { mutate } = useRemoveFavoriteMutation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Lugares guardados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {favoritePlaces?.length === 0 ? (
          <Box
            mt={rem(24)}
            display={"flex"}
            sx={{
              justifyContent: "center",
            }}
          >
            <Card shadow="md" withBorder w={"85%"}>
              <Card.Section bg={"cyan"} p={rem(8)}>
                <Text color="gray.0" fw={"bolder"}>
                  Favoritos
                </Text>
              </Card.Section>
              <Box>
                <Card.Section p={rem(8)}>
                  <Text size={"md"}>
                    <IconHeartBroken
                      style={{
                        position: "relative",
                        top: "5px",
                        // Add the color red.7 to the icon
                        color: "#ff0000",
                      }}
                      size={24}
                    />{" "}
                    No hay lugares guardados
                  </Text>

                  <Button
                    fullWidth
                    onClick={() => (window.location.href = "/map")}
                    color="cyan"
                    variant="filled"
                    mt={"md"}
                  >
                    <Text size={"md"}>Buscar lugares</Text>
                  </Button>
                </Card.Section>
              </Box>
            </Card>
          </Box>
        ) : (
          <Grid p={rem(15)}>
            {favoritePlaces?.map((place: any) => {
              return (
                <FavoriteCardComponent
                  place={place}
                  onRemoveFavorite={() => mutate(place)}
                  key={place.name}
                />
              );
            })}
          </Grid>
        )}
      </IonContent>
    </IonPage>
  );
};
