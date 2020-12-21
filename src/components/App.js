import React, { useState, useEffect } from "react";
import { Routers } from "./Router";
import { authService } from "../firebaseInstance";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return <>{init ? <Routers isLoggedIn={isLoggedIn} /> : "Loading....."}</>;
}

export default App;
