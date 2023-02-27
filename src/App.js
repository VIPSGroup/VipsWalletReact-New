import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStateCityList } from "./redux/slices/signUpSlice";
import Router from "./router/Router";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStateCityList());
  }, []);

  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }
  return (
    <>
      <ScrollToTopOnMount />
      <Router />
    </>
  );
};

export default App;
