import getDb from "./getDb";
import { doc, deleteDoc } from "firebase/firestore";

const borrarNovedad = async (id) => {
  const [db] = getDb();
  try {
    await deleteDoc(doc(db, "novedades", id));
    return true;
  } catch (err) {
    window.alert("Error al borrar.");
    return false;
  }
};

export default borrarNovedad;
