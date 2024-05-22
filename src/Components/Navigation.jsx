import React, { useState } from "react";
import Login from "./Login";
import styles from "./Navigation.module.css";
import logo from "../../public/Screenshot_2024-05-22_132736-removebg-preview.png";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <nav className={styles.nav}>
      <img src={logo} className={styles.navLogo}></img>
      <div className={styles.btnContainer}>
        <button className={styles.btnLogin} onClick={openModal}>
          Login
        </button>
        <button className={styles.btnSign}>Sign Up</button>
      </div>
      {isOpen && <Login closeModal={closeModal} />}
    </nav>
  );
}

export default Navigation;
