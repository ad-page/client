import React, { useState } from "react";
import Login from "./Login";
import styles from "./Navigation.module.css";
import logo from "../assets/Screenshot_2024-05-22_132736-removebg-preview.png";
import Registration from "./Registration";

function Navigation() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);

  function openLoginModal() {
    setIsOpenLogin(true);
  }
  function openSignupModal() {
    setIsOpenSignup(true);
  }

  function closeModal() {
    if (isOpenLogin === true) setIsOpenLogin(false);
    if (isOpenSignup === true) setIsOpenSignup(false);
  }

  return (
    <nav className={styles.nav}>
      <img src={logo} className={styles.navLogo}></img>
      <div className={styles.btnContainer}>
        <button className={styles.btnLogin} onClick={openLoginModal}>
          Login
        </button>
        <button className={styles.btnSign} onClick={openSignupModal}>
          Sign Up
        </button>
      </div>
      {isOpenLogin && <Login closeModal={closeModal} />}
      {isOpenSignup && <Registration closeModal={closeModal} />}
    </nav>
  );
}

export default Navigation;
