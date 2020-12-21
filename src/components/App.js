import React, { useState, useEffect } from "react";
import { Routers } from "./Router";
import { authService } from "../firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <Routers isLoggedIn={isLoggedIn} user={user} /> : "Loading....."}
    </>
  );
}

export default App;
