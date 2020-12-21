import React, { useState } from "react";
import { authService } from "../firebase";

const Auth = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  // const onSocialClick = async (e) => {
  //   const { name } = e.target;
  //   let provider;
  //   try {
  //     if (name === "google") {
  //       provider = new firebaseInstance.auth.GoogleAuthProvider().then(
  //         function (authData) {
  //           console.log("Logged in as:", authData);
  //         }
  //       );
  //     } else if (name === "github") {
  //       provider = new firebaseInstance.auth.GithubAuthProvider();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   const data = await authService.signInWithPopup(provider);
  //   console.log(data);
  // };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        // create account
        await authService.createUserWithEmailAndPassword(
          inputValues.email,
          inputValues.password
        );
      } else {
        await authService.signInWithEmailAndPassword(
          inputValues.email,
          inputValues.password
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={inputValues.email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={inputValues.password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Signin"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Signin" : "Create Account"}
      </span>
    </div>
  );
};

export default Auth;
