import React, { useState, useEffect } from "react";

import { getWalletBalance } from "../../apiData/user/userDetails";

import { FiSearch, FiUser } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoWalletOutline } from "react-icons/io5";
import { RiUser3Line } from "react-icons/ri";

import "../../assets/styles/styles.css";
//import "../../assets/styles/core/topNavigationBar.css";
//import "../../assets/styles/core/topCategoryBar.css";
import "../../assets/styles/shopping/shoppingHome.css";

import $ from "jquery";
import { vendorPanelAPi } from "../../constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopNavigationMenu = ({ serviceCategoryBar = true }) => {
  const [balance, setBalance] = useState(0);
  const [shoppingPoints, setShoppingPoints] = useState("");
  const [primePoints, setPrimePoints] = useState("");

  const clickLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
const {loggedInUser}= useSelector(state=>state.login)
  useEffect(() => {
    const userName = loggedInUser && loggedInUser.UserName;
    const password = loggedInUser && loggedInUser.TRXNPassword;
    loggedInUser &&
      getWalletBalance({ userName, password }).then((response) => {
        setBalance(response.Data.Balance);
        setShoppingPoints(response.Data.Shoppingpoints);
        setPrimePoints(response.Data.PrimePoints);
      });
  }, []);

  const topStrip = () => (
    <div>
      <div class="utility-nav">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 col-md-6 d-none d-md-block">
              <p class="small">
                (Offer/ membership line) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Pellentesque.
              </p>
            </div>

            <div class="col-12 col-md-6 text-right">
              {loggedInUser && (
                <p class="small">
                  VIPS Wallet: &nbsp;{" "}
                  <span class="wallet-amt"> &#x20B9; {balance} </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const mainMenu = () => (
    <div>
      <nav
        class="navbar navbar-expand-md sticky-top navbar-light bg-light"
        style={{ boxShadow: "none" }}
      >
        <div class="container-fluid flex-nowrap">
          <button
            type="button"
            id="sidebarCollapse"
            class="btn btn-link d-block d-lg-none"
          >
            <i class="fa-solid fa-bars"></i>
          </button>

          <a class="navbar-brand " href="/">
            <img
              src="/images/VipsLogoMain.png"
              alt="VIPS Logo"
              class="img-fluid vips-logo"
            />
          </a>

          <nav class="navbar navbar-expand-lg sub-menu d-none d-lg-block">
            <div class="container-fluid">
              <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav mx-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="/">
                      Home <span class="sr-only">(current)</span>
                    </a>
                  </li>

                  {/*Level one dropdown */}
                  <li class="nav-item ">
                    <a href="/shopping" class="nav-link ">
                      Shopping
                    </a>
                    {/* {<ul
                      aria-labelledby="dropdownMenu1"
                      class="dropdown-menu border-0 shadow"
                    >
                      
                      <li class="dropdown-submenu">
                        <a
                          id="dropdownMenu2"
                          href="/shopping"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          class="dropdown-item dropdown-toggle"
                        >
                          Fashion
                        </a>
                        <ul
                          aria-labelledby="dropdownMenu2"
                          class="dropdown-menu border-0 shadow"
                        >
                          <li>
                            <a href="/shopping" class="dropdown-item">
                              Mens Clothing
                            </a>
                          </li>
                          <li>
                            <a href="/shopping" class="dropdown-item">
                              Womens Clothing
                            </a>
                          </li>
                          <li>
                            <a href="/shopping" class="dropdown-item">
                              Beauty
                            </a>
                          </li>
                          <li>
                            <a href="/shopping" class="dropdown-item">
                              Footwear
                            </a>
                          </li>
                        </ul>
                      </li>
                      

                      <li>
                        <a href="/shopping" class="dropdown-item">
                          Grocery & Home Decor{" "}
                        </a>
                      </li>
                      <li>
                        <a href="/shopping" class="dropdown-item">
                          Furniture & Electronics
                        </a>
                      </li>
                      <li>
                        <a href="/" class="dropdown-item">
                          Entertainment{" "}
                        </a>
                      </li>
                      <li>
                        <a href="/" class="dropdown-item">
                          Beauty & Health
                        </a>
                      </li>
                      <li>
                        <a href="/" class="dropdown-item">
                          Travel & Holidays{" "}
                        </a>
                      </li>
                      <li>
                        <a href="/" class="dropdown-item">
                          Travel & Holidays
                        </a>
                      </li>
                    </ul>} */}
                  </li>

                  <li class="nav-item ">
                    <a href="/services" class="nav-link ">
                      Services
                    </a>
                    {/* { <ul
                      aria-labelledby="dropdownMenu1"
                      class="dropdown-menu border-0 shadow"
                    >
                     
                      <li class="dropdown-submenu">
                        <a
                          id="dropdownMenu2"
                          href="/"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          class="dropdown-item dropdown-toggle"
                        >
                          Fashion
                        </a>
                        <ul
                          aria-labelledby="dropdownMenu2"
                          class="dropdown-menu border-0 shadow"
                        >
                          <li>
                            <a href="/" class="dropdown-item">
                              Mens Clothing
                            </a>
                          </li>
                          <li>
                            <a href="/" class="dropdown-item">
                              Womens Clothing
                            </a>
                          </li>
                          <li>
                            <a href="/" class="dropdown-item">
                              Beauty
                            </a>
                          </li>
                          <li>
                            <a href="/" class="dropdown-item">
                              Footwear
                            </a>
                          </li>
                        </ul>
                      </li>

                    

                      <li>
                        <a href="/" class="dropdown-item">
                          Grocery & Home Decor{" "}
                        </a>
                      </li>
                      <li>
                        <a href="/" class="dropdown-item">
                          Furniture & Electronics
                        </a>
                      </li>
                      <li>
                        <a href="/" class="dropdown-item">
                          Entertainment{" "}
                        </a>
                      </li>
                      <li>
                        <a href="/" class="dropdown-item">
                          Beauty & Health
                        </a>
                      </li>
                      <li>
                        <a href="/" class="dropdown-item">
                          Travel & Holidays{" "}
                        </a>
                      </li>
                      <li>
                        <a href="/" class="dropdown-item">
                          Travel & Holidays
                        </a>
                      </li>
                    </ul> */}
                  </li>

                  {/* <!-- End Level one --> */}

                  <li class="nav-item">
                    <a class="nav-link" href="/onlinestores">
                      Online Stores
                    </a>
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

          <div class="collapse navbar-collapse d-flex flex-row align-self-start justify-content-end">
            <ul class="navbar-nav nabar-right-icon ml-auto flex-row align-self-start">
              <li class="nav-item d-xl-block d-md-block d-none d-sm-block">
                <a class="nav-link nav-icons toggle-search" href="javascript:;">
                  {/* <img src="/icons/search.png" class="img-fluid nav-icon" /> */}
                  <FiSearch className="nav-icon" />
                  <span class="d-none d-xl-block d-md-none d-sm-block">
                    {" "}
                    Search{" "}
                  </span>
                </a>
              </li>
              {/* {<li class="nav-item d-xl-block d-md-block d-none d-sm-block">
                <a
                  class="nav-link nav-icons"
                  href="#searchForm"
                  data-target="#searchForm"
                  data-toggle="collapse"
                >
                  <img src="/icons/search.png" class="img-fluid nav-icon" />
                  <span class="d-none d-xl-block d-md-none d-sm-block">
                    {" "}
                    Search{" "}
                  </span>
                </a>
              </li>} */}

              {loggedInUser ? (
                <li class="nav-item">
                  <a class="nav-link nav-icons" href="/shopping/cart">
                    <AiOutlineShoppingCart className="nav-icon" />
                    {/* { <img src="/icons/cart.png" class="img-fluid nav-icon" />} */}
                    <span class="d-xl-block d-none d-md-none d-sm-block ">
                      {" "}
                      My Cart{" "}
                    </span>
                  </a>
                  {/* {<div
                    class="dropdown-menu cart-dropdown-position dropdown-menu-lg-right"
                    aria-labelledby="navbarcart"
                  >
                    <a class="dropdown-item" href="/shopping/cart">
                      Cart 1
                    </a>
                    <a class="dropdown-item" href="/shopping/cart">
                      Cart 2
                    </a>
                    <a class="dropdown-item" href="/shopping/cart">
                      Cart 3
                    </a>
                  </div>} */}
                </li>
              ) : null}

              {loggedInUser ? (
                <li class="nav-item">
                  <a
                    class="nav-link nav-icons"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {/* {<img src="/icons/wallet.png" class="img-fluid nav-icon" />} */}
                    <IoWalletOutline className="nav-icon" />
                    <span class="d-xl-block d-none d-md-none d-sm-block dropdown-toggle">
                      {" "}
                      My Wallet{" "}
                    </span>
                  </a>
                  <div
                    class="dropdown-menu wallet-dropdown-position dropdown-menu-lg-right shadow-dark border-0"
                    aria-labelledby="navbarwallet"
                  >
                    <div class="nav-wallet-card">
                      <div class="nav-wallet-body">
                        <span class="nav-wallet-title">
                          {" "}
                          <i class="fa-solid fa-wallet"></i> Balance
                        </span>
                        <span class="nav-wallet-amt"> &#x20B9; {balance}</span>
                      </div>
                      <div class="dropdown-divider"></div>
                      <div class="nav-wallet-body nav-wallet-card-p">
                        <div class="row">
                          <div class="col col-xs-4 ">
                            <span>Prime Points : </span>
                          </div>
                          <div class="col col-xs-4 ">
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
                          <div class="col col-xs-4">
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
                              <a
                                type="button"
                                href="/addMoney/options"
                                class="btn-cta"
                                style={{ textDecoration: "none" }}
                              >
                                {" "}
                                <i class="fa-solid fa-wallet"></i> Add Money
                              </a>
                            </div>
                            <div class="nav-wallet-btn ml-auto">
                              <a
                                type="button"
                                href="/sendMoney"
                                class="btn-cta"
                              >
                                {" "}
                                <i class="fa-solid fa-wallet"></i> Send Money
                              </a>
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
                  <a
                    class="nav-link nav-icons"
                    href="#"
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
                  </a>
                  <ul class="dropdown-menu dropdown-position profile-dropdown">
                    <li>
                      <a
                        class="dropdown-item login-usar-name border-top-0"
                        href="#"
                      >
                        {" "}
                        {loggedInUser && loggedInUser.Name}
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/myaccount">
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="/shopping/wishlist">
                        My Wishlist
                      </a>
                    </li>

                    <li>
                      <a class="dropdown-item" href="/passbook">
                        Transaction History
                      </a>
                    </li>
                    {/* <li>
                      <a class="dropdown-item" href="/myaccount">
                        Change Password
                      </a>
                    </li> */}
                    <li>
                      <a
                        onClick={clickLogout}
                        class="dropdown-item border-bottom-0"
                        href="/"
                      >
                        Sign Out
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/login" class="nav-link nav-icons">
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );

  const mobSearch = () => (
    <div>
      <div class="search-bar d-block d-md-none">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <form class="form-inline mb-3 mx-auto">
                <input
                  class="form-control "
                  type="search"
                  placeholder="Search for products..."
                  aria-label="Search"
                />
                <button class="btn search-btn" type="submit">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const desktopSearch = () => (
    <div>
      <div class="d-sm-block d-none">
        <div
          class="collapse position-absolute w-100 px-3 top-search-outer search-wrap "
          id="searchForm"
        >
          <div class="d-flex align-items-center top-search-inner">
            <i class="fa-sharp fa-solid fa-magnifying-glass top-search-icon"></i>
            <input
              id="search-bar"
              type="text"
              class="form-control border-0 flex-grow-1 top-search-form"
              placeholder="Search for products..."
              autocomplete="off"
            />
            <a
              class="nav-link py-2 top-search-close toggle-search"
              href="javascript:;"
            >
              <i class="fa-sharp fa-solid fa-xmark"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const categoryBar = () => (
    <div>
      <div class="section header-bottom">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="bottom-header-outer d-none d-lg-block d-sm-none">
                {/* {<div class="top-serv-box">
                  <a href="#">
                    <img src="/icons/categoryIcons/card.png" />
                    <span class="top-serv-box-title">VIPS Card</span>
                  </a>
                </div>} */}

                <div class="top-serv-box">
                  <a href="/services/mobileRecharge">
                    <img src="/icons/categoryIcons/card.png" />
                    <span class="top-serv-box-title">Recharge</span>
                  </a>
                </div>

                <div class="top-serv-box">
                  <a href="/services/dth">
                    <img src="/icons/categoryIcons/card.png" />
                    <span class="top-serv-box-title">DTH</span>
                  </a>
                </div>

                <div class="top-serv-box">
                  <a href="/services/fastag">
                    <img src="/icons/categoryIcons/card.png" />
                    <span class="top-serv-box-title">Fastag</span>
                  </a>
                </div>

                <div class="top-serv-box">
                  <a href="/services/electricity">
                    <img src="/icons/categoryIcons/card.png" />
                    <span class="top-serv-box-title">Electricity</span>
                  </a>
                </div>

                <div class="top-serv-box">
                  <a href="/services/common/digitalCable">
                    <img src="/icons/categoryIcons/card.png" />
                    <span class="top-serv-box-title">Digital Cabel</span>
                  </a>
                </div>

                <div class="top-serv-box top-serv-box-display">
                  <a href="/services/landline">
                    <img src="/icons/categoryIcons/card.png" />
                    <span class="top-serv-box-title">LandLine</span>
                  </a>
                </div>

                <div class="top-serv-box top-serv-box-display">
                  <a href="/services/gas">
                    <img src="/icons/categoryIcons/card.png" />
                    <span class="top-serv-box-title">Gas</span>
                  </a>
                </div>

                <div class="top-serv-box">
                  <div class="dropdown">
                    <a
                      class=""
                      href="/services"
                      role="button"
                      id="dropdownMenumore"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <img
                        src="/icons/categoryIcons/three-dot.png"
                        class="vert-align"
                      />
                      <span class="top-serv-box-title">View More</span>
                    </a>

                    <div
                      class="dropdown-menu dropdown-menu-center"
                      aria-labelledby="dropdownMenumore"
                    >
                      <a class="dropdown-item" href="#">
                        {" "}
                        <img src="/icons/categoryIcons/card.png" /> Piped Gas
                      </a>
                      <a class="dropdown-item" href="#">
                        {" "}
                        <img src="/icons/categoryIcons/card.png" /> Piped Gas
                      </a>
                      <a class="dropdown-item" href="#">
                        {" "}
                        <img src="/icons/categoryIcons/card.png" /> Piped Gas
                      </a>
                      <a class="dropdown-item" href="#">
                        {" "}
                        <img src="/icons/categoryIcons/card.png" /> Piped Gas
                      </a>
                      <a class="dropdown-item" href="#">
                        {" "}
                        <img src="/icons/categoryIcons/card.png" /> Piped Gas
                      </a>
                      <a class="dropdown-item" href="#">
                        {" "}
                        <img src="/icons/categoryIcons/card.png" /> Piped Gas
                      </a>
                      <a class="dropdown-item" href="#">
                        {" "}
                        <img src="/icons/categoryIcons/card.png" /> Piped Gas
                      </a>
                      <a class="dropdown-item" href="#">
                        {" "}
                        <img src="/icons/categoryIcons/card.png" /> Piped Gas
                      </a>
                      <a class="dropdown-item" href="#">
                        {" "}
                        <img src="/icons/categoryIcons/card.png" /> Piped Gas
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <div class="carousel box-carousel d-sm-block d-lg-none">
                {/* {<div class="box top-service-box">
                  <a href="/">
                    <img src="/icons/categoryIcons/card.png" />
                    <br />
                    VIPS Card
                  </a>
                </div>} */}
                <div class="box top-service-box">
                  <a href="/services/mobileRecharge">
                    <img src="/icons/categoryIcons/card.png" />
                    <br />
                    Recharge
                  </a>
                </div>
                <div class="box top-service-box">
                  <a href="/services/dth">
                    <img src="/icons/categoryIcons/card.png" />
                    <br />
                    DTH
                  </a>
                </div>
                <div class="box top-service-box">
                  <a href="/services/BroadBand">
                    <img src="/icons/categoryIcons/card.png" />
                    <br />
                    BroadBand
                  </a>
                </div>
                <div class="box top-service-box">
                  <a href="/services/electricity">
                    <img src="/icons/categoryIcons/card.png" />
                    <br />
                    Electricity
                  </a>
                </div>
                <div class="box top-service-box">
                  <a href="/">
                    <img src="/icons/categoryIcons/card.png" />
                    <br />
                    Flight
                  </a>
                </div>
                {/* {<div class="box top-service-box">
                  <a href="/">
                    <img src="/icons/categoryIcons/card.png" />
                    <br />
                    VIPS Card
                  </a>
                </div>} */}
                <div class="box top-service-box">
                  <a href="/services/landline">
                    <img src="/icons/categoryIcons/card.png" />
                    <br />
                    LandLine
                  </a>
                </div>
                <div class="box top-service-box">
                  <a href="/services/gas">
                    <img src="/icons/categoryIcons/card.png" />
                    <br />
                    Gas
                  </a>
                </div>
                <div class="box top-service-box">
                  <a href="#">
                    <img src="/icons/categoryIcons/card.png" />
                    <br />
                    View More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const sideBar = () => (
    <div>
      <nav id="sidebar" class="sidebar-navigation">
        <div class="sidebar-header">
          {/* {<!-- <div class="container"> -->} */}
          <div class="row align-items-end justify-content-end">
            <div class="col-2 text-left">
              <button
                type="button"
                id="sidebarCollapseX"
                class="btn btn-link sidebar-close"
              >
                <i class="fa-sharp fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
          {/* { <!-- </div> -->} */}
        </div>

        <ul class="list-unstyled components links">
          <li class="">
            <a href="/"> Home</a>
          </li>

          {/* {<!-- with multiple submenu start -->} */}
          <li>
            <a href="#" class="dropdown-toggle">
              Shopping{" "}
            </a>
            <ul>
              <li>
                <a href="#" class="dropdown-toggle">
                  Fashion{" "}
                </a>
                <ul>
                  <li>
                    <a href="shopping-home-page.html">Mens Clothing</a>
                  </li>
                  <li>
                    <a href="shopping-home-page.html">Womens Clothing</a>
                  </li>
                  <li>
                    <a href="#">Beauty</a>
                  </li>
                  <li>
                    <a href="#">Footwear</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Grocery & Home Decor</a>
              </li>
              <li>
                <a href="#">Furniture & Electronics</a>
              </li>
              <li>
                <a href="#">Entertainment</a>
              </li>
              <li>
                <a href="#">Beauty & Health</a>
              </li>
              <li>
                <a href="#">Travel & Holidays</a>
              </li>
              <li>
                <a href="#">Travel & Holidays</a>
              </li>
            </ul>
          </li>
          {/* {<!-- with multiple submenu end --> */}

          <li>
            <a href="#" class="dropdown-toggle">
              Services{" "}
            </a>
            <ul>
              <li>
                <a href="#">VIPS Card</a>
              </li>
              <li>
                <a href="mobile-recharge.html">Recharge</a>
              </li>
              <li>
                <a href="electricity-bill-1.html">Electricity</a>
              </li>
              <li>
                <a href="#">DTH</a>
              </li>
              <li>
                <a href="#">Flight</a>
              </li>
              <li>
                <a href="#">Landline</a>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/onlinestores"> Online Stores</Link>
          </li>
          <li>
            <Link to={vendorPanelAPi} target="_blank">
              a Supplier
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <div>
      <header>
        {/* {<div>{topStrip()}</div>} */}
        <div>{mainMenu()}</div>
        <div>{mobSearch()}</div>
        <div>{desktopSearch()}</div>
        {serviceCategoryBar ? <div>{categoryBar()}</div> : null}
      </header>

      <div>{sideBar()}</div>
    </div>
  );
};

export default TopNavigationMenu;
