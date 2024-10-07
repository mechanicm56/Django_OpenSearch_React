/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
/* eslint-disable sonarjs/no-all-duplicated-branches */
/* eslint-disable import/no-extraneous-dependencies */
import { Grid2 as Grid } from "@mui/material";

import RecipeCard from "./RecipeCard";

export type CarouselDataProps = {
  _id: string | number;
  title: string;
  image: string;
  calories: string | number;
  protein: string | number;
  fat: string | number;
  sodium: string | number;
  rating: number;
  desc: string;
};

type CarouselProps = {
  carouselTitle: string;
  carouselData: Array<CarouselDataProps>;
};

function Carousel({ carouselTitle, carouselData }: CarouselProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <h3>{carouselTitle}</h3>
      </Grid>
      {carouselData.map((item) => {
        return (
          <Grid key={item._id} size={6}>
            <RecipeCard item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Carousel;
