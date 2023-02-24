import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStateCityList } from "./redux/slices/signUpSlice";
import Router from "./router/Router";

const App = () => {
 const dispatch= useDispatch()
  useEffect(() => {
    dispatch(getStateCityList())
  }, [])
  
  return (
    <>
      <Router />
    </>
  );
};

export default App;
