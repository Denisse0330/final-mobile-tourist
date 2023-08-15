import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { LoginInputComponent } from "../../components/inputs/LoginInputComponent";
import { useState } from "react";
import { useRegisterUserMutation } from "../../hooks/mutations/user/useRegisterUserMutation";

export const RegisterPage = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { mutateAsync } = useRegisterUserMutation();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await mutateAsync(input);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit}>
          <LoginInputComponent handleInput={handleInput} />
        </form>
      </IonContent>
    </IonPage>
  );
};
