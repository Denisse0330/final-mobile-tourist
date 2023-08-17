import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Storage } from "@capacitor/storage";

export const useAddMomentMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const actualMoments = await Storage.get({ key: "moments" });

      if (!actualMoments.value) {
        Storage.set({ key: "moments", value: JSON.stringify([data]) });
      } else {
        const newMoments = [...JSON.parse(actualMoments.value), data];
        Storage.set({ key: "moments", value: JSON.stringify(newMoments) });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["moments"]);
    },
  });

  return { ...mutation };
};
