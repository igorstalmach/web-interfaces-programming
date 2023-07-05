import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: "domain",
  projectId: "project-id",
  storageBucket: "bucket",
  messagingSenderId: "id",
  appId: "app-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
