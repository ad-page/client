import React, { useEffect, useReducer, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "loggedIn":
      console.log("Loggin in with", state.email, state.password);
      return initialState;
    default:
      return initialState;
  }
}

const Login = ({ closeModal, BASE_URL, handleLoginSuccess, setUserRole }) => {
  const [{ password, email }, dispatch] = useReducer(reducer, initialState);

  async function loginUser() {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      const { token, username, role, _id } = res.data;

      localStorage.setItem(
        "userData",
        JSON.stringify({ token, username, role, _id })
      );
      setUserRole(role);

      console.log(res);
      handleLoginSuccess();
    } catch (error) {
      alert("There was an error loading data...");
      console.error(error);
    }
  }

  function handleChangeEmail(e) {
    dispatch({ type: "setEmail", payload: e.target.value });
  }
  function handleChangePassword(e) {
    dispatch({ type: "setPassword", payload: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginUser();
    dispatch({ type: "loggedIn" });
    closeModal();
  }

  return (
    <>
      <div className={styles.modal}>
        <button className={styles.btnCloseModal} onClick={closeModal}>
          &times;
        </button>
        <h2 className={styles.modalHeader}>
          Please login to your <br />
          <span className={styles.highlight}>AdVantage </span>
          account
        </h2>
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <label className={styles.label}>Email</label>
          <input
            type="text"
            className={styles.input}
            value={email}
            onChange={handleChangeEmail}
          />

          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={handleChangePassword}
          />
          <button className={styles.btn}>Login</button>
        </form>
      </div>
      <div className={styles.overlay}></div>
    </>
  );
};

export default Login;
