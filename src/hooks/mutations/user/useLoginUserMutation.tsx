import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../../services/user.service";
import { useAuthenticateContext } from "../../../context/AuthContext";

export const useLoginUserMutation = () => {
  const { authUser, isAuth } = useAuthenticateContext();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      console.log(data);
      const userServices = new UserService();

      return await userServices.login(data.email, data.password);
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
