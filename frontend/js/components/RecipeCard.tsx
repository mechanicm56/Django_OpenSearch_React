/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

import RECIPE_PLACEHOLDER from "../../assets/images/placeholder.jpg";
import { CarouselDataProps } from "./Carousel";
 
export default function RecipeCard({ item }: { item: CarouselDataProps }) {
  return (
    <Link to={`/recipe/${item._id}`}>
      <div className="recipe-card-3">
        <div className="recipe-cover">
          <img alt="cover img" src={RECIPE_PLACEHOLDER} />
        </div>

        <div className="recipe-info">
          {/* <span></span> */}
          <h4>{item.title}</h4>
          <div className="recipe-ratings">
            <Rating color="yellow" readOnly value={item.rating} />
          </div>
          <div className="recipe-overview">
            <div className="recipe-calories">{item.calories ?? 0}</div>
            <div className="recipe-serve">{item.protein ?? 0}</div>
            <div className="recipe-calories">{item.fat ?? 0}</div>
            <div className="recipe-calories">{item.sodium ?? 0}</div>
          </div>
          <div className="recipe-about">
            <p>{item?.desc?.length > 150 ? `${item.desc.slice(0, 100)  }...` : item.desc}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
