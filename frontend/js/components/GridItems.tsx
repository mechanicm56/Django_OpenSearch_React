/* eslint-disable import/no-extraneous-dependencies */
import { Grid2 as Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

import type { CarouselDataProps } from "./Carousel";
import RecipeCard from "./RecipeCard";

function GridItems({ gridItems }: { gridItems: Array<CarouselDataProps> }) {
  return (
    <Grid container spacing={2}>
      {gridItems.map((item) => {
        return (
          <Grid key={item._id} size={6}>
            <RecipeCard item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default GridItems;
