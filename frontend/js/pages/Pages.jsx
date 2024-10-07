/* eslint-disable import/no-extraneous-dependencies */
import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Cuisine from "./Cuisine";
import Home from "./Home";
import Recipe from "./Recipe";
import Searched from "./Searched";

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} Location={location}>
        <Route element={<Home />} path="/" />
        <Route element={<Cuisine />} path="/category/:type" />
        <Route element={<Searched />} path="/searched/:term" />
        <Route element={<Recipe />} path="/recipe/:id" />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
