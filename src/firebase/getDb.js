import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

export default function getDb() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return [db, app];
}
