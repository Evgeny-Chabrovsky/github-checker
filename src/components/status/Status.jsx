import React from "react";
import styles from "./Status.module.css";

const Status = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src={props.img} alt="" />
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default Status;
