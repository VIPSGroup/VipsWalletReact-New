import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getStateCityList } from "./redux/slices/profile/signUpSlice";
import Router from "./router/Router";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStateCityList());
  }, []);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  return (
    <>
      <Router />
    </>
  );
};

export default App;
