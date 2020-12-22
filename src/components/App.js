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
        setUser({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  // update profile in realtime
  const refreshUser = () => {
    const user = authService.currentUser;
    setUser({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <Routers
          isLoggedIn={isLoggedIn}
          user={user}
          refreshUser={refreshUser}
        />
      ) : (
        "Loading....."
      )}
    </>
  );
}

export default App;
