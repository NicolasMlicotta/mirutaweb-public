import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const leerSku = async (id) => {
  const docRef = doc(db, "skudb", id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      return { idsku: "NO EXISTE" };
    }
  } catch (e) {
    console.error(e);
  }
};

export default leerSku;
