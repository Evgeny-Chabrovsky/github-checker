import React from "react";
import RepositoriesItem from "../repositoriesItem/RepositoriesItem";
import styles from "./Repositories.module.css";

const Repositories = (props) => {
  // const [html_url, name, description] = props;

  return (
    <div className={styles.container}>
      <h2>Repositories ({props.public_repos})</h2>
      {props.repositories.map((repository) => (
        <RepositoriesItem
          key={repository.id}
          html_url={repository.html_url}
          name={repository.name}
          description={repository.description}
        />
      ))}
    </div>
  );
};

export default Repositories;
