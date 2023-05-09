import { Link } from "react-router-dom";

import React from "react";

const HomeBottomServiceBar = () => {
  return (
    <>
      <div class="section header-bottom">
        <div class="container-fluid">
          <div class="bottom-header-outer">
            {HomeBottomServiceMenu.map((e, i) => {
              return (
                <div key={i} class="top-serv-box">
                  <Link to={e.route}>
                    <div class="top-serv-box-icon">
                      <img alt="" src={e.img} class="img-fluid top-serv-icon" />
                    </div>
                    <span class="top-serv-box-title">{e.title}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export const HomeBottomServiceMenu = [
  {
    img: "images/services/recharge.svg",
    title: "Recharge",
    route: "/services/mobile-recharge",
  },
  {
    img: "images/services/dth.svg",
    title: "DTH",
    route: "/services/dth",
  },
  {
    img: "images/services/fastag.svg",
    title: "Fastag",
    route: "/services/fastag",
  },
  {
    img: "images/services/electricity.svg",
    title: "Electricity",
    route: "/services/electricity",
  },
  {
    img: "images/services/digital-cable.svg",
    title: " Digital Cable",
    route: "/services/digital-cable",
  },
  {
    img: "images/services/landline.svg",
    title: "LandLine",
    route: "/services/landline",
  },
  {
    img: "images/services/piped-gas.svg",
    title: "Gas",
    route: "/services/gas",
  },
  {
    img: "images/services/lpg-gas.svg",
    title: "LPG Gas",
    route: "/services/gas",
  },
  {
    img: "images/services/three-dot.svg",
    title: "View More",
    route: "/services",
  },
];

export default HomeBottomServiceBar;
