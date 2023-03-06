import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserReferal, getMerchantReferal } from "../../apiData/user/refer";
import "../../assets/styles/referAFriend.css";


const ReferAFriend = ({setIsBottomTopNav}) => {
  const [userRef, setUserRef] = useState([]);
  const [merchantRef, setMerchantRef] = useState([]);
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  useEffect(() => {
    setIsBottomTopNav(true)
    // const user = JSON.parse(localStorage.getItem("user"));
    getUserReferal(loggedInUser.Mobile, loggedInUser.TRXNPassword).then((response) => {
      setUserRef(response.Data);
    });
    getMerchantReferal(loggedInUser.Mobile, loggedInUser.TRXNPassword).then((response) => {
      setMerchantRef(response.Data);
    });
    return ()=>{setIsBottomTopNav(false)}
  }, []);
  return (
    <>
      {/** <!-- refer friend banner start --> */}
      <section class=" refer-friend-banner">
        <div class="">
          <div
            class="refer-friend-top-banner shadow-light"
            style={{
              backgroundImage:
                "url(/images/referAFriend/refer-friend-banner-bg.png)",
            }}
          >
            <div class="container position-relative zindex-1">
              <div class="row  text-center align-content-center justify-content-between ">
                <div class="col-12 col-md-7 pr-md-5 text-left align-self-center ">
                  <h1 class="refer-frend-banner-title">
                    {" "}
                    Earn by just referring!{" "}
                  </h1>

                  <p class="refer-frend-banner-text">
                    Refer VIPS Wallet to your friends and get 50 shopping
                    points. And earn passive income, by referring to the VIPS
                    Prime Membership program.
                  </p>
                  <div class="refer-frend-banner-btn">
                    <a href="#" class="btn btn-primery mr-2">
                      Invite User
                    </a>
                    <a href="#" class="btn btn-primery">
                      Invite Merchant
                    </a>
                  </div>
                </div>
                <div class="col-12 col-md-5">
                  <div class="h-100">
                    <div class="">
                      <img
                        src="/images/referAFriend/refer-friend.png"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/** <!-- refer friend banner end --> */}

      {/** <!-- Three steps to Invite and Earn start --> */}
      <section class="section-align three-steps-invite">
        <div class="container">
          <div class="refer-friend-section-head">
            <h1 class="refer-friend-head-title">
              {" "}
              Three steps to Invite and Earn{" "}
            </h1>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4 three-steps-box-align">
              <a class="three-steps-outer">
                <div class="three-steps-invite-box">
                  <div class="three-steps-invite-box-icon">
                    <img
                      src="/images/referAFriend/invite-earn-1.png"
                      alt="VIPS Services"
                      class="img-fluid three-steps-invite-icon "
                    />
                  </div>

                  <div class="three-steps-invite-title">
                    <h3>Invite Friends To VIPS Wallet</h3>
                  </div>
                </div>
              </a>
            </div>

            <div class="col-sm-12 col-md-4 three-steps-box-align">
              <a class="three-steps-outer">
                <div class="three-steps-invite-box">
                  <div class="three-steps-invite-box-icon">
                    <img
                      src="/images/referAFriend/invite-earn-2.png"
                      alt="VIPS Services"
                      class="img-fluid three-steps-invite-icon"
                    />
                  </div>

                  <div class="three-steps-invite-title">
                    <h3>Your Friend Will get 50 Shopping Points</h3>
                  </div>
                </div>
              </a>
            </div>

            <div class="col-sm-12 col-md-4 three-steps-box-align">
              <a class="three-steps-outer">
                <div class="three-steps-invite-box">
                  <div class="three-steps-invite-box-icon">
                    <img
                      src="/images/referAFriend/invite-earn-3.png"
                      alt="VIPS Services"
                      class="img-fluid three-steps-invite-icon"
                    />
                  </div>

                  <div class="three-steps-invite-title">
                    <h3>
                      You will receive reward when your Friends Use VIPS Wallet
                      Services
                    </h3>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/** <!-- Three steps to Invite and Earn start --> */}

      {/** <!-- Invitation Record start --> */}
      <section class="section-align three-steps-invite">
        <div class="container">
          <div class="refer-friend-section-head">
            <h1 class="refer-friend-head-title"> Invitation Record </h1>
          </div>

          <div class="row">
            {/** <!-- user side start --> */}
            <div class="col-sm-12 col-lg-6">
              <div class="invite-record-outer box-shadow-1">
                <div class="col-md-12 invite-record-head d-flex">
                  <h3 class="invite-record-title"> User </h3>
                  <h3 href="#" class="invite-record-count ml-auto">
                    {" "}
                    Count : {userRef && userRef.length}{" "}
                  </h3>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    {userRef && userRef.length < 1 ? (
                      <div class="text-center text-muted">
                        <img src="/images/No_Data.svg" />
                      </div>
                    ) : null}

                    <div class="invite-recordx-box">
                      {userRef &&
                        userRef.map((u, i) => (
                          <div class="row invite-record-list">
                            <div class="col-sm-6 col-lg-6 invite-record-label-left">
                              <p class="invitename-frst-ltr">
                                {" "}
                                {u.Firstname.substring(0, 1)}{" "}
                              </p>{" "}
                              <label class="">
                                {u.Firstname + `  ` + u.Lastname}
                              </label>
                            </div>
                            <div class="col-sm-6 col-lg-6 invite-record-label-right">
                              <label class=""> 01 Oct 2022 </label>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/** <!-- user side end --> */}

            {/** <!-- merchent side start --> */}
            <div class="col-sm-12 col-lg-6">
              <div class="invite-record-outer box-shadow-1">
                <div class="col-md-12 invite-record-head d-flex">
                  <h3 class="invite-record-title"> Merchant </h3>
                  <h3 href="#" class="invite-record-count ml-auto">
                    {" "}
                    Count : {merchantRef && merchantRef.length}{" "}
                  </h3>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div className="invite-recordx-box">
                      {merchantRef && merchantRef.length < 1 ? (
                        <div class="text-center text-muted">
                          <img src="/images/No_Data.svg" />
                        </div>
                      ) : null}

                      {merchantRef &&
                        merchantRef.map((m, i) => (
                          <div class="row invite-record-list">
                            <div class="col-sm-6 col-lg-6 invite-record-label-left">
                              <p class="invitename-frst-ltr">
                                {" "}
                                {m.FName && m.FName.substring(0, 1)}{" "}
                              </p>{" "}
                              <label class="">
                                {" "}
                                {m.FName + `  ` + m.LName}
                              </label>
                            </div>
                            <div class="col-sm-6 col-lg-6 invite-record-label-right">
                              <label class=""> 01 Oct 2022 </label>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/** <!-- merchent side end -->
             */}
          </div>
        </div>
      </section>
      {/** <!-- Invitation Record end --> */}
    </>
  )
}

export default ReferAFriend