import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Storage } from "@capacitor/storage";

export const useAddFavoritePlaceMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (place: any) => {
      const favoritePlaces = await Storage.get({ key: "favoritePlaces" });

      const favoritePlacesArray = JSON.parse(favoritePlaces.value ?? "[]");

      const existPlace = favoritePlacesArray.find(
        (favoritePlace: any) => favoritePlace.name === place.name
      );

      if (existPlace) {
        return;
      }

      const newFavoritePlaces = [...favoritePlacesArray, place];

      await Storage.set({
        key: "favoritePlaces",
        value: JSON.stringify(newFavoritePlaces),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["isFavorite"]);
      queryClient.invalidateQueries(["favoritePlaces"]);
    },
  });

  return { ...mutation };
};
