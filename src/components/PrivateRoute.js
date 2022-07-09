import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../firebase/firebaseConfig";
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const auth = getAuth();
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default PrivateRoute;
