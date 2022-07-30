// Inicia y cierra sesiones
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import getUser from "./getUser";

const login = (dni, password, action, setUserData, isAuthenticated) => {
  const auth = getAuth();
  if (action === "login") {
    const email = dni + "_choferescmq@miruta.com";
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userData = getUser(user.email);
        setUserData(userData);
        return true;
      })
      .catch((error) => {
        window.alert("Error iniciando sesión");
        return false;
      });
  } else if (action === "logout") {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUserData(false);
        isAuthenticated.current = false;
        return true;
      })
      .catch((error) => {
        // An error happened.
        window.alert("Error cerrando sesión");
        return false;
      });
  }
};

export default login;
