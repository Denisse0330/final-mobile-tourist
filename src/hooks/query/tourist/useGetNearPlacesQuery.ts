import { useQuery } from "@tanstack/react-query";
import { MapService } from "../../../services/map.service";

export const useGetNearPlacesQuery = (
  latitude?: number,
  longitude?: number,
  api_Key?: string,
  next_page?: string
) => {
  const query = useQuery({
    queryKey: ["nearPlaces", latitude, longitude],
    queryFn: async () => {
      const mapService = new MapService(latitude!, longitude!, api_Key!);

      return await mapService.getPlaces(next_page);
    },
    enabled: (!!latitude && !!longitude) || !!next_page,
  });

  return { ...query };
};
