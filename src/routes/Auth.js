import React, { useState } from "react";
import { authService } from "../firebaseInstance";

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
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
