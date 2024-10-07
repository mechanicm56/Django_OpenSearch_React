/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import RECIPE_PLACEHOLDER from "../../assets/images/placeholder.jpg";
import API from "../utils/axios";

function Recipe() {
  const [details, setDetails] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const api = await API.get(`/recipes/all?id=${params.id}`);
      const { data } = api;
      setDetails(data?.recipe);
    };

    fetchDetails();
  }, [params.id]);

  // Find all the periods in the instructions with no spces and replace them with a period and a new line
  // const instructions = details.instructions ? details.instructions.replace(/\.(?=[^\s])/g, ".</br>") : "";

  return (
    <div>
      <Header>{details.title}</Header>
      <Wrapper>
        <LeftColumn>
          <img alt={details.title} src={details.image ?? RECIPE_PLACEHOLDER} />
        </LeftColumn>
        <RightColumn>
          <h4>Ingredients</h4>
          <ul>
            {details?.ingredients?.length > 0 ? (
              details.ingredients.map((item, index) => <li key={`ingredient-${index}`}>{item}</li>)
            ) : (
              <Typography>No Ingredients Available</Typography>
            )}
          </ul>
        </RightColumn>
      </Wrapper>
      <Info>
        <h5>Description</h5>
        {details?.desc}
        <h5>Instructions</h5>
        <ul>
          {details?.directions?.length > 0 ? (
            details.directions.map((item, index) => <li key={`direction-${index}`}>{item}</li>)
          ) : (
            <Typography>No Directions Available</Typography>
          )}
        </ul>
        {/* <Instructions dangerouslySetInnerHTML={{ __html: details.directions }} /> */}
        {/* <Summary dangerouslySetInnerHTML={{ __html: details.desc }} /> */}
      </Info>
    </div>
  );
}

const Header = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LeftColumn = styled.div`
  width: 50%;

  img {
    width: 100%;
    border-radius: 8px;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const RightColumn = styled.div`
  width: 50%;
  padding-left: 1rem;

  h4 {
    font-size: 1.2rem;
  }

  ul {
    font-size: 0.8rem;
    padding-left: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding-left: 0;
    h4 {
      margin-top: 2rem;
    }
  }
`;

const Info = styled.div`
  margin-bottom: 2rem;
  h5 {
    font-size: 1.2rem;
    margin: 2rem 0 1rem 0;
  }
`;

const Instructions = styled.p`
  margin-bottom: 2rem;
`;

const Summary = styled.p`
  font-size: 0.8rem;
`;

export default Recipe;
