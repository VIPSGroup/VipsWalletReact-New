import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../assets/styles/home/services.css";
import "../../assets/styles/styles.css";

const ServiceCategory = () => {
  return (
    <>
      <section class="section-align services">
        <div class="container">
          <div class="container">
            <div class="section-head">
              <h2 class="section-head-title">
                <span>Recharge</span> & Pay Bills
              </h2>
              <p className="section-head-subtitle">
                Whatever your online payment requirement would be, VIPS Wallet
                offers them all under one roof.
              </p>
            </div>
          </div>

          <div class="row">
            {ServiceArr.map((e, i) => {
              return (
                <div key={i} class="col-sm-6 col-md-4 col-lg-3">
                  <Link to={e.route} class="services-div">
                    <div class="services-box">
                      <div class="services-box-icon">
                        <img
                          src={e.img}
                          alt="VIPS Services"
                          class="img-fluid service-icon"
                        />
                      </div>

                      <div class="service-title">
                        <h3>{e.title}</h3>
                      </div>

                      <p class="description">{e.desc}</p>
                    </div>
                  </Link>
                </div>
              );
            })}

            <div class="col-md-12 text-center">
              <div class="view-all-btn mt-1">
                <Link to="/services" class="btn-cta">
                  {" "}
                  View All{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </section>
    </>
  );
};

const ServiceArr = [
  {
    img: "/images/services/recharge.svg",
    title: "Recharge",
    route: "/services/mobile-recharge",
    desc: "Do your online mobile recharge on VIPS Wallet and receive a cashback of 2% on every recharge.",
  },
  {
    img: "/images/services/dth.svg",
    title: "DTH",
    route: "/services/dth",
    desc: "Recharge your DTH connections using VIPS Wallet and avail of 2% cashback.",
  },
  {
    img: "/images/services/digital-cable.svg",
    title: "Digital Cabel",
    route: "/services/digital-cable",
    desc: "Keep your T.V. connection running with an online recharge from VIPS Wallet every month.    ",
  },
  {
    img: "/images/services/broadBand.svg",
    title: "BroadBand",
    route: "/services/BroadBand",
    desc: "Don’t let the latest updates pause, recharge your broadband with VIPS Wallet, and receive 3% shopping points.",
  },
  {
    img: "/images/services/electricity.svg",
    title: "Electricity",
    route: "/services/electricity",
    desc: "Pay your electricity bill easily and add extra 5% shopping points to your VIPS Wallet account.",
  },
  {
    img: "/images/services/fastag.svg",
    title: "Fastag",
    route: "/services/fastag",
    desc: "Avoid paying double the toll cost, add money to your Fastag walled with VIPS Wallet and enjoy extra 5% shopping points credit to your VIPS Wallet account.",
  },
  {
    img: "/images/services/landline.svg",
    title: "LandLine",
    route: "/services/landline",
    desc: "Keep your closed ones always a call away, recharge your landline with VIPS Wallet and get 3% shopping points credited to your wallet account. ",
  },
  {
    img: "/images/services/piped-gas.svg",
    title: "Gas",
    route: "/services/gas",
    desc: "Skip past stepping out for gas payment; VIPS Wallet offers you a gas payment service with 5% shopping points.",
  },
];

export default ServiceCategory;
