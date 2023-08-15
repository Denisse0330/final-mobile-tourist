import { IonContent, IonIcon } from "@ionic/react";
import {
  Box,
  Button,
  Card,
  PasswordInput,
  TextInput,
  rem,
  Image,
  Text,
  Anchor,
  Divider,
} from "@mantine/core";
import { enter, enterOutline } from "ionicons/icons";

interface LoginInputProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginInputComponent = ({ handleInput }: LoginInputProps) => {
  const buttonText = location.pathname.includes("register")
    ? "Registrarme"
    : "Iniciar Sesion";

  const title = location.pathname.includes("register")
    ? "Registrarme"
    : "Iniciar Sesión";

  return (
    <Box id="container" p={rem(18)}>
      <Card withBorder shadow="sm" radius={"md"}>
        <Card.Section
          display={"flex"}
          mt={8}
          mb={5}
          sx={{
            justifyContent: "center",
          }}
        >
          <Image src={"/LogoApp.png"} maw={220} />
        </Card.Section>
        <Card.Section>
          <Text align="center" color="cyan.6" size={"xl"} fw={700}>
            {title}
          </Text>
        </Card.Section>
        <Card.Section p={rem(16)}>
          <TextInput
            onChange={handleInput}
            label="Email"
            name="email"
            size="sm"
            required
          />
          <PasswordInput
            onChange={handleInput}
            label="Contraseña"
            name="password"
            size="sm"
            required
          />
        </Card.Section>
        <Button
          color="cyan"
          type="submit"
          fullWidth
          leftIcon={
            <IonIcon
              aria-hidden="false"
              slot="start"
              ios={enterOutline}
              md={enter}
              size={"32px"}
            />
          }
        >
          {buttonText}
        </Button>
        {!location.pathname.includes("register") && (
          <>
            <Divider mt={16} mb={16} size={"sm"} />
            <Text align="center">
              ¿No tienes una cuenta?{" "}
              <Anchor href="/register">Registrate</Anchor>
            </Text>
          </>
        )}
      </Card>
    </Box>
  );
};
