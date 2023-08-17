import { useCallback, useState } from "react";
import {
  useCamera,
  availableFeatures,
} from "@capacitor-community/camera-react";
import { CameraResultType, CameraSource } from "@capacitor/camera";
import { CameraInput } from "../inputs/CameraInput";
import { Box, Button, Card, rem, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useAddMomentMutation } from "../../hooks/mutations/moments/useAddMomentMutation";

export type Moment = {
  photo: string | undefined;
  date: string;
  location: string;
  tags: string[];
};

export const CameraForm = () => {
  const [moment, setMoment] = useState<Moment>({
    photo: "",
    date: Date.now().toString(),
    location: "",
    tags: [""],
  });
  const { photo, getPhoto, isAvailable } = useCamera();
  const { mutateAsync } = useAddMomentMutation();

  const handleCamera = useCallback(async () => {
    const photo = await getPhoto({
      resultType: CameraResultType.Base64,
      allowEditing: false,
      width: 550,
      height: 550,
      webUseInput: true,
      source: CameraSource.Camera,
    });

    setMoment({
      ...moment,
      photo: `data:image/png;base64,${photo.base64String}`,
    });
  }, [getPhoto]);

  const handleSelect = (name: string, value: string | string[] | null) => {
    setMoment({ ...moment, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (moment.photo === "" || moment.location === "" || moment.tags[0] === "")
      return;
    await mutateAsync(moment, {
      onSuccess: () => {
        window.location.href = "/photos";
      },
    });
  };

  if (!isAvailable) {
    return (
      <Text>
        La camara no esta disponible en su dispositivo, por favor active el
        permiso de la camara
      </Text>
    );
  }

  return (
    <Box p={rem(15)}>
      <form onSubmit={handleSubmit}>
        <Card withBorder shadow="sm" radius={"sm"}>
          <Card.Section p={20}>
            <Text size="lg" weight={500}>
              Capturar Momentos
            </Text>
          </Card.Section>
          <CameraInput
            handleCamera={handleCamera}
            photo={photo}
            handleSelect={handleSelect}
          />
          <Card.Section p={20}>
            <Button type="submit" leftIcon={<IconCheck />} fullWidth>
              Guardar
            </Button>
          </Card.Section>
        </Card>
      </form>
    </Box>
  );
};
