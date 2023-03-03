import React, { useState, useEffect } from "react";

// import { getProfileDetails } from "../../apiData/user/profile";

import { FiUser } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { listStateAndCity } from "../../apiData/authentication/signup";
import { FaCrown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getProfileDetails } from "../../redux/slices/profile/profileSlice";

const Profile = () => {
  const [slectedSection, setSelectedSection] = useState("profile");
  const [selectedState, setSelectedState] = useState("-");
  const [selectedCity, setSelectedCity] = useState("-");
  const [userDetails, setUserDetails] = useState({});
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  // console.log(loggedInUser.Mobile, loggedInUser.TRXNPassword)
  useEffect(() => {
    getProfileDetails(loggedInUser.Mobile, loggedInUser.TRXNPassword).then(
      (response) => {
        console.log(response, "aaa");
        setUserDetails(response.Data[0]);
        listStateAndCity().then((res) => {
          let obj = res.Data.find((o) => o.Id === response.Data[0].StateId);

          setSelectedState(obj.StateName);
          obj.Citys.map((o) => {
            if (o.Id === response.Data[0].CityId) {
              setSelectedCity(o.CityName);
            }
          });
        });
      }
    );
  }, []);

  const myProfileSection = () => (
    <>
      <div class="my-account-right">
        <div class="my-account-content box-shadow-1">
          <div class="my-account-content-inner">
            <div class="row">
              <div class="col-md-12 my-account-head d-flex">
                <h3 class="my-account-title">My Profile</h3>
                {/* {                              <a href="#" class="my-account-edit ml-auto"> Edit Profile </a> */}
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <form>
                  <div class="row content-box-div">
                    <div class="col-sm-5">
                      <label class="">
                        {" "}
                        <FiUser /> Username
                      </label>
                    </div>
                    <div class="col-sm-7">
                      <label class="">
                        {userDetails &&
                          userDetails.FName + " " + userDetails.LName}{" "}
                      </label>
                    </div>
                  </div>

                  <div class="row content-box-div">
                    <div class="col-sm-5">
                      <label class="">
                        {" "}
                        <IoCallOutline /> Mobile Number
                      </label>
                    </div>
                    <div class="col-sm-7">
                      <label class="">
                        +91 {userDetails && userDetails.Mobile}
                      </label>
                    </div>
                  </div>

                  <div class="row content-box-div">
                    <div class="col-sm-5">
                      <label class="">
                        {" "}
                        <MdOutlineEmail /> Email Id
                      </label>
                    </div>
                    <div class="col-sm-7">
                      <label class="">
                        {userDetails && userDetails.EmailId}
                      </label>
                    </div>
                  </div>
                  {userDetails && userDetails.ReferenceName ? (
                    <div class="row content-box-div">
                      <div class="col-sm-5">
                        <label class="">
                          {" "}
                          <FiUser /> Ref. Name
                        </label>
                      </div>
                      <div class="col-sm-7">
                        <label class="">
                          {userDetails && userDetails.ReferenceName}
                        </label>
                      </div>
                    </div>
                  ) : null}
                  {userDetails && userDetails.ReferenceMobile ? (
                    <div class="row content-box-div">
                      <div class="col-sm-5">
                        <label class="">
                          {" "}
                          <IoCallOutline /> Ref. Number
                        </label>
                      </div>
                      <div class="col-sm-7">
                        <label class="">
                          +91 {userDetails && userDetails.ReferenceMobile}
                        </label>
                      </div>
                    </div>
                  ) : null}

                  <div class="row content-box-div">
                    <div class="col-sm-5">
                      <label class="">
                        {" "}
                        <GoLocation /> Pincode
                      </label>
                    </div>
                    <div class="col-sm-7">
                      <label class="">
                        {userDetails && userDetails.Pincode}
                      </label>
                    </div>
                  </div>

                  <div class="row content-box-div">
                    <div class="col-sm-5">
                      <label class="">
                        {" "}
                        <GoLocation /> State
                      </label>
                    </div>
                    <div class="col-sm-7">
                      <label class="">{selectedState}</label>
                    </div>
                  </div>

                  <div class="row content-box-div">
                    <div class="col-sm-5">
                      <label class="mb-0">
                        {" "}
                        <GoLocation /> City
                      </label>
                    </div>
                    <div class="col-sm-7">
                      <label class="mb-0">{selectedCity}</label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return <>{myProfileSection()}</>;
};

export default Profile;
