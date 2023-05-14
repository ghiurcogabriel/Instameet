import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_HauZtfWvGOI-HSQ2BGVKatRazD0SCtc",
  authDomain: "online-shop-6958e.firebaseapp.com",
  databaseURL: "https://online-shop-6958e.firebaseio.com",
  projectId: "online-shop-6958e",
  storageBucket: "online-shop-6958e.appspot.com",
  messagingSenderId: "224405517915",
  appId: "1:224405517915:web:480656454c01deb08d317e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const authUser = getAuth(app);
