import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Box, Button, Text, rem } from "@mantine/core";
import { useGetAllMoments } from "../../../hooks/query/moments/useGetAllMomentQuery";
import { CameraCardComponent } from "../../../components/camera/CameraCardComponent";
import { Moment } from "../../../components/camera/CameraForm";
import { IconMoodHappy } from "@tabler/icons-react";

export const CameraListPage = () => {
  const { data } = useGetAllMoments();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Momentos en Lugares</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Box>
          <Box
            display={"flex"}
            sx={{
              justifyContent: "flex-end",
            }}
            w={"100vw"}
          >
            <Button
              mt={rem(8)}
              variant="filled"
              color="cyan.7"
              leftIcon={<IconMoodHappy />}
              onClick={() => (window.location.href = "/photos/add")}
            >
              Crear Momentos
            </Button>
          </Box>

          {data?.map((moment: Moment) => (
            <Box key={moment.date} m={rem(16)}>
              <CameraCardComponent moment={moment} key={moment.date} />
            </Box>
          ))}
        </Box>
      </IonContent>
    </IonPage>
  );
};
