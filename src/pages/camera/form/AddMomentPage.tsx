import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CameraForm } from "../../../components/camera/CameraForm";

export const AddMomentPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Agregar Momentos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CameraForm />
      </IonContent>
    </IonPage>
  );
};
