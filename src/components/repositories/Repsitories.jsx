import React, { useState, useEffect } from "react";
import RepositoriesItem from "../repositoriesItem/RepositoriesItem";
import ReactPaginate from "react-paginate";
import styles from "./Repositories.module.css";

import PageItemsCount from "../pageItemsCounter/PageItemsCounter";

function handlePageItemCount(reposLength, perPage, pageNumber) {
  if (reposLength === 1) {
    return { first: pageNumber * perPage - perPage + 1 };
  }
  return {
    first: pageNumber * perPage - perPage + 1,
    last:
      reposLength === 4
        ? pageNumber * perPage
        : pageNumber * perPage - (perPage - reposLength),
  };
}

const Repositories = ({ user, perPage }) => {
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserRepositories(page) {
      try {
        setError("");
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${user.login}/repos?per_page=${perPage}&page=${page}`
        );
        setRepositories(await response.json());
        setLoading(false);
      } catch (error) {
        setError(`Can not fetch repositories for user ${user.login}`);
        setLoading(false);
      }
    }
    fetchUserRepositories(page);
    console.log(repositories);
  }, [page, perPage, user.login]);

  function handlePageClick(e) {
    setPage(e.selected + 1);
  }
  const totalPagesSum = Math.ceil(user.public_repos / perPage);
  const pageItemCount = repositories
    ? handlePageItemCount(repositories.length, perPage, page)
    : null;

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
      <div className={styles.paginationItem}>
        <PageItemsCount
          public_repos={user.public_repos}
          firstPage={pageItemCount.first}
          lastPage={pageItemCount.last}
        />
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPagesSum}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default Repositories;
