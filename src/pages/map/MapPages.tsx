import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLoadScript } from "@react-google-maps/api";
import { IconArrowBack } from "@tabler/icons-react";
import { API_MAP_KEY } from "../../config/map.config";
import { MapContainerComponent } from "../../components/map/MapContainer";

export const MapPages = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_MAP_KEY,
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mapa (Position Actual)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <MapContainerComponent isLoaded={isLoaded} />
      </IonContent>
    </IonPage>
  );
};
