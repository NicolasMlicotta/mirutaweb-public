import { collection, orderBy, query, where, getDocs } from "firebase/firestore";

import getDb from "./getDb";

function getFeedbacks(email, setDatos) {
  const [db] = getDb();
  const datos = [];
  const fetchData = async () => {
    const q = query(
      collection(db, "feedbacks"),
      where("dni", "==", email),
      orderBy("fecha", "desc")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let val = doc.data();
      val.fecha = new Date(val.fecha.seconds * 1000).toLocaleDateString();
      datos.push(val);
    });
    setDatos(datos);
  };
  fetchData();
}

export default getFeedbacks;
