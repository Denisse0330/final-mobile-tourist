import { createContext, useContext, useEffect } from "react";
import { Camera } from "@capacitor/camera";

const CameraContext = createContext({});

export const useCameraContext = () => {
  const context = useContext(CameraContext);

  if (!context) {
    throw new Error("useCameraContext must be used within a CameraProvider");
  }

  return context;
};

export const CameraProvider = ({ children }: { children: JSX.Element }) => {
  useEffect(() => {
    const initCamera = async () => {
      try {
        const permission = await Camera.checkPermissions();

        if (permission) {
          if (
            permission.camera === "prompt" ||
            permission.photos === "prompt"
          ) {
            await Camera.requestPermissions({
              permissions: ["camera", "photos"],
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    initCamera();
  }, []);

  return <CameraContext.Provider value={{}}>{children}</CameraContext.Provider>;
};
