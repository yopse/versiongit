import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const chartData = [
    {
      label: "HTML",
      value: "12",
    },
    {
      label: "CSS",
      value: "34",
    },
    {
      label: "Javascript",
      value: "50",
    },
  ];

  const { repos } = useContext(GithubContext);

  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;

    if (!language) return total;

    if (!total[language]) {
      total[language] = {
        label: language,
        value: 1,
        stars: stargazers_count,
      };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }

    return total;
  }, {});

  let mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  let mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((items) => {
      return {
        ...items,
        value: items.stars,
      };
    })
    .slice(0, 5);

  let { stars, forks } = repos.reduce(
    (total, items) => {
      let { stargazers_count, name, forks } = items;

      total.stars[stargazers_count] = {
        label: name,
        value: stargazers_count,
      };

      total.forks[stargazers_count] = {
        label: name,
        value: forks,
      };
      return total;
    },
    {
      stars: {},

      forks: {},
    }
  );

  let mostStars = Object.values(stars).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed}></Pie3D>
        <Column3D data={mostStars}></Column3D>
        <Doughnut2D data={mostPopular}></Doughnut2D>
        <Bar3D></Bar3D>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
    border: 2px solid pink;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
