import { useEffect, useState } from "react";

import API from "../utils/axios";

import Carousel from "./Carousel";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  // useEffect is a React hook that runs a function when the component is mounted
  // The second argument is an array of dependencies.
  // If the array is empty, the function will only run once when the component is mounted
  useEffect(() => {
    getPolular();
  }, []);

  const getPolular = async () => {
    const check = localStorage.getItem("popular");
    // If the data is in local storage, use that data
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await API.get("/recipes/all");
      const { data } = api;
      // Save the data to local storage
      localStorage.setItem("popular", JSON.stringify(data?.recipes));
      // Update the state with the data from the API
      setPopular(data?.recipes);
    }
  };

  return (
    <div>
      <Carousel carouselData={popular} carouselTitle="Popular" />
    </div>
  );
}
