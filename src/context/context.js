import React, { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

export const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [githubUser, setGitHubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  //Requests & Loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Error

  const [error, setError] = useState({
    show: false,
    msg: "",
  });

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry you have ran out of the requests");
        }
      })
      .catch((error) => console.log(error));
  };

  //Toggle error

  const toggleError = (show = false, msg = "") => {
    setError({
      show,
      msg,
    });
  };

  // searchUser

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);

    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    );

    if (response) {
      setGitHubUser(response.data);

      const { login, followers_url } = response.data;

      axios(`${rootUrl}/users/${user}/repos?per_page=100`).then((repos) => {
        setRepos(repos.data);
      });

      axios(`${rootUrl}/users/${user}/followers`).then((followers) => {
        setFollowers(followers.data);
      });
    } else {
      toggleError(true, "sorry we couldn't find a user with this username");
    }

    setIsLoading(false);
    checkRequests();
  };

  useEffect(checkRequests, []);

  useEffect(() => {
    setTimeout(toggleError, 5000);
  }, [error.show]);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        isLoading,
        requests,

        searchGithubUser,
        error,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
