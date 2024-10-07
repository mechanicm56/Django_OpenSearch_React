/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GridItems from "../components/GridItems";
import API from "../utils/axios";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const params = useParams();

  const getCuisine = async (name) => {
    const api = await API.get(`/recipes/all?query=${name}`);
    const { data } = api;
    setCuisine(data.recipes);
  };

  // useEffect is a hook that runs when the component is mounted
  // and when the component is updated (when the state changes)
  // the second argument is an array of dependencies that will trigger the useEffect to run again
  useEffect(() => {
    // when the component is mounted, call the getCuisine function and pass the type from the url
    getCuisine(params.type);
  }, [params.type]);
  return <GridItems gridItems={cuisine} />;
}

export default Cuisine;
