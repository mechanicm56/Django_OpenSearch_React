/* eslint-disable import/no-extraneous-dependencies */
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";

const SearchHistory = ({ input }: { input: string }) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    // If the input is empty, don't add it to the search history
    if (input.length === 0) return;

    setSearchHistory([input, ...searchHistory].slice(0, 5));
  }, [input]);

  return (
    <List style={{ minHeight: 90 }}>
      <h3 style={{ marginBottom: 10 }}>Recent Searches</h3>
      {searchHistory.length > 0 ? (
        searchHistory.map((query, index) => (
          <LinkAnchor key={index} to={`/searched/${query}`}>
            <ListItem active={location.pathname === `/searched/${query}`}>
              <FaArrowRight />
              &emsp;{query}
            </ListItem>
          </LinkAnchor>
        ))
      ) : (
        <Typography>No History Available</Typography>
      )}
    </List>
  );
};

const List = styled.ul`
  padding: 0;
  margin: 1rem;

  h3 {
    margin-left: -1rem;
  }
`;

const LinkAnchor = styled(Link)`
  text-decoration: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ active }) => (active ? "#1C2331" : "#9B9B9B")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  cursor: ${({ active }) => (active ? "default" : "pointer")};

  &:hover {
    color: #1c2331;
  }
`;

export default SearchHistory;
