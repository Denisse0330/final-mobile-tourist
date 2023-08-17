import { useQuery } from "@tanstack/react-query";
import { Storage } from "@capacitor/storage";

export const useGetAllMoments = () => {
  const query = useQuery({
    queryKey: ["moments"],
    queryFn: async () => {
      const { value } = await Storage.get({ key: "moments" });
      return value ? JSON.parse(value) : [];
    },
  });

  return { ...query };
};
