import React from "react";
import { Link, Outlet } from "react-router-dom";
// import "../../assets/styles/home/serviceByCategory.css";
import "../../assets/styles/styles.css";

const ServiceCategory = () => {
  return (
    <>
      <section class="section-align services">
        <div class="container">
          <div class="container">
            <div class="section-head">
              <h1 class="section-head-title">
                <span>Recharge</span> & Pay Bills
              </h1>
              <p className="section-head-subtitle">
                Ease the transaction and payments hassle with tech that's
                convenient to use.
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
    route: "/services/mobilerecharge",
    desc: "Get Instant 2% Cashback On Mobile Recharge",
  },
  {
    img: "/images/services/dth.svg",
    title: "DTH",
    route: "/services/dth",
    desc: "Get Instant 2% Cashback On Mobile Recharge",
  },
  {
    img: "/images/services/digital-cable.svg",
    title: "Digital Cabel",
    route: "/services/digitalCable",
    desc: "Conveniently recharge your digital cable connection..",
  },
  {
    img: "/images/services/broadBand.svg",
    title: "BroadBand",
    route: "/services/BroadBand",
    desc: "Get Instant 3% Shopping Points on",
  },
  {
    img: "/images/services/electricity.svg",
    title: "Electricity",
    route: "/services/electricity",
    desc: "Get Instant 5% Shopping points",
  },
  {
    img: "/images/services/fastag.svg",
    title: "Fastag",
    route: "/services/fastag",
    desc: "Get Instant 5% Shopping points",
  },
  {
    img: "/images/services/landline.svg",
    title: "LandLine",
    route: "/services/landline",
    desc: "Get Instant 3% Shopping Points on",
  },
  {
    img: "/images/services/piped-gas.svg",
    title: "Gas",
    route: "/services/gas",
    desc: "Get Instant 5% Shopping points",
  },
];

export default ServiceCategory;
