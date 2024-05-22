import React, { useReducer, useState } from "react";
import styles from "./Login.module.css";

const initialState = {
  username: "",
  password: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "loggedIn":
      console.log("Loggin in with", state.username, state.password);
      return initialState;
    default:
      return initialState;
  }
}

const Login = ({ closeModal }) => {
  const [{ username, password }, dispatch] = useReducer(reducer, initialState);

  function handleChangeUsername(e) {
    dispatch({ type: "setUsername", payload: e.target.value });
  }
  function handleChangePassword(e) {
    dispatch({ type: "setPassword", payload: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "loggedIn" });
    closeModal();
  }

  return (
    <>
      <div className={styles.modal} onSubmit={handleSubmit}>
        <button className={styles.btnCloseModal} onClick={closeModal}>
          &times;
        </button>
        <h2 className={styles.modalHeader}>
          Please login to your <br />
          <span className={styles.highlight}>ad-page </span>
          account
        </h2>
        <form className={styles.modalForm}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={handleChangeUsername}
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
