// Inicia y cierra sesiones
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import getUser from "./getUser";

const login = (dni, password, action, setUserData) => {
  const auth = getAuth();

  if (action == "login") {
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
        alert("Error. Por favor intente nuevamente.");
        return false;
      });
  } else if (action == "logout") {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUserData(false);
        return true;
      })
      .catch((error) => {
        // An error happened.
        alert("Error. Por favor intente nuevamente.");
        return false;
      });
  }
};

export default login;
