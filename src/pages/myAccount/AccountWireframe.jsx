import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { RiLockPasswordLine, RiFileListLine } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { FiUserPlus, FiUser } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import { getWalletBalance } from "../../apiData/user/userDetails";
import { googleAnalytics } from "../../constants";
import "../../assets/styles/myAccount/account.css";
import ReactGA from "react-ga";
import { useSelector } from "react-redux";
import { checkGABBalance } from "../../apiData/payments";
import { Profile } from "../../components/myAccount";
import EditProfile from "./EditProfile";
import ChangePassword from "../../components/myAccount/changePassword";
ReactGA.initialize(googleAnalytics);

const AccountWireframe = () => {
  const [selectedMenu, setSelectedMenu] = useState("myProfile");
  const [balance, setBalance] = useState(0);
  const [affiliateBalance, setAffiliateBalance] = useState(0);
  const [shoppingPoints, setShoppingPoints] = useState(0);
  const [primePoints, setPrimePoints] = useState(0);

  var navigate = useNavigate();
  const { loggedInUser } = useSelector(
    state => state.loginSlice.loggetInWithOTP
  );
  const selectedMenuStyle = {
    backgroundColor: "#CA3060",
    color: "#fff",
  };

  const handleMenuClick = (e) => {
    setSelectedMenu(e.target.value);
  };

  const clickSignout = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to sign out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("user");
            navigate("/");
            window.location.reload();
            return "Click Yes";
          },
        },
        {
          label: "No",
          onClick: () => "Click No",
        },
      ],
    });
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    const userName = loggedInUser.Mobile;
    const password = loggedInUser.TRXNPassword;
    getWalletBalance({ userName, password }).then((response) => {
      const res = response.Data;
      setBalance(res.Balance);

      setShoppingPoints(res.Shoppingpoints);
      setPrimePoints(res.PrimePoints);
    });
    checkGABBalance(loggedInUser.Mobile, loggedInUser.TRXNPassword).then((response) => {
      setAffiliateBalance(response.Data);
    });
  }, []);

  const accountSection = () => (
    <>
      <section class="inpage-section-align my-account">
        <div class="container">
          <div class="container">
            <div class="section-head">
              <h1 class="section-head-title">My Account</h1>
            </div>
          </div>

          <div class="col-md-12 my-account-info-outer">
            {/**  <!-- My account information start --> */}
            <div class="my-account-info box-shadow-1">
              <div class="container">
                <div class="my-account-info-inner">
                  <div class="my-account-info-box">
                    <div class="pf-user-outer">
                      <div class="pf-user-circle">
                        <label> {loggedInUser && loggedInUser.Name.substring(0, 1)} </label>
                      </div>
                      <div class="pf-user-name">
                        <p class="pf-user-title"> {loggedInUser && loggedInUser.Name} </p>
                        <p class="pf-user-info"> {loggedInUser && loggedInUser.Mobile} </p>
                        <p class="pf-user-info"> {loggedInUser && loggedInUser.Emailid} </p>
                      </div>
                    </div>
                  </div>

                  <div class="my-account-info-box">
                    <div class="pf-account-info">
                      <p class="pf-account-info-text"> Wallet Balance </p>
                      <p class="pf-account-info-amount"> ₹ {balance} </p>
                    </div>
                  </div>

                  <div class="my-account-info-box">
                    <div class="pf-account-info">
                      <p class="pf-account-info-text"> Affiliate Balance </p>
                      <p class="pf-account-info-amount">
                        {" "}
                        ₹ {affiliateBalance}{" "}
                      </p>
                    </div>
                  </div>

                  <div class="my-account-info-box">
                    <div class="pf-account-info">
                      <p class="pf-account-info-text"> Shopping Points </p>
                      <p class="pf-account-info-amount"> {shoppingPoints} </p>
                    </div>
                  </div>

                  <div class="my-account-info-box border-btm-no">
                    <div class="pf-account-info">
                      <p class="pf-account-info-text"> Prime Points </p>
                      <p class="pf-account-info-amount"> {primePoints} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/** <!-- My account information end --> */}
          </div>

          <div class="container">
            <div class="row">
              {/** <!-- tab panel start --> */}

              {/** <!-- dropdown for mobile start--> */}
              <div class="col-md-12 my-account-menu-dropdown-outer">
                <div class="my-account-menu ml-auto mr-3 d-sm-block d-lg-none">
                  <div class="dropdown my-account-menu-dropdown">
                    <Link
                      class=""
                      to="#"
                      role="button"
                      id="dropdownMenumore"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <span class="my-account-menu-title dropdown-toggle">
                        Select your option
                      </span>
                    </Link>

                    <div
                      class="dropdown-menu dropdown-menu-center"
                      aria-labelledby="dropdownMenumore"
                    >
                      <button
                        class="dropdown-item myaccount-links"
                        type="button"
                        value="myProfile"
                        onClick={handleMenuClick}
                        style={
                          selectedMenu == "myProfile" ? selectedMenuStyle : null
                        }
                      >
                        {" "}
                        <FiUser /> My Profile{" "}
                      </button>
                      <button
                        class="dropdown-item myaccount-links"
                        type="button"
                        value="editProfile"
                        onClick={handleMenuClick}
                      >
                        {" "}
                        <FiUser /> Edit Profile{" "}
                      </button>
                      {/* <button
                        class="dropdown-item myaccount-links"
                        type="button"
                        value="myProfile"
                        onClick={() => {
                          navigate("/MyOrder");
                        }}
                      >
                        {" "}
                        <BsCart4 /> My Order{" "}
                      </button> */}
                      <button
                        class="dropdown-item myaccount-links"
                        type="button"
                        value="myProfile"
                        onClick={() => {
                          navigate("/shopping/wishlist");
                        }}
                      >
                        {" "}
                        <AiOutlineHeart /> My Wishlist{" "}
                      </button>
                      {/* <button class="dropdown-item myaccount-links" type="button" value="myProfile" onClick={handleMenuClick}> <HiOutlineTicket/> My Booking </button> */}
                      <button
                        class="dropdown-item myaccount-links"
                        type="button"
                        value="myProfile"
                        onClick={() => {
                          navigate("/passbook");
                        }}
                      >
                        {" "}
                        <RiFileListLine /> Passbook{" "}
                      </button>
                      {/* <button
                        class="dropdown-item myaccount-links"
                        type="button"
                        value="myProfile"
                        onClick={() => {
                          navigate("/refer");
                        }}
                      >
                        {" "}
                        <FiUserPlus /> Invite & Earn{" "}
                      </button> */}
                      <button
                        class="dropdown-item myaccount-links"
                        type="button"
                        value="changePassword"
                        onClick={handleMenuClick}
                      >
                        {" "}
                        <RiLockPasswordLine /> Change Password{" "}
                      </button>
                      <button
                        class="dropdown-item myaccount-links"
                        type="button"
                        value="myProfile"
                        onClick={clickSignout}
                      >
                        <MdOutlineLogout /> Sign Out{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/** <!-- dropdown for mobile end--> */}

              <div class="col-lg-3 d-none d-lg-block d-sm-none my-account-left-outer">
                <div class="sidebar-item box-shadow-1">
                  {/* <div class="make-me-sticky"> */}
                  <div class="list-group">
                    <button
                      class="list-group-item "
                      type="button"
                      value="myProfile"
                      onClick={handleMenuClick}
                    >
                      {" "}
                      <FiUser /> My Profile{" "}
                    </button>
                    <button
                      class="list-group-item"
                      type="button"
                      value="editProfile"
                      onClick={handleMenuClick}
                    >
                      {" "}
                      <FiUser /> Edit Profile{" "}
                    </button>
                    {/* <button  class="list-group-item " type="button" value="myProfile" onClick={()=>{navigate("/MyOrder")}}> <BsCart4/> My Order </button> */}
                    <button
                      class="list-group-item "
                      type="button"
                      value="myProfile"
                      onClick={() => {
                        navigate("/shopping/wishlist");
                      }}
                    >
                      {" "}
                      <AiOutlineHeart /> My Wishlist{" "}
                    </button>
                    {/* <button
                      class="list-group-item "
                      type="button"
                      value="myProfile"
                      onClick={handleMenuClick}
                    >
                      {" "}
                      <HiOutlineTicket /> My Booking{" "}
                    </button> */}
                    <button
                      class="list-group-item "
                      type="button"
                      value="myProfile"
                      onClick={() => {
                        navigate("/passbook");
                      }}
                    >
                      {" "}
                      <RiFileListLine /> Passbook{" "}
                    </button>
                    {/* <button
                      class="list-group-item "
                      type="button"
                      value="myProfile"
                      onClick={() => {
                        navigate("/refer");
                      }}
                    >
                      {" "}
                      <FiUserPlus /> Invite & Earn{" "}
                    </button> */}
                    <button
                      class="list-group-item "
                      type="button"
                      value="changePassword"
                      onClick={handleMenuClick}
                    >
                      {" "}
                      <RiLockPasswordLine /> Change Password{" "}
                    </button>
                    <button
                      class="list-group-item "
                      type="button"
                      value="myProfile"
                      onClick={clickSignout}
                    >
                      {" "}
                      <MdOutlineLogout /> Sign Out{" "}
                    </button>
                  </div>
                  {/* </div> */}
                </div>
              </div>

              {selectedMenu == "myProfile" ? (
                <div class="col-sm-12 col-md-12 col-lg-9 my-account-right-outer">
                  <Profile />
                </div>
              ) : null}
              {selectedMenu == "editProfile" ? (
                <div class="col-sm-12 col-md-12 col-lg-9 my-account-right-outer">
                  <EditProfile />
                </div>
              ) : null}
              {selectedMenu == "changePassword" ? (
                <div class="col-sm-12 col-md-12 col-lg-9 my-account-right-outer">
                  <ChangePassword />
                </div>
              ) : null}

              {/** <!-- tab panel end --> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
  return (
    <div className="color-body">
    {accountSection()}
  </div>
  )
}

export default AccountWireframe