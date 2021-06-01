import React from "react";
import styles from "./User.module.css";
import followers_icon from "../../images/followers.svg";
import following_icon from "../../images/following.svg";

const User = (props) => {
  const { avatar_url, name, login, followers, following, html_url } = props;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={avatar_url} alt="" className={styles.user_img} />
        <h3>{name}</h3>
        <a
          href={html_url}
          className={styles.login}
          target="_blank"
          rel="noreferrer"
        >
          {login}
        </a>
        <div className={styles.follow}>
          <img src={followers_icon} alt="" />
          <p>{followers} followers</p>
          <img src={following_icon} alt="" />
          <p>{following} following</p>
        </div>
      </div>
    </div>
  );
};

export default User;
