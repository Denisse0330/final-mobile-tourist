import { useQuery } from "@tanstack/react-query";
import { Storage } from "@capacitor/storage";

export const useIsFavoriteQuery = (lat?: number, lng?: number) => {
  const query = useQuery(["isFavorite", lat, lng], {
    queryFn: async () => {
      const favoritePlaces = await Storage.get({ key: "favoritePlaces" });

      const places = JSON.parse(favoritePlaces.value ?? "[]");

      return places.some(
        (place: any) => place.lat === lat && place.lng === lng
      );
    },
    enabled: !!lat && !!lng,
  });

  return { ...query };
};
