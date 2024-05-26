import React, { useReducer, useState } from "react";
import styles from "./Registration.module.css";
import axios from "axios";
import Message from "./Message";

const initialState = {
  username: "",
  email: "",
  password: "",
  password2: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
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
    case "confirmPassword":
      if (action.payload === state.password) {
        return {
          ...state,
          password2: action.payload,
          passwordConfirm: true,
        };
      } else {
        return {
          ...state,
          password2: action.payload,
          passwordConfirm: false,
        };
      }
    case "clearForm":
      return initialState;
    default:
      return state;
  }
}

const Registration = ({ closeModal, BASE_URL }) => {
  const [{ username, password, password2, email }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [errorPassowrd, setErrorPassword] = useState(false);
  const [existingUser, setExistingUser] = useState(false);

  async function registerUser() {
    try {
      const res = await axios.post(`${BASE_URL}`, {
        username,
        email,
        password,
      });

      dispatch({ type: "clearForm" });

      console.log(res.data);
    } catch (error) {
      // console.error(error);
      if (error.response && error.response.status === 400) {
        console.log("User exists");
        setExistingUser(true);
      }

      // alert("There was an error loading data...");
    }
  }

  function handleUsername(e) {
    dispatch({ type: "setUsername", payload: e.target.value });
  }
  function handleEmail(e) {
    dispatch({ type: "setEmail", payload: e.target.value });
    setExistingUser(false);
  }
  function handlePassword(e) {
    dispatch({ type: "setPassword", payload: e.target.value });
  }
  function handleConfirmPassword(e) {
    dispatch({ type: "confirmPassword", payload: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setErrorPassword(true);
      return;
    }
    setErrorPassword(false);
    setExistingUser(false);
    registerUser();
  };

  return (
    <>
      <div className={styles.modal} onSubmit={handleSubmit}>
        <button className={styles.btnCloseModal} onClick={closeModal}>
          &times;
        </button>
        <h2 className={styles.modalHeader}>
          Open your <br />
          <span className={styles.highlight}>AdVatage </span>
          account in just 1 minute
        </h2>
        <form className={styles.modalForm}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={handleUsername}
          />

          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={handleEmail}
          />
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={handlePassword}
          />
          <label className={styles.label}>Repeat password</label>
          <input
            type="password"
            className={styles.input}
            value={password2}
            onChange={handleConfirmPassword}
          />
          <button className={styles.btn}>Register</button>
          {errorPassowrd && (
            <Message style={{ color: "red" }}>
              ❌ Passwords do NOT match !
            </Message>
          )}
          {existingUser && (
            <Message style={{ color: "red" }}>
              ❌ User is already exists !
            </Message>
          )}
        </form>
      </div>
      <div className={styles.overlay}></div>
    </>
  );
};

export default Registration;
