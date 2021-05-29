import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Status from "./components/status/Status";
import Repositories from "./components/repositories/Repsitories";
import User from "./components/user/User";
import ReactPaginate from "react-paginate";
import search_icon from "../src/images/search.svg";
import notFound_icon from "../src/images/notFound.svg";
import PageItemsCounter from "./components/pageItemsCounter/PageItemsCounter";

function App() {
  const STATUS_NOT_FOUND = { img: notFound_icon, text: "User not found" };
  const START_APP = {
    img: search_icon,
    text: "Start with searching a GitHub user",
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [userNameInput, setUserNameInput] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0); //0
  const [status, setStatus] = useState(START_APP);

  const PER_PAGE = 4;

  // .then(
  //   (result) => {
  //     setIsLoaded(true);
  //     setItems(result);
  //   },
  //   (error) => {
  //     setIsLoaded(true);
  //     setError(error);
  //   }
  // );
  // }

  function handleOnChangeInput(event) {
    // if (userNameInput === "") {
    // setStatus(START_APP);
    // }
    setUserNameInput(event.target.value);
  }
  // console.log(userNameInput);
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      console.log(userNameInput);
      requestUserRepos(userNameInput, page);
      setPageCount(Math.ceil(user.public_repos / PER_PAGE));
      setStatus(false);
      setPage(1);
    }
  }
  function handlePageClick(e) {
    const selectedPage = e.selected;
    setPage(selectedPage + 1);
    // debugger;
    requestUserRepos(userNameInput, page);
  }
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
  const pageItemCount = handlePageItemCount(
    repositories.length,
    PER_PAGE,
    page
  );

  function requestUserRepos(username, page) {
    Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=${PER_PAGE}&page=${page}`
      ),
    ])
      .then((response) => Promise.all(response.map((r) => r.json())))
      .then((response) => [setUser(response[0]), setRepositories(response[1])]);
  }

  useEffect(() => {
    // requestUserRepos(userNameInput, page);s
    setLoading(true);

    setPageCount(Math.ceil(user.public_repos / PER_PAGE));
    setLoading(false);
  }, [user.public_repos, pageCount, page, userNameInput]);

  const {
    avatar_url,
    name,
    login,
    followers,
    following,
    html_url,
    public_repos,
  } = user;
  return (
    <div className="App">
      <Header
        handleKeyDown={handleKeyDown}
        handleOnChangeInput={handleOnChangeInput}
      />
      {status === START_APP ? (
        <Status img={status.img} text={status.text} />
      ) : null}
      {!status && (
        <div className="content">
          {loading && <p>Loading...</p>}
          <User
            avatar_url={avatar_url}
            name={name}
            login={login}
            followers={followers}
            following={following}
            html_url={html_url}
          />
          <Repositories
            repositories={repositories}
            public_repos={public_repos}
          />
        </div>
      )}
      <PageItemsCounter
        public_repos={public_repos}
        firstPage={pageItemCount.first}
        lastPage={pageItemCount.last}
      />
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
