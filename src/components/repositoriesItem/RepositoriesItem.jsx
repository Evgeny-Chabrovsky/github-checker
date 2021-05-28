import React from "react";
import styles from "./RepositoriesItem.module.css";

const RepositoriesItem = (props) => {
  const { html_url, name, description } = props;
  return (
    <div className={styles.container}>
      <a
        href={html_url}
        className={styles.link}
        target="_blank"
        rel="noreferrer"
      >
        {name}
      </a>
      <p>{description}</p>
    </div>
  );
};

export default RepositoriesItem;
