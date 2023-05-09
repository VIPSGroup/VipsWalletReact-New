import React from "react";
import { Link } from "react-router-dom";

const HeaderBottomService = () => {
  return (
    <>
      <div class="section inpage-navbar-bottom-services">
        <div class="container-fluid">
          <div class="navbar-bottom-services-outer">
            {HeaderBottomMenu.map((e, i) => {
              return (
                <div key={i} class="navbar-bottom-serv-box">
                  <Link to={e.route}>
                    <img alt="" src={e.img} />

                    <span class="navbar-bottom-serv-box-title">{e.title}</span>
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

export const HeaderBottomMenu = [
  {
    img: "/images/services/white-recharge.svg",
    title: "Recharge",
    route: "/services/mobile-recharge",
  },
  {
    img: "/images/services/white-dth.svg",
    title: "DTH",
    route: "/services/dth",
  },
  {
    img: "/images/services/white-fastag.svg",
    title: "Fastag",
    route: "/services/fastag",
  },
  {
    img: "/images/services/white-electricity.svg",
    title: "Electricity",
    route: "/services/electricity",
  },
  {
    img: "/images/services/white-digital-cable.svg",
    title: " Digital Cable",
    route: "/services/digital-cable",
  },
  {
    img: "/images/services/white-landline.svg",
    title: "LandLine",
    route: "/services/landline",
  },
  {
    img: "/images/services/white-piped-gas.svg",
    title: "Gas",
    route: "/services/gas",
  },
  {
    img: "/images/services/white-three-dot.svg",
    title: "View More",
    route: "/services",
  },
];

export default HeaderBottomService;
