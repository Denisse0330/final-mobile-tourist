import { createContext, useContext, useEffect, useState } from "react";
import { Geolocation, Position } from "@capacitor/geolocation";

const GeolocationContext = createContext({
  position: {} as Position,
  setPosition: (position: any) => {},
  error: "",
});

export const useGeolocationContext = () => {
  const context = useContext(GeolocationContext);

  if (!context) {
    throw new Error(
      "useGeolocationContext debe estar dentro del proveedor GeolocationContext"
    );
  }

  return context;
};

export const GeolocationProvider = ({ children }: any) => {
  const [position, setPosition] = useState<Position>({} as Position);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCurrentPosition() {
      try {
        const permission = await Geolocation.checkPermissions();

        if (permission) {
          if (permission.location === "prompt") {
            await Geolocation.requestPermissions();
          }
        }

        const coordinates = await Geolocation.getCurrentPosition();

        setPosition(coordinates);
      } catch (error) {
        setError("No se pudo obtener la ubicación");
      }
    }

    getCurrentPosition();
  }, []);

  return (
    <GeolocationContext.Provider
      value={{
        position,
        setPosition,
        error,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};
