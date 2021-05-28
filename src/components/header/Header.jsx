import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/github.svg";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <img src={logo} alt="" />
      <input type="text" onKeyDown={props.handleKeyDown} />
    </div>
  );
};

export default Header;
