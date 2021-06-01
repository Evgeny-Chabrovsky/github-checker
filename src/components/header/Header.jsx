import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/github.svg";

const Header = ({ handleKeyDown, handleOnChangeInput }) => {
  return (
    <div className={styles.header}>
      <img src={logo} alt="" />
      <input
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleOnChangeInput}
        autoFocus
      />
    </div>
  );
};

export default Header;
