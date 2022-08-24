import React, { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

export const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  return (
    <GithubContext.Provider value={"roll nd slice"}>
      {children}
    </GithubContext.Provider>
  );
};
