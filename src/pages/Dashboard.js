import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
const Dashboard = () => {
  return (
    <main>
      <Navbar></Navbar>
      <Info></Info>
      <Repos></Repos>
      <User></User>
      <Search></Search>
    </main>
  );
};

export default Dashboard;
