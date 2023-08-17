import {
  Button,
  Select,
  Image,
  Text,
  Card,
  rem,
  MultiSelect,
} from "@mantine/core";
import { Photo } from "@capacitor/camera";
import { useGetFavoritePlacesQuery } from "../../hooks/query/favorite/useGetFavoritePlaces";
import { IconCamera } from "@tabler/icons-react";
import { Emociones } from "../../helpers/Emociones";

export const CameraInput = ({
  photo,
  handleCamera,
  handleSelect,
}: {
  photo?: Photo;
  handleCamera: () => void;
  handleSelect: (name: string, value: string | string[] | null) => void;
}) => {
  const { data: places } = useGetFavoritePlacesQuery();

  return (
    <Card.Section p={rem(12)}>
      <Select
        data={
          places?.map((place: any) => ({
            value: `${place.name} - ${place.lat},${place.lng}`,
            label: place.name,
          })) || []
        }
        onChange={(value) => handleSelect("location", value)}
        placeholder="Selecciona un lugar"
        label="Lugar"
        required
      />

      <MultiSelect
        data={Emociones}
        searchable
        onChange={(value) => handleSelect("tags", value)}
        placeholder="Selecciona una o varias emociones"
        label="Emociones"
        mt={"sm"}
        required
      />

      <Button
        onClick={handleCamera}
        leftIcon={<IconCamera />}
        fullWidth
        mt={"md"}
      >
        Tomar Foto
      </Button>

      {photo && (
        <>
          <Text>Preview: </Text>
          <Image
            src={`data:image/png;base64,${photo.base64String}`}
            alt="foto"
            maw={200}
            mah={200}
            sx={{
              figure: {
                div: {
                  img: {
                    width: `200px !important`,
                    height: `200px !important`,
                  },
                },
              },
            }}
          />
        </>
      )}
    </Card.Section>
  );
};
