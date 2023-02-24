import React, { useEffect, useState } from "react";
import "../../../assets/styles/core/homeTopNav.css";
import { Link } from "react-router-dom";
import "../../../assets/styles/core/homeTopNav.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {  FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { FaCrown } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { IoWalletOutline } from "react-icons/io5";
import { vendorPanelAPi } from "../../../constant/Constants";

const HomeTopNav = ({ isPrime }) => {
  const [fixed, setFixed] = useState(false);
   const [balance, setBalance] = useState(0);
  const [shoppingPoints, setShoppingPoints] = useState("");
  const [primePoints, setPrimePoints] = useState("");

 const { loggedInUser } = useSelector(
    state => state.loginSlice.loggetInWithOTP
  );
 

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.screenY > 450) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    });
  });
  
   const clickLogout = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to sign out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("user");
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
  return (
    <>
      <header class="header-main sticky-top">
        <nav class="navbar navbar-expand-md navbar-light bg-light nav-position">
          <div class="container-fluid flex-nowrap">
            <button
              type="button"
              id="sidebarCollapse"
              class="btn btn-link d-block d-xl-none"
              onClick={(e) => {
                // document.getElementById("sidebar").classList.add("active");
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
                    {TopMenu.map((e, i) => {
                      return (
                        <li key={i} class="nav-item active">
                          <Link target={e.target} class="nav-link" to={e.route}>
                            {e.title} <span class="sr-only">(current)</span>
                          </Link>
                        </li>
                      );
                    })}
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
                    <AiOutlineShoppingCart className="nav-icon" />
                    <span class="d-xl-block d-none d-md-none d-sm-none">
                      {" "}
                      My Cart{" "}
                    </span>
                  </Link>
                </li>
      
                {loggedInUser ? (
                  <li class="nav-item">
                    <Link
                      class="nav-link nav-icons"
                      to="#"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                     
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
                            &#x20B9; {balance}
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
                                {primePoints}{" "}
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
                                {shoppingPoints}{" "}
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
                          {"  "}
                          {isPrime ? (
                            <FaCrown color="#ffbb48" size={18} />
                          ) : null}
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
                <Link to="/services/mobileRecharge">
                  <img src="/images/services/white-recharge.svg" alt="" />
                  <span class="navbar-bottom-serv-box-title">Recharge</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/dth">
                  <img src="/images/services/white-dth.svg" alt="" />
                  <span class="navbar-bottom-serv-box-title">DTH</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/fastag">
                  <img src="/images/services/white-fastag.svg" alt="" />
                  <span class="navbar-bottom-serv-box-title">Fastag</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/electricity">
                  <img src="/images/services/white-electricity.svg" alt="" />
                  <span class="navbar-bottom-serv-box-title">Electricity</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/digitalCable">
                  <img src="/images/services/white-digital-cable.svg" alt="" />
                  <span class="navbar-bottom-serv-box-title">
                    Digital Cable
                  </span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/landline">
                  <img src="/images/services/white-landline.svg" alt="" />
                  <span class="navbar-bottom-serv-box-title">LandLine</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <Link to="/services/gas">
                  <img src="/images/services/white-piped-gas.svg" alt="" />
                  <span class="navbar-bottom-serv-box-title">Gas</span>
                </Link>
              </div>

              <div class="navbar-bottom-serv-box">
                <div class="">
                  <Link to="/services">
                    <img
                      src="images/services/white-three-dot.svg"
                      class="vert-align"
                      alt=""
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
                onClick={(e) => {
                  document.getElementById("sidebar").classList.remove("active");
                }}
              >
                <i class="fa-sharp fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>

        <ul class="list-unstyled components links">
          <li class="">
            <Link to="/"> Home</Link>
          </li>

          {/* {<!-- with multiple submenu start -->} */}
          <li>
            <Link to="/shopping">Shopping </Link>
          </li>

          <li>
            <Link to="/services">Services </Link>
          </li>

          <li>
            <Link to="/onlinestores"> Online Stores</Link>
          </li>
          <li>
            <Link to={vendorPanelAPi} target="_blank">
              {" "}
              Become a Supplier
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export const TopMenu = [
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

export default HomeTopNav;
