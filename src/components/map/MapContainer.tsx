import {
  GoogleMap,
  InfoBoxF,
  InfoWindowF,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { API_MAP_KEY } from "../../config/map.config";
import { Box, Button, LoadingOverlay, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { Geolocation, Position } from "@capacitor/geolocation";
import { useGetNearPlacesQuery } from "../../hooks/query/tourist/useGetNearPlacesQuery";
import { IconMapCheck } from "@tabler/icons-react";
import { MapPinComponent } from "./MapPinComponent";

interface MapContainerProps {
  isLoaded: boolean;
}

export const MapContainerComponent = ({ isLoaded }: MapContainerProps) => {
  const [actualPosition, setPosition] = useState<Position | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(
    undefined
  );
  const [myLocationBox, setMyLocationBox] = useState<boolean>(false);
  const { data: places, isLoading } = useGetNearPlacesQuery(
    actualPosition?.coords?.latitude ?? 18.4834025,
    actualPosition?.coords?.longitude ?? -69.9296113,
    API_MAP_KEY,
    nextPageToken
  );

  useEffect(() => {
    const getLocation = async () => {
      const position = await Geolocation.getCurrentPosition();
      setPosition(position);
    };

    getLocation();
  }, []);

  return !isLoaded ? (
    <LoadingOverlay visible={!isLoaded} />
  ) : (
    <Box pos={"absolute"} w={"100%"}>
      <Button
        pos={"relative"}
        onClick={() => setNextPageToken(places?.data?.next_page_token)}
        leftIcon={<IconMapCheck />}
        fullWidth
      >
        Obtener más lugares cercanos
      </Button>
      {isLoading && <LoadingOverlay visible={isLoading} />}
      <GoogleMap
        center={{
          lat: actualPosition?.coords?.latitude ?? 18.4834025,
          lng: actualPosition?.coords?.longitude ?? -69.9296113,
        }}
        zoom={10}
        mapContainerStyle={{
          width: "100%",
          height: "100vh",
        }}
      >
        <MarkerF
          position={{
            lat: actualPosition?.coords.latitude ?? 18.4834025,
            lng: actualPosition?.coords.longitude ?? -69.9296113,
          }}
          onClick={() => setMyLocationBox(!myLocationBox)}
          //Icon Map actual position (blue dot) in google maps
          icon={{
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAF96VFh0UmF3IHByb2ZpbGUgdHlwZSBBUFAxAABo3uNKT81LLcpMVigoyk/LzEnlUgADYxMuE0sTS6NEAwMDCwMIMDQwMDYEkkZAtjlUKNEABZgamFmaGZsZmgMxiM8FAEi2FMnxHlGkAAADqElEQVRo3t1aTWgTQRQOiuDPQfHs38GDogc1BwVtQxM9xIMexIN4EWw9iAehuQdq0zb+IYhglFovClXQU+uhIuqh3hQll3iwpyjG38Zkt5uffc4XnHaSbpLZ3dnEZOBB2H3z3jeZN+9vx+fzYPgTtCoQpdVHrtA6EH7jme+/HFFawQBu6BnWNwdGjB2BWH5P32jeb0V4B54KL5uDuW3D7Y/S2uCwvrUR4GaEuZABWS0FHhhd2O4UdN3FMJneLoRtN7Y+GMvvUw2eE2RDh3LTOnCd1vQN5XZ5BXwZMV3QqQT84TFa3zuU39sy8P8IOqHb3T8fpY1emoyMSQGDI/Bwc+0ELy6i4nLtepp2mE0jc5L3UAhMsdxut0rPJfRDN2eMY1enF8Inbmj7XbtZhunkI1rZFD/cmFMlr1PFi1/nzSdGkT5RzcAzvAOPU/kVF9s0ujqw+9mP5QgDmCbJAV7McXIeGpqS3Qg7OVs4lTfMD1Yg9QLR518mZbImFcvWC8FcyLAbsev++3YETb0tn2XAvouAvjGwd14YdCahUTCWW6QQIzzDO/CIAzKm3pf77ei23AUkVbICHr8pnDZNynMQJfYPT7wyKBzPVQG3IvCAtyTsCmRBprQpMawWnkc+q2Rbn+TK/+gmRR7qTYHXEuZkdVM0p6SdLLYqX0LItnFgBxe3v0R04b5mGzwnzIUMPiBbFkdVmhGIa5tkJ4reZvyl4Rg8p3tMBh+FEqUduVRUSTKTnieL58UDG76cc70AyMgIBxs6pMyIYV5agKT9f/ltTnJFOIhuwXOCLD6gQ/oc8AJcdtuYb09xRQN3NWULgCwhfqSk3SkaBZViRTK3EYNUSBF4Hic0Y8mM+if0HhlMlaIHbQ8Z5lszxnGuIP2zrAw8J8jkA7pkMAG79AKuPTOOcgWZeVP5AsSDjAxWegGyJoSUWAj/FBpRa0JiviSbfldMqOMPcce7UVeBLK4gkMVVBLI2phLjKlIJm8lcxMNkLuIomXOTTmc1kwYf2E+nMQdzlaTTKgoaZJWyBQ141RY0DkrK6XflAQbih1geZnhJeXu5WeEZ3mVqSkrIgCzXJaXqoh65TUuLerdtFXgQ2bYKeD1pq6hobLE86SlztXMWvaA5vPO0sYWB9p2K1iJS4ra0Fju/udsN7fWu+MDRFZ+YuuIjX1d8Zu2OD92WC9G3ub1qABktBV7vssfBMX1L7yVjZ7PLHuABb9svezS7boNDyK/b4LdX123+Au+jOmNxrkG0AAAAAElFTkSuQmCC",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
        {myLocationBox && (
          <InfoWindowF
            position={{
              lat: actualPosition?.coords.latitude ?? 18.4834025,
              lng: actualPosition?.coords.longitude ?? -69.9296113,
            }}
            onCloseClick={() => setMyLocationBox(false)}
          >
            <div>
              <Text color="dark">My Location</Text>
            </div>
          </InfoWindowF>
        )}

        {places?.data?.results.map((place: any) => {
          return (
            <MapPinComponent
              key={`${place.geometry.location.lat} ${place.geometry.location.lng}`}
              lat={place.geometry.location.lat}
              lng={place.geometry.location.lng}
              name={place.name}
              vicinity={place.vicinity}
            />
          );
        })}
      </GoogleMap>
    </Box>
  );
};
