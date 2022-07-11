import getDb from "./getDb";
import { collection, query, getDocs, limit, orderBy } from "firebase/firestore";

async function getNovedades() {
  const [db] = getDb();
  try {
    const q = query(
      collection(db, "novedades"),
      limit(15),
      orderBy("fechaCreacion", "desc")
    );
    const items = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const tempData = { key: doc.id, data: doc.data() };
      items.push(tempData);
    });
    return items;
  } catch (error) {
    alert("Erorr" + error);
    return [];
  }
}
export default getNovedades;
