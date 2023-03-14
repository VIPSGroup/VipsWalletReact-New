import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getStateCityList } from "./redux/slices/profile/signUpSlice";
import Router from "./router/Router";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStateCityList());
  }, []);
  function ScrollToTop() {
    const { pathname } = useLocation();
    const prevScrollY = useRef(0);

    useEffect(() => {
      const onBackButtonEvent = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        window.history.back();
      };

      if (window.location.href.includes("#")) {
        const hash = window.location.href.split("#")[1];
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView();
        }
      } else if (pathname !== window.location.pathname) {
        prevScrollY.current = window.scrollY;
        window.scrollTo(0, 0);
      } else if (pathname === window.location.pathname) {
        window.scrollTo(0, prevScrollY.current);
        window.onpopstate = onBackButtonEvent;
      }

      return () => {
        window.onpopstate = null;
      };
    }, [pathname]);

    return null;
  }
  return (
    <>
      <ScrollToTop />
      <Router />
    </>
  );
};

export default App;
