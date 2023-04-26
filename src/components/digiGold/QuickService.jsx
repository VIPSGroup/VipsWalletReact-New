import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quickServiceArr } from "../../pages/digiGold/DigiGoldHome";
import { MuiSnackBar } from "../common";

const QuickService = ({
  setActive,
  setAmount,
  setGrams,
  setErr,
  setReceiverUserName,
}) => {
  const navigate = useNavigate();
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  return (
    <>
      <section class="digi-gold-section-wrapper digital-gold-services">
        <div class="container">
          <div class="digigold-service-box-outer">
            {quickServiceArr.map((e) => {
              return (
                <div
                  onClick={() => {
                    // if (e.title === "DELIVERY") {
                    //   setIsSnackBar(true);
                    //   setErrorMsg("Service will be coming soon..");
                    // } else {
                    navigate(e.route, { state: e.buy });
                    // }

                    // setActive(e.buy);
                  }}
                  class="digigold-service-box-inner"
                >
                  <div class="digigold-service-div-outer">
                    <div class="digigold-service-div-box">
                      <div
                        onClick={() => {
                          if (e.title !== "DELIVERY") {
                            setActive(e.buy);
                            setAmount("");
                            setGrams("");
                            setErr("");
                            setReceiverUserName("");
                            window.scroll({ top: 0, behavior: "smooth" });
                          }
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
      <MuiSnackBar
        open={isSnackBar}
        setOpen={setIsSnackBar}
        successMsg={successMsg}
        errorMsg={errorMsg}
        setSuccess={setSuccessMsg}
        setError={setErrorMsg}
      />
    </>
  );
};

export default QuickService;
