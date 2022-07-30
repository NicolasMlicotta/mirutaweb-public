import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import getDb from "./getDb";

const agregarSku = async (
  { sku, tipo, descripcion, unidades },
  imagen,
  resetForm,
  setImagen,
  setLoading,
  redirect = null
) => {
  const [db, app] = getDb();
  setLoading(true);

  const uploadImage = (imagen, objeto) => {
    const storage = getStorage(app);
    const ruta = "imagenessku/" + objeto.idsku;
    const reference = ref(storage, ruta);
    uploadBytes(reference, imagen)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        objeto.ImgUrl = downloadURL;
        SubirDoc(objeto);
      });
  };

  const SubirDoc = (objeto) => {
    setDoc(doc(db, "skudb", objeto.idsku), objeto).then(() => {
      setLoading(false);
      window.alert("SKU cargado correctamente.");
      resetForm();
      setImagen(null);
      redirect !== null && redirect();
    });
  };

  //ImgUrl está como null para cargar ese campo por defecto en firebase
  let objeto = {
    idsku: sku.toString(),
    Tipo: tipo,
    Descripcion: descripcion,
    UnidadesBulto: unidades,
    ImgUrl: null,
  };

  if (imagen != null) {
    uploadImage(imagen, objeto);
  } else {
    SubirDoc(objeto);
  }
};

export default agregarSku;
