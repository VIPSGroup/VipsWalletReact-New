import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/home/Homepage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<Homepage />} path="/" />
      </Routes>
    </>
  );
};

export default Router;
