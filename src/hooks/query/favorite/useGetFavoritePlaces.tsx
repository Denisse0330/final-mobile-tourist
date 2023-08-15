import { Storage } from "@capacitor/storage";
import { useQuery } from "@tanstack/react-query";

export const useGetFavoritePlacesQuery = () => {
  const query = useQuery(["favoritePlaces"], async () => {
    const favoritePlaces = await Storage.get({ key: "favoritePlaces" });

    return JSON.parse(favoritePlaces.value ?? "[]");
  });

  return { ...query };
};
