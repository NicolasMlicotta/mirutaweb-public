import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const app = initializeApp(firebaseConfig);
const agregarSku = (
  { sku, tipo, descripcion, unidades },
  imagen,
  setCargando
) => {
  let objeto = {
    idsku: sku.toString(),
    Tipo: tipo,
    Descripcion: descripcion,
    UnidadesBulto: unidades,
    ImgUrl: null,
  };

  if (imagen != null) {
    uploadImage(imagen, objeto, setCargando);
  } else {
    SubirDoc(objeto, setCargando);
  }
};

const uploadImage = (imagen, objeto, setCargando) => {
  const storage = getStorage(app);
  const ruta = "imagenessku/" + objeto.idsku;
  const reference = ref(storage, ruta);

  uploadBytes(reference, imagen)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
      objeto.ImgUrl = downloadURL;
      SubirDoc(objeto, setCargando);
    });
};

const SubirDoc = (objeto, setCargando) => {
  const db = getFirestore(app);
  // Add a new document in collection "cities"
  setDoc(doc(db, "skudb", objeto.idsku), objeto)
    .then(() => {
      window.alert("SKU cargado correctamente.");
      setCargando(false);
    })
    .catch(setCargando(false));
};

export default agregarSku;
