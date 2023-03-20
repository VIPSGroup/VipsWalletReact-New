import React from "react";
import { Link } from "react-router-dom";
import { TopMenu } from "./HomeTopNav";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoWalletOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import "../../../assets/styles/core/commonTopNav.css";
import HeaderBottomService from "./HeaderBottomService";
import "../../../assets/styles/styles.css";
import { useSelector } from "react-redux";
const CommonTopNav = () => {
  const { loggedInUser } = useSelector(
    state => state.loginSlice.loggetInWithOTP
  );
  return (
    <>
      <header class="header-main sticky-top">
        <nav class="navbar navbar-expand-md navbar-light bg-light inpage-header-nav-position">
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
                src="/images/VipsLogoMain.png"
                alt="VIPS Logo"
                class="img-fluid vips-logo"
              />
            </Link>{"common"}

            <nav class="left-navbar sub-menu d-none d-xl-block">
              <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbar">
                  <ul class="navbar-nav mx-auto">
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

            <div class="collapse navbar-collapse d-flex flex-row align-self-start justify-content-end">
              <ul class="navbar-nav nabar-right-icon ml-auto flex-row align-self-start">
                {/* My Cart Icon */}
                {loggedInUser && (
                  <li class="nav-item">
                    <Link class="nav-link nav-icons" to="/shopping/cart">
                      <AiOutlineShoppingCart className="nav-icon" />
                      {/* { <img src="/icons/cart.png" class="img-fluid nav-icon" />} */}
                      <span class="d-xl-block d-none d-md-none d-sm-none ">
                        {" "}
                        My Cart{" "}
                      </span>
                    </Link>
                  </li>
                )}
                {/* Wallet Dropdown */}
                {loggedInUser && (
                  <li class="nav-item">
                    <Link
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
                            {/* &#x20B9; {balance} */}
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
                                {/* {primePoints}{" "} */}
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
                                {/* {shoppingPoints}{" "} */}
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
                                  {/* <i class="fa-solid fa-wallet"></i> Add Money */}
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
                                  {/* <i class="fa-solid fa-wallet"></i> Send Money */}
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
                )}
                {/* User Profile Dropdown */}
                {loggedInUser && (
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
                          //   onClick={clickLogout}
                          class="dropdown-item border-bottom-0"
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* {<!-- header bottom start -->} */}
        <HeaderBottomService />
        {/* {<!-- header bottom end -->} */}
      </header>
    </>
  );
};

export default CommonTopNav;

