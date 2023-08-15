import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "final-tourist",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    Geolocalization: {
      backgroundPermission: "granted",
      foregroundPermission: "granted",
      alwaysAuthorization: true,
    },
    Camera: {
      alwaysAuthorization: true,
    },
  },
};

export default config;
