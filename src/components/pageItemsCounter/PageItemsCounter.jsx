import React from "react";
import styles from "./PageItemsCounter.module.css";

const PageItemsCount = ({ public_repos, firstPage, lastPage }) => {
  return (
    <p className={styles.pageItemCount}>
      {firstPage}
      {lastPage ? `-${lastPage}` : null} of {public_repos}{" "}
      {public_repos > 1 ? "items" : "item"}
    </p>
  );
};

export default PageItemsCount;
