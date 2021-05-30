import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Status from "./components/status/Status";
import Repositories from "./components/repositories/Repsitories";
import User from "./components/user/User";
import search_icon from "../src/images/search.svg";
import notFound_icon from "../src/images/notFound.svg";

function App() {
  const STATUS_NOT_FOUND = { img: notFound_icon, text: "User not found" };
  const START_APP = {
    img: search_icon,
    text: "Start with searching a GitHub user",
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState("");
  const [user, setUser] = useState([]);
  const [userNameInput, setUserNameInput] = useState("");
  const [status, setStatus] = useState(START_APP);
  const PER_PAGE = 4;

  function handleOnChangeInput(event) {
    setUserNameInput(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      setStatus(false);
      setLoading(userNameInput);
    }
  }
  useEffect(() => {
    setLoading(true);

    function requestUser(username) {
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setUser(response);
        });
    }
    if (loading) requestUser(userNameInput);

    setLoading(false);
  }, [loading]);

  const { avatar_url, name, login, followers, following, html_url } = user;
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
          <Repositories user={user} perPage={PER_PAGE} />
        </div>
      )}
    </div>
  );
}

export default App;
