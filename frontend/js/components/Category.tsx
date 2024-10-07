/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { Stack, Typography } from "@mui/material";

import API from "../utils/axios";
import React, { useEffect, useState } from "react";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import { NavLink, useParams } from "react-router-dom";
import { styled } from "styled-components";

function Category() {
  const [categories, setCategories] = useState([]);
  const params = useParams();

  const getCategories = async () => {
    const api = await API.get("/recipes/categories");
    const { data } = api;
    // console.log(data);
    setCategories(data);
  };

  // useEffect is a hook that runs when the component is mounted
  // and when the component is updated (when the state changes)
  // the second argument is an array of dependencies that will trigger the useEffect to run again
  useEffect(() => {
    // when the component is mounted, call the getCuisine function and pass the type from the url
    getCategories();
  }, [params.type]);
  return (
    <Stack>
      <Typography>
        <b>Categories</b>
      </Typography>
      <List>
        {categories.map((category, index) => (
          <SLink key={`category-${index}`} to={`/category/${category}`}>
            <h4>{category}</h4>
          </SLink>
        ))}
      </List>
    </Stack>
  );
}

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem 0rem;
`;
const SLink = styled(NavLink)`
  display: flex;
  padding: 5px 10px;
  margin: 5px;
  background: linear-gradient(35deg, #494949, #313131);
  width: fit-content;
  cursor: pointer;
  text-decoration: none;

  h4 {
    color: #fff;
    font-size: 0.7rem;
  }

  svg {
    color: #fff;
    font-size: 1.5rem;
  }

  &.active {
    background: linear-gradient(to right, #f27121, #e94057);

    h4 {
      color: #fff;
    }

    svg {
      color: #fff;
    }
  }

  @media (max-width: 767px) {
    width: 4rem;
    height: 4rem;

    h4 {
      font-size: 0.6rem;
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;

export default Category;
