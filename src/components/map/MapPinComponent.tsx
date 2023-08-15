import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import { Button, Text, rem } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useAddFavoritePlaceMutation } from "../../hooks/mutations/favorite/useAddFavoritePlaceMutation";
import { useIsFavoriteQuery } from "../../hooks/query/favorite/useIsFavoriteQuery";
import { IonAlert } from "@ionic/react";
import { useRemoveFavoriteMutation } from "../../hooks/mutations/favorite/useRemoveFavoriteMutation";

export const MapPinComponent = ({
  lat,
  lng,
  name,
  vicinity,
}: {
  lat?: number;
  lng?: number;
  name?: string;
  vicinity?: string;
}) => {
  const [windowInfo, setWindowInfo] = useState<boolean>(false);
  const { mutateAsync } = useAddFavoritePlaceMutation();
  const { mutateAsync: deleteFavoritePlace } = useRemoveFavoriteMutation();
  const { data: isFavorite } = useIsFavoriteQuery(lat, lng);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <>
      <IonAlert
        isOpen={isSuccess}
        onDidDismiss={() => setIsSuccess(false)}
        buttons={[
          {
            text: "Aceptar",
            role: "cancel",
          },
        ]}
        header="Agregar a favoritos"
        subHeader="Lugar agregado a favoritos"
        message="Agregado a favoritos"
      />
      <MarkerF
        position={{
          lat: lat ?? 18.4834025,
          lng: lng ?? -69.9296113,
        }}
        onClick={() => setWindowInfo(!windowInfo)}
      />
      {windowInfo && (
        <InfoWindowF
          onCloseClick={() => setWindowInfo(false)}
          position={{
            lat: lat ?? 18.4834025,
            lng: lng ?? -69.9296113,
          }}
        >
          <div>
            <Text color="dark">{name}</Text>
            <Text color="dark">{vicinity}</Text>
            <Button
              fullWidth
              mt={rem(8)}
              leftIcon={<IconHeart />}
              onClick={async () => {
                !isFavorite
                  ? await mutateAsync(
                      {
                        name: name,
                        vicinity: vicinity,
                        lat: lat,
                        lng: lng,
                      },
                      {
                        onSuccess: () => {
                          setIsSuccess(true);
                          setWindowInfo(false);
                        },
                      }
                    )
                  : await deleteFavoritePlace(
                      {
                        name: name,
                      },
                      {
                        onSuccess: () => {
                          setWindowInfo(false);
                        },
                      }
                    );
              }}
              color={isFavorite ? "red" : "cyan"}
            >
              {isFavorite
                ? "Eliminar lugar guardado"
                : "Agregar a lugares guardados"}
            </Button>
          </div>
        </InfoWindowF>
      )}
    </>
  );
};
