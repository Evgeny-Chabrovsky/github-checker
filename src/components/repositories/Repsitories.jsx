import React, { useState, useEffect } from "react";
import RepositoriesItem from "../repositoriesItem/RepositoriesItem";
import styles from "./Repositories.module.css";
import emptyIcon from "../../images/empty.svg";

const Repositories = ({ user, perPage }) => {
  const [repositories, setRepositories] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    function requestUserRepos(page) {
      fetch(
        `https://api.github.com/users/${user.login}/repos?per_page=${perPage}&page=${page}`
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setRepositories(response);
        });
    }
    requestUserRepos(page);
  }, [page, perPage, user]);

  function handlePageClick(e) {
    setPage(e.selected + 1);
  }
  return (
    <div className={styles.container}>
      <h2>Repositories ({user.public_repos})</h2>
      {repositories.map((repository) => (
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
