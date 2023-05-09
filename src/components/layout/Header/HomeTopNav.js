import "../../../assets/styles/core/homeTopNav.css";
import React, { useState, useEffect } from "react";

import { Link, useResolvedPath } from "react-router-dom";

import { FiUser } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { IoWalletOutline } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { vendorPanelAPi } from "../../../constants";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getWalletBalance } from "../../../redux/slices/payment/walletSlice";

const HomeTopNav = ({ isPrime }) => {
  const dispatch = useDispatch();
  const { pathname } = useResolvedPath();
  const { wishCount } = useSelector((state) => state?.wishlistSlice);
  const { cartCount } = useSelector((state) => state?.cartSlice);
  const { loggedInUser } = useSelector(
    (state) => state?.loginSlice?.loggetInWithOTP
  );
  const { data, loading } = useSelector(
    (state) => state.walletSlice.walletBalance
  );
  const handleSidebar=()=>{
    document.getElementById("sidebar").classList.remove("active");
  }
  const clickLogout = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to sign out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("user");
            localStorage.removeItem("digiUser");
            window.location.reload();
            return "Click Yes";
          },
        },
        {
          label: "No",
          onClick: () => "Click No",
        },
      ],
      overlayClassName: "overlay-custom-class-name",
    });
  };
  const CheckWalletBalance = async () => {
    const username = loggedInUser && loggedInUser?.UserName;
    const password = loggedInUser && loggedInUser?.TRXNPassword;
    dispatch(getWalletBalance({ username, password }));
  };
useEffect(() => {
}, [loggedInUser])

  const navSection = () => (
    <>
      <header class="header-main sticky-top">
        <nav class="navbar navbar-expand-md navbar-light bg-light nav-position">
          <div class="container-fluid flex-nowrap">
            <button
              type="button"
              id="sidebarCollapse"
              class="btn btn-link d-block d-xl-none"
              onClick={(e) => {
                document.getElementById("sidebar").classList.add("active");
              }}
            >
              <i class="fa-solid fa-bars"></i>
            </button>

            <Link class="navbar-brand " to="/">
              <img
                src="images/VipsLogoMain.png"
                alt="VIPS Logo"
                class="img-fluid vips-logo"
              />
            </Link>
            <nav class="left-navbar sub-menu d-none d-xl-block">
              <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbar">
                  <ul class="navbar-nav mx-auto">
                    {/* <Link to='/' className="nav-link">ss</Link> */}
                    <li class="nav-item active">
                      <Link class="nav-link" to="/"  style={{
                          borderBottomWidth: pathname === "/" && 2,
                          borderBottomColor: pathname === "/" && "#CA3060",
                          borderBottomStyle: pathname === "/" && "solid",
                        }}>
                        Home <span class="sr-only">(current)</span>
                      </Link>
                    </li>

                    {/* {<!-- Level one dropdown -->} */}
                    {/* <li class="nav-item "> */}
                    <Link to="/shopping" class="nav-link">
                      {" "}
                      Shopping{" "}
                    </Link>

                    {/* </li> */}
                    {/* { <!-- End Level one -->} */}

                    {/* {<!-- Level one dropdown -->} */}
                    {/* <li class="nav-item "> */}
                    <Link to="/services" class="nav-link ">
                      {" "}
                      Services{" "}
                    </Link>

                    {/* {<!-- End Level one -->} */}

                    <li class="nav-item">
                      <Link class="nav-link" to="/online-stores">
                        {" "}
                        Online Stores{" "}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        class="nav-link"
                        to={vendorPanelAPi}
                        target="_blank"
                      >
                        {" "}
                        Become a Supplier{" "}
                      </Link>
                    </li>
                    {/* <li class="nav-item">
                      <Link class="nav-link" to="/vipsgold">
                        VIPS Gold
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </nav>

            <div class="collapse navbar-collapse d-flex flex-row justify-content-end">
              <ul class="navbar-nav nabar-right-icon ml-auto flex-row">
                <li class="nav-item">
                  <Link
                    class="nav-link nav-icons"
                    to="/shopping/cart"
                    role="button"
                  >
                    {/* <img src="images/cart-icon.png" class="img-fluid nav-icon" /> */}
                    <Badge count={cartCount && cartCount.length}>
                    <AiOutlineShoppingCart className="nav-icon" />
                    </Badge>
                    <span class="d-xl-block d-none d-md-none d-sm-none">
                      {" "}
                      My Cart{" "}
                    </span>
                  </Link>
                </li>

                <li class="nav-item">
                  <Link
                    class="nav-link nav-icons"
                    to="/shopping/wishlist"
                    role="button"
                  >
                    {/* <img src="images/cart-icon.png" class="img-fluid nav-icon" /> */}
                    <Badge count={wishCount && wishCount?.length}>
                      <AiOutlineHeart className="nav-icon" />
                    </Badge>
                    <span class="d-xl-block d-none d-md-none d-sm-none">
                      {" "}
                      Wishlist{" "}
                    </span>
                  </Link>
                </li>

                {loggedInUser ? (
                  <li class="nav-item">
                    <Link
                      onClick={CheckWalletBalance}
                      class="nav-link nav-icons"
                      to="#"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {/* {<img src="/icons/wallet.png" class="img-fluid nav-icon" />} */}
                      <IoWalletOutline className="nav-icon" />
                      <span class="d-xl-block d-none d-md-none d-sm-none">
                        {" "}
                        My Wallet{" "}
                      </span>
                    </Link>

                    <div
                      class="dropdown-menu wallet-dropdown-position dropdown-menu-lg-right shadow-dark border-0"
                      aria-labelledby="navbarwallet"
                    >
                      <div class="nav-wallet-card">
                        <div class="nav-wallet-body">
                          <span class="nav-wallet-title">
                            {" "}
                            <IoWalletOutline /> Balance
                          </span>
                          <span class="nav-wallet-amt">
                            {" "}
                            &#x20B9;{" "}
                            {!loading && data
                              ? data?.Data?.Balance
                              : "..."}
                          </span>
                        </div>
                        <div class="dropdown-divider"></div>
                        <div class="nav-wallet-body nav-wallet-card-p">
                          <div class="row">
                            <div class="col col-xs-4 ">
                              <span>Prime Points : </span>
                            </div>
                            <div class="col col-xs-4 points-align">
                              <span class="nav-wallet-points">
                                {" "}
                                {!loading && data
                                  ? data?.Data?.PrimePoints
                                  : "..."}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="nav-wallet-body nav-wallet-card-p">
                          <div class="row">
                            <div class="col col-xs-4">
                              <span> Shopping Points: </span>
                            </div>
                            <div class="col col-xs-4 points-align">
                              <span class="nav-wallet-points">
                                {" "}
                                {!loading && data
                                  ? data?.Data?.Shoppingpoints
                                  : "..."}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="dropdown-divider"></div>

                        <div class="nav-wallet-body">
                          <div class="col-md-12">
                            <div class="row">
                              <div class="nav-wallet-btn">
                                <Link
                                  type="button"
                                  to="/add-money/options"
                                  class="btn-cta"
                                  style={{ textDecoration: "none" }}
                                >
                                  {" "}
                                  <img src="/images/wallet/add_money.svg" />{" "}
                                  <span> Add Money </span>
                                </Link>
                              </div>
                              <div class="nav-wallet-btn ml-auto">
                                <Link
                                  type="button"
                                  to="/sendMoney"
                                  class="btn-cta"
                                >
                                  {" "}
                                  <img src="/images/wallet/send_money.svg" />{" "}
                                  <span> Send Money </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : null}

                {loggedInUser ? (
                  <li class="nav-item dropdown login-dropdown">
                    <Link
                      class="nav-link nav-icons"
                      to="#"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FiUser className="nav-icon" />
                      <span class="d-xl-block d-none d-md-none d-sm-none">
                        {" "}
                        {loggedInUser?.Name?.substring(0, 7)}...{" "}
                      </span>
                    </Link>
                    <ul class="dropdown-menu dropdown-position profile-dropdown">
                      <li>
                        <Link
                          class="dropdown-item login-usar-name border-top-0"
                          to="#"
                        >
                          {" "}
                          {loggedInUser && loggedInUser?.Name}
                          {"  "}
                          {isPrime ? (
                            <FaCrown color="#ffbb48" size={18} />
                          ) : null}
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/my-account">
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/shopping/wishlist">
                          My Wishlist
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/passbook">
                          Passbook
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={clickLogout}
                          class="dropdown-item border-bottom-0"
                        >
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li class="nav-item">
                    <Link class="nav-link nav-icons" to="/login">
                      <FiUser className="nav-icon" />
                      <span class="d-xl-block d-none d-md-none d-sm-none">
                        {" "}
                        Sign in{" "}
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* {<!-- search form for desktop end --> */}

        {/* {<!-- header bottom start -->} */}
        <div class="section navbar-bottom-services">
          <div class="container-fluid">
            <div class="navbar-bottom-services-outer">
              <div class="navbar-bottom-serv-box">
                <Link to="/services/mobile-recharge">
                  <img src="/images/services/white-recharge.svg" />
                  <span class="navbar-bottom-serv-box-title">Recharge</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/dth">
                  <img src="/images/services/white-dth.svg" />
                  <span class="navbar-bottom-serv-box-title">DTH</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/fastag">
                  <img src="/images/services/white-fastag.svg" />
                  <span class="navbar-bottom-serv-box-title">Fastag</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/electricity">
                  <img src="/images/services/white-electricity.svg" />
                  <span class="navbar-bottom-serv-box-title">Electricity</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/digital-cable">
                  <img src="/images/services/white-digital-cable.svg" />
                  <span class="navbar-bottom-serv-box-title">
                    Digital Cable
                  </span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/landline">
                  <img src="/images/services/white-landline.svg" />
                  <span class="navbar-bottom-serv-box-title">LandLine</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/gas">
                  <img src="/images/services/white-piped-gas.svg" />
                  <span class="navbar-bottom-serv-box-title">Gas</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <div class="">
                  <Link to="/services">
                    <img
                      src="images/services/white-three-dot.svg"
                      class="vert-align"
                    />
                    <span class="navbar-bottom-serv-box-title">View More</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {<!-- header bottom end -->} */}
      </header>

      {/* {<!-- Sidebar start -->} */}
      <nav id="sidebar" class="sidebar-navigation">
        <div class="sidebar-header">
          {/* { <!-- <div class="container"> -->} */}
          <div class="row align-items-end justify-content-end">
            <div class="col-2 text-left sidebar-close-outer">
              <button
                type="button"
                id="sidebarCollapseX"
                class="btn btn-link sidebar-close"
                onClick={handleSidebar}
              >
                <i class="fa-sharp fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>

        <ul class="list-unstyled components links">
          <li class="" onClick={handleSidebar}>
            <Link to="/" > Home</Link>
          </li>

          {/* {<!-- with multiple submenu start -->} */}
          <li onClick={handleSidebar}>
            <Link to="/shopping">Shopping </Link>
          </li>

          <li onClick={handleSidebar}>
            <Link to="/services">Services </Link>
          </li>

          <li onClick={handleSidebar}>
            <Link to="/online-stores"> Online Stores</Link>
          </li>
          {/* <li>

            <Link to="/vipsgold">VIPS Gold</Link>
          </li> */}
          <li onClick={handleSidebar}>
            <Link to={vendorPanelAPi} target="_blank">
              {" "}
              Become a Supplier
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );

  return <>{navSection()}</>;
};

export default HomeTopNav;