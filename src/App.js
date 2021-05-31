import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Status from "./components/status/Status";
import Repositories from "./components/repositories/Repsitories";
import User from "./components/user/User";
import searchIcon from "../src/images/search.svg";
import notFoundIcon from "../src/images/notFound.svg";
import emptyIcon from "../src/images/empty.svg";

const PER_PAGE = 4;

function App() {
  const [error, setError] = useState(null);
  const [loadingUser, setLoadingUser] = useState("");
  const [user, setUser] = useState(null);
  const [userNameInput, setUserNameInput] = useState("");

  function handleOnChangeInput(event) {
    setUserNameInput(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      setLoadingUser(userNameInput);
      setError("");
    }
  }

  useEffect(() => {
    async function fetchUser(username) {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        !response.ok &&
          setError(
            response.status === 404 ? "User not found" : "Error fetching user"
          );
        const data = await response.json();
        console.log(data);
        setUser(data);
        setLoadingUser("");
      } catch (error) {
        setLoadingUser("");
        setError("Can not fetch this user");
      }
    }

    if (loadingUser) {
      fetchUser(loadingUser);
    }
  }, [loadingUser]);

  function renderContent() {
    if (error) return <Status img={notFoundIcon} text={error} />;
    if (loadingUser) return <p>Loading...</p>;
    if (!user)
      return (
        <Status img={searchIcon} text={"Start with searching a GitHub user"} />
      );
    const { avatar_url, name, login, followers, following, html_url } = user;
    return (
      <>
        <div className="content">
          <User
            avatar_url={avatar_url}
            name={name}
            login={login}
            followers={followers}
            following={following}
            html_url={html_url}
          />
          {user.public_repos === 0 ? (
            <Status img={emptyIcon} text={"Repository list is empty"} />
          ) : (
            <Repositories user={user} perPage={PER_PAGE} />
          )}
        </div>
      </>
    );
  }
  return (
    <div className="App">
      <Header
        handleKeyDown={handleKeyDown}
        handleOnChangeInput={handleOnChangeInput}
      />
      {renderContent()}
    </div>
  );
}

export default App;
