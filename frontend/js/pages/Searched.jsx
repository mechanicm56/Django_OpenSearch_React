/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GridItems from "../components/GridItems";
import API from "../utils/axios";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const params = useParams();

  const getSearched = async (term) => {
    const api = await API.get(`/recipes/all?query=${term}`);
    const { data } = api;
    setSearchedRecipes(data.recipes);
  };

  useEffect(() => {
    getSearched(params.term);
  }, [params.term]);

  return <GridItems gridItems={searchedRecipes} />;
}

export default Searched;
