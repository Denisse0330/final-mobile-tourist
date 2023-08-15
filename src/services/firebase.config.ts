import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC3IZXXJLBZzeawjNgsy9QkT9kWVYtKjDE",
  authDomain: "my-tourist-app-befe6.firebaseapp.com",
  databaseURL: "my-tourist-app-befe6.firebaseio.com",
  storageBucket: "my-tourist-app-befe6.appspot.com",
  projectId: "my-tourist-app-befe6",
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
