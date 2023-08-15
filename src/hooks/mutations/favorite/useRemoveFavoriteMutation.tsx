import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Storage } from "@capacitor/storage";

export const useRemoveFavoriteMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (place: any) => {
      const favoritePlaces = await Storage.get({ key: "favoritePlaces" });

      const favoritePlacesArray = JSON.parse(favoritePlaces.value ?? "[]");

      const filteredPlaces = favoritePlacesArray.filter(
        (favoritePlace: any) => favoritePlace.name !== place.name
      );

      await Storage.set({
        key: "favoritePlaces",
        value: JSON.stringify(filteredPlaces),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["isFavorite"]);
      queryClient.invalidateQueries(["favoritePlaces"]);
    },
  });

  return { ...mutation };
};
