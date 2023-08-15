import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../../services/user.service";
import { useAuthenticateContext } from "../../../context/AuthContext";

export const useLogoutUserMutation = () => {
  const { logOut } = useAuthenticateContext();

  const mutation = useMutation({
    mutationFn: async () => {
      const userService = new UserService();

      return await userService.logout();
    },
    onSuccess: () => {
      logOut();
    },
  });

  return { ...mutation };
};
