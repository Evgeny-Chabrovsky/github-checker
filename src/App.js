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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [offset, setOffset] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [status, setStatus] = useState({
    img: search_icon,
    text: "Start with searching a GitHub user",
  });
  const PER_PAGE = 4;
  const statusNotFound = { img: notFound_icon, text: "User not found" };

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
  function handlePageClick(e) {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  }
  console.log(offset);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      // console.log("pum");
      setStatus(statusNotFound);
    }
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
    offset
  );

  function requestUserRepos(username, offset) {
    Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=${PER_PAGE}&page=${offset}`
      ),
    ])
      .then((response) => Promise.all(response.map((r) => r.json())))
      .then((response) => [
        setUser(response[0]),
        setRepositories(response[1]),
        setLoading(false),
        setPageCount(Math.ceil(user.public_repos / PER_PAGE)),
      ]);
  }

  useEffect(() => {
    setLoading(true);

    requestUserRepos("gaearon", offset);
  }, [offset]);

  const {
    avatar_url,
    name,
    login,
    followers,
    following,
    html_url,
    public_repos,
  } = user;
  console.log(repositories);
  return (
    <div className="App">
      <Header handleKeyDown={handleKeyDown} />
      {/* <Status img={status.img} text={status.text} /> */}
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
        <Repositories repositories={repositories} public_repos={public_repos} />
      </div>
      <PageItemsCounter
        public_repos={public_repos}
        firstPage={pageItemCount.first}
        lastPage={pageItemCount.last}
      />
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
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
