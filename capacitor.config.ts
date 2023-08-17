import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "final-tourist",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    Geolocation: {
      backgroundPermission: "granted",
      foregroundPermission: "granted",
      alwaysAuthorization: true,
    },
    Camera: {
      // Add the Camera plugin configuration
      backgroundPermission: "granted",
      foregroundPermission: "granted",
      alwaysAuthorization: true,
    },
  },
};

export default config;
