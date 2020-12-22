import React, { useState } from "react";
import { authService } from "../firebase";

const AuthForm = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [newAccount, setNewAccount] = useState(true);

  const [error, setError] = useState("");

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

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={inputValues.email}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={inputValues.password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Signin"}
          className="authInput authSubmit"
        />
        {error}
      </form>

      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Signin" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
