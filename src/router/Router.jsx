import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/layout/Footer/Footer";
import CommonTopNav from "../components/layout/Header/CommonTopNav";
import HomeTopNav from "../components/layout/Header/HomeTopNav";
import AllServicePage from "../pages/AllServicePage";
import Homepage from "../pages/home/Homepage";
import ShoppingHome from "../pages/shopping/ShoppingHome";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<Homepage HomeTopNav={HomeTopNav} />} path="/" />
        <Route
          element={<ShoppingHome CommonTopNav={CommonTopNav} />}
          path="/shopping"
        />
        <Route
          element={<AllServicePage CommonTopNav={CommonTopNav} />}
          path="/services"
        />
      </Routes>
      <Footer/>
    </>
  );
};

export default Router;
