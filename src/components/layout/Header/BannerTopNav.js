import "../../../assets/styles/core/BannerTopNav.css";
import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { IoWalletOutline } from "react-icons/io5";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { vendorPanelAPi } from "../../../constants";
import { Badge } from "antd";
import { getWalletBalance } from "../../../redux/slices/payment/walletSlice";

const BannerTopNav = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { wishCount } = useSelector((state) => state.wishlistSlice);
  const { data, loading } = useSelector(
    (state) => state.walletSlice.walletBalance
  );
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

  const section = () => (
    <>
      <header class="header-main sticky-top">
        <nav class="navbar navbar-expand-md navbar-light bg-light inside-home-nav-position">
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
                    <li class="nav-item active">
                      <Link class="nav-link" to="/">
                        Home <span class="sr-only">(current)</span>
                      </Link>
                    </li>

                    {/* { <!-- Level one dropdown -->} */}
                    <li class="nav-item ">
                      <Link to="/shopping" class="nav-link ">
                        Shopping
                      </Link>
                    </li>
                    {/* {<!-- End Level one -->

            <!-- Level one dropdown -->} */}
                    <li class="nav-item ">
                      <Link to="/services" class="nav-link ">
                        Services
                      </Link>
                    </li>
                    {/* { <!-- End Level one -->} */}

                    <li class="nav-item">
                      <Link class="nav-link" to="/onlinestores">
                        Online Stores
                      </Link>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href={vendorPanelAPi} target="_blank">
                        Become a Supplier
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div class="collapse navbar-collapse d-flex flex-row justify-content-end">
              <ul class="navbar-nav nabar-right-icon ml-auto flex-row">
                {/* <li class="nav-item d-xl-block d-md-block d-none d-sm-block">
          <a class="nav-link nav-icons toggle-search" href="javascript:;">
            
            <FiSearch className="nav-icon"/>
            <span class="d-none d-xl-block d-md-none d-sm-none"> Search </span></a>
        </li> */}

                <li class="nav-item">
                  <Link
                    class="nav-link nav-icons"
                    to="/shopping/cart"
                    role="button"
                  >
                    {/* <img src="images/cart-icon.png" class="img-fluid nav-icon" /> */}
                    {/* <Badge count={cartCount && cartCount?.length}> */}
                    <AiOutlineShoppingCart className="nav-icon" />
                    {/* </Badge> */}
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
                            &#x20B9;
                            {!loading && data
                              ? data?.Data?.Balance
                              : "Loading..."}
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
                                  : "Loading..."}
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
                                  : "Loading..."}
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
                                  to="/addMoney/options"
                                  class="btn-cta"
                                  style={{ textDecoration: "none" }}
                                >
                                  {/* <i class="fa-solid fa-wallet"></i> Add Money */}
                                  <img
                                    src="/images/wallet/add_money.svg"
                                    alt=""
                                  />{" "}
                                  <span> Add Money </span>
                                </Link>
                              </div>
                              <div class="nav-wallet-btn ml-auto">
                                <Link
                                  type="button"
                                  to="/sendMoney"
                                  class="btn-cta"
                                >
                                  {/* <i class="fa-solid fa-wallet"></i> Send Money */}
                                  <img
                                    src="/images/wallet/send_money.svg"
                                    alt=""
                                  />{" "}
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

                {
                  loggedInUser ? (
                    <li class="nav-item dropdown login-dropdown">
                      <Link
                        class="nav-link nav-icons"
                        to="#"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {/* <img src="/icons/profile.png" class="img-fluid nav-icon" /> */}
                        <FiUser className="nav-icon" />
                        <span class="d-xl-block d-none d-md-none d-sm-none">
                          {" "}
                          {loggedInUser.Name.substring(0, 7)}...{" "}
                        </span>
                      </Link>
                      <ul class="dropdown-menu dropdown-position profile-dropdown">
                        <li>
                          <Link
                            class="dropdown-item login-usar-name border-top-0"
                            to="#"
                          >
                            {" "}
                            {loggedInUser && loggedInUser.Name}
                          </Link>
                        </li>
                        <li>
                          <Link class="dropdown-item" to="/myaccount">
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link class="dropdown-item" to="/shopping/wishlist">
                            My Wishlist
                          </Link>
                        </li>

                        {/* <li>
                        <a class="dropdown-item" href="/refer">
                          Invite & Earn
                        </a>
                      </li> */}
                        <li>
                          <Link class="dropdown-item" to="/passbook">
                            Passbook
                          </Link>
                        </li>
                        {/* <li>
                      <a class="dropdown-item" href="/myaccount">
                        Change Password
                      </a>
                    </li> */}
                        <li>
                          <button
                            onClick={clickLogout}
                            class="dropdown-item border-bottom-0"
                          >
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <></>
                  )
                  // <li className="nav-item">
                  //   <Link class="nav-link nav-icons">
                  //     <LoginModal />
                  //   </Link>
                  // </li>
                }
              </ul>
            </div>
          </div>
        </nav>

        {/* {<!-- search form for desktop end -->} */}

        {/* {<!-- header bottom start -->} */}
        <div class="section inside-home-navbar-bottom-services">
          <div class="container-fluid">
            <div class="navbar-bottom-services-outer">
              {Services.map((e) => {
                return (
                  <div class="navbar-bottom-serv-box">
                    <Link to={e.route}>
                      <img src={e.img} alt="" />
                      <span class="navbar-bottom-serv-box-title">
                        {e.title}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          {/* {<!-- container-->} */}
        </div>
        {/* {<!-- header bottom end -->} */}
      </header>

      {/* {<!-- Sidebar start -->} */}
      <nav id="sidebar" class="sidebar-navigation">
        <div class="sidebar-header">
          {/* {  <!-- <div class="container"> -->} */}
          <div class="row align-items-end justify-content-end">
            <div class="col-2 text-left sidebar-close-outer">
              <button
                type="button"
                id="sidebarCollapseX"
                class="btn btn-link sidebar-close"
                onClick={(e) => {
                  document.getElementById("sidebar").classList.remove("active");
                }}
              >
                <i class="fa-sharp fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
          {/* { <!-- </div> -->} */}
        </div>

        <ul class="list-unstyled components links">
          {Nav.map((e) => {
            return (
              <li class="">
                <Link to={e.route} target={e.target}>
                  {" "}
                  {e.title}
                </Link>
              </li>
            );
          })}

          {/* {<!-- with multiple submenu start -->} */}
        </ul>
      </nav>
      {/* {<!-- Sidebar end -->} */}

      {/* {<!-- <navbar End> -->} */}
    </>
  );

  return <>{section()}</>;
};

export const Services = [
  {
    title: "Recharge",
    img: "/images/services/white-recharge.svg",
    route: "/services/mobileRecharge",
  },
  {
    title: "DTH",
    img: "/images/services/white-dth.svg",
    route: "/services/dth",
  },
  {
    title: "Fastag",
    img: "/images/services/white-fastag.svg",
    route: "/services/fastag",
  },
  {
    title: "Electricity",
    img: "/images/services/white-electricity.svg",
    route: "/services/electricity",
  },
  {
    title: "Digital Cable",
    img: "/images/services/white-digital-cable.svg",
    route: "/services/digitalCable",
  },
  {
    title: "Landline",
    img: "/images/services/white-landline.svg",
    route: "/services/landline",
  },
  {
    title: "Gas",
    img: "/images/services/white-piped-gas.svg",
    route: "/services/gas",
  },
  {
    title: "LPG Gas",
    img: "/images/services/white-recharge.svg",
    route: "/services/lpgGas",
  },
];

export const Nav = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "Shopping",
    route: "/shopping",
  },
  {
    title: "Services",
    route: "/services",
  },
  {
    title: "Online Stores",
    route: "/onlinestores",
  },
  {
    title: "Become a Supplier",
    route: vendorPanelAPi,
    target: "_blank",
  },
];

export default BannerTopNav;
