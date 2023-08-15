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
import { FormEvent, useState } from "react";
import { Button } from "@mantine/core";
import { useLoginUserMutation } from "../../hooks/mutations/user/useLoginUserMutation";

export const LoginPage = () => {
  const { mutateAsync } = useLoginUserMutation();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await mutateAsync(input);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
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
