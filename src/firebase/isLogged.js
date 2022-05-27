// Utiliza onAuthStateChanged para verificar si está logueado y returna id / dni
import { getAuth } from "firebase/auth";
const isLogged = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return true;
  } else {
    return false;
  }
};
export default isLogged;
