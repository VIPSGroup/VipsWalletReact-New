import React from "react";
import { useNavigate } from "react-router-dom";
import { quickServiceArr } from "../../pages/digiGold/DigiGoldHome";

const QuickService = ({ setActive }) => {
  const navigate = useNavigate();
  return (
    <>
      <section class="digi-gold-section-wrapper digital-gold-services">
        <div class="container">
          <div class="digigold-service-box-outer">
            {quickServiceArr.map((e) => {
              return (
                <div
                  onClick={() => {
                    navigate(e.route, { state: e.buy });
                    // setActive(e.buy);
                  }}
                  class="digigold-service-box-inner"
                >
                  <div class="digigold-service-div-outer">
                    <div class="digigold-service-div-box">
                      <div
                        onClick={() => {
                          setActive(e.buy);
                          window.scroll({ top: 0, behavior: "smooth" });
                        }}
                        class="digigold-service-icon"
                      >
                        <img
                          src={`images/digigold-images/${e.img}`}
                          alt="VIPS Gold Silver Services"
                          class="img-fluid digigold-service-img"
                        />
                      </div>

                      <div class="digigold-service-title">
                        <h3>{e.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default QuickService;
