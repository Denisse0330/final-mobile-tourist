import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../../services/user.service";
import { useAuthenticateContext } from "../../../context/AuthContext";
import { useIonAlert } from "@ionic/react";

export const useRegisterUserMutation = () => {
  const { authUser } = useAuthenticateContext();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const userServices = new UserService();

      const response = await userServices.register(data.email, data.password);

      return response;
    },
    onSuccess: (data) => {
      authUser({
        email: data.user.email,
        uid: data.user.uid,
        photoURL: data.user.photoURL,
        phoneNumber: data.user.phoneNumber,
      });
      window.location.href = "/home";
    },
  });

  return { ...mutation };
};
