import getDb from "./getDb";
import { collection, orderBy, query, where, getDocs } from "firebase/firestore";

export const getFeedbacksOl = async (ol, status) => {
  const [db] = getDb();

  const datos = [];
  const q = query(
    collection(db, "feedbacks"),
    where("ol", "==", ol),
    where("estado", "==", status),
    orderBy("fecha", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let val = doc.data();
    val.feedbackID = doc.id;
    val.fecha = new Date(val.fecha.seconds * 1000).toLocaleDateString();
    datos.push(val);
  });
  return datos;
};
