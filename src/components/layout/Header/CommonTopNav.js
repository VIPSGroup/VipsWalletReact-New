import React, { useState, useEffect } from "react";
import "../../../assets/styles/core/commonTopNav.css";

import { FiSearch, FiUser } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { IoWalletOutline } from "react-icons/io5";
import { RiUser3Line } from "react-icons/ri";
import { vendorPanelAPi } from "../../../constants";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { modalOpen } from "../../../redux/slices/digiGold/digiGoldSlice";
import DigiGoldSignup from "../../../pages/digiGold/DigiGoldSignup";
import { Avatar, Badge, Dropdown } from "antd";
import { MuiSnackBar } from "../../common";
import { getWalletBalance } from "../../../redux/slices/payment/walletSlice";
import { CheckServiceEnableOrNot } from "../../../redux/slices/coreSlice";

const CommonTopNav = ({
  isShow = true,
  setActive,
  title,
  setGrams,
  setAmount,
  setStep,
  step,
  setErr,
  setReceiverUserName,
  receiverUserName,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDigiLogin, setIsDigiLogin] = useState("");
  const [balance, setBalance] = useState(0);
  const [shoppingPoints, setShoppingPoints] = useState("");
  const [primePoints, setPrimePoints] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loggedInMember = JSON.parse(localStorage.getItem("user"));
  const { wishCount } = useSelector((state) => state.wishlistSlice);
  const { cartCount } = useSelector((state) => state?.cartSlice);
  const { pathname } = useResolvedPath();
  const { logData, loading: logLoading } = useSelector(
    (state) => state.registerDigiSlice.login
  );

  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
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
      overlayClassName: "overlay-custom-class-name",
    });
  };

  const items = [
    !logLoading && logData?.Data
      ? {
          key: "1",
          label: (
            <Link to={"/vipsgold-profile"} style={{ fontSize: 17 }}>
              My Profile
            </Link>
          ),
        }
      : null,
    !logLoading && logData?.Data
      ? {
          key: "2",
          label: (
            <Link to={"/vipsgold-orders"} style={{ fontSize: 17 }}>
              My Orders
            </Link>
          ),
        }
      : null,
    {
      key: "3",
      label: (
        <Link target={"_blank"} to={"/vipsgold-faq"} style={{ fontSize: 17 }}>
          FAQ's
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link
          target={"_blank"}
          to={"/vipsgold-termscondtion"}
          style={{ fontSize: 17 }}
        >
          Terms & Conditions
        </Link>
      ),
    },
    // {
    //   key: "3",
    //   label: <Link style={{ fontSize: 17 }}>KYC</Link>,
    // },
    // {
    //   key: "4",
    //   label: <Link style={{ fontSize: 17 }}>My Bank Details</Link>,
    // },
    // {
    //   key: "5",
    //   label: <Link style={{ fontSize: 17 }}>My Address</Link>,
    // },
    {
      key: "5",
      label: (
        <Link
          onClick={() => {
            if (!logLoading && logData?.Data) {
              clickLogout();
            } else {
              dispatch(modalOpen());
              setStep(0);
            }

            // !logLoading && logData?.Data
            //   ? clickLogout()
            //   : dispatch(modalOpen());
          }}
          style={{ fontSize: 17 }}
        >
          {!logLoading && logData?.Data ? "Logout" : "Register"}
        </Link>
      ),
    },
  ];

  const CheckWalletBalance = async () => {
    const username = loggedInUser && loggedInUser?.UserName;
    const password = loggedInUser && loggedInUser?.TRXNPassword;
    dispatch(getWalletBalance({ username, password }));
  };

  const section = () => (
    <>
      <header class="header-main sticky-top">
        <nav class="navbar navbar-expand-md navbar-light bg-light inpage-header-nav-position ">
          <div class="container-fluid flex-nowrap">
            <button
              type="button"
              id="sidebarCollapse"
              class="btn btn-link d-block d-xl-none"
            >
              <i class="fa-solid fa-bars"></i>
            </button>
            <Link class="navbar-brand " to="/">
              <img
                src="/images/VipsLogoMain.png"
                alt="VIPS Logo"
                class="img-fluid vips-logo"
              />
            </Link>

            <nav class="left-navbar sub-menu d-none d-xl-block">
              <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbar">
                  <ul class="navbar-nav mx-auto">
                    <li class="nav-item active">
                      <Link
                        style={{
                          borderBottom: pathname === "/" && "2px solid #CA3060",
                        }}
                        class="nav-link"
                        to="/"
                      >
                        Home <span class="sr-only">(current)</span>
                      </Link>
                    </li>

                    {/*Level one dropdown */}
                    <li class="nav-item ">
                      <Link
                        style={{
                          borderBottom:
                            pathname === "/shopping" && "2px solid #CA3060",
                        }}
                        to="/shopping"
                        class="nav-link "
                      >
                        Shopping
                      </Link>
                    </li>

                    <li class="nav-item ">
                      <Link
                        style={{
                          borderBottom:
                            pathname === "/services" && "2px solid #CA3060",
                        }}
                        to="/services"
                        class="nav-link "
                      >
                        Services
                      </Link>
                    </li>

                    {/* <!-- End Level one --> */}

                    <li class="nav-item">
                      <Link
                        style={{
                          borderBottom:
                            pathname === "/onlinestores" && "2px solid #CA3060",
                        }}
                        class="nav-link"
                        to="/onlinestores"
                      >
                        Online Stores
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        class="nav-link"
                        to={vendorPanelAPi}
                        target="_blank"
                      >
                        Become a Supplier
                      </Link>
                    </li>
                    <li
                      class="nav-item"
                      onClick={() => dispatch(CheckServiceEnableOrNot())}
                    >
                      <Link
                        style={{
                          borderBottom:
                            pathname === "/vipsgold" && "2px solid #CA3060",
                        }}
                        class="nav-link"
                        to="/vipsgold"
                      >
                        VIPS Gold
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div class="collapse navbar-collapse d-flex flex-row align-self-start justify-content-end">
              <ul class="navbar-nav nabar-right-icon ml-auto flex-row align-self-start">
                {pathname !== "/vipsgold" &&
                  pathname !== "/vipsgold-order-summary/:" &&
                  pathname !== "/vipsgold-profile" &&
                  pathname !== "/vipsgold-orders" &&
                  pathname !== "/vipsgold-gift" &&
                  pathname !== "/vipsgold-faq" &&
                  pathname !== "/vipsgold-termscondtion" &&
                  pathname !== `/vipsgold-delivery/${title}` && (
                    <>
                      <li class="nav-item">
                        <Link class="nav-link nav-icons" to="/shopping/cart">
                          <Badge count={cartCount && cartCount?.length}>
                            <AiOutlineShoppingCart className="nav-icon" />
                          </Badge>
                          {/* { <img src="/icons/cart.png" class="img-fluid nav-icon" />} */}
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
                    </>
                  )}

                {loggedInUser &&
                  pathname !== "/vipsgold" &&
                  pathname !== "/vipsgold-order-summary" &&
                  pathname !== "/vipsgold-profile" &&
                  pathname !== "/vipsgold-gift" &&
                  pathname !== "/vipsgold-orders" &&
                  pathname !== "/vipsgold-faq" &&
                  pathname !== "/vipsgold-termscondtion" &&
                  pathname !== `/vipsgold-delivery/${title}` && (
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
                              {!loading && data ? data?.Data?.Balance : "..."}
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
                  )}

                {loggedInUser ? (
                  pathname !== "/vipsgold" &&
                  pathname !== "/vipsgold-order-summary" &&
                  pathname !== "/vipsgold-profile" &&
                  pathname !== "/vipsgold-gift" &&
                  pathname !== "/vipsgold-orders" &&
                  pathname !== "/vipsgold-delivery" &&
                  pathname !== "/vipsgold-faq" &&
                  pathname !== "/vipsgold-termscondtion" &&
                  pathname !== `/vipsgold-delivery/${title}` ? (
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
                            onClick={clickLogout}
                            class="dropdown-item border-bottom-0"
                          >
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <Dropdown
                      menu={{
                        items,
                      }}
                      placement="bottomRight"
                      arrow
                    >
                      <Avatar
                        className="digigold-user-icon"
                        // style={{
                        //   backgroundColor: "#393186",
                        //   fontWeight: "boldF",
                        //   cursor: "pointer",
                        // }}
                      >
                        {loggedInUser.Name.slice(0, 2)}
                      </Avatar>
                    </Dropdown>
                  )
                ) : (
                  <li className="nav-item">
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
        <div class="section inpage-navbar-bottom-services">
          {pathname !== "/vipsgold" &&
          pathname !== "/vipsgold-order-summary" &&
          pathname !== "/vipsgold-profile" &&
          pathname !== "/vipsgold-orders" &&
          pathname !== "/vipsgold-gift" &&
          pathname !== "/vipsgold-delivery" &&
          pathname !== "/vipsgold-faq" &&
          pathname !== "/vipsgold-termscondtion" &&
          pathname !== `/vipsgold-delivery/${title}` ? (
            <div class="container-fluid">
              <div class="navbar-bottom-services-outer">
                <div class="navbar-bottom-serv-box">
                  <Link to="/services/mobileRecharge">
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

                    <span class="navbar-bottom-serv-box-title">
                      Electricity
                    </span>
                  </Link>
                </div>

                <div class="navbar-bottom-serv-box">
                  <Link to="/services/digitalCable">
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
                        src="/images/services/white-three-dot.svg"
                        class="vert-align"
                      />
                      <span class="navbar-bottom-serv-box-title">
                        View More
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div class="container-fluid ">
              <div
                style={{ display: "flex", justifyContent: "space-evenly" }}
                class="navbar-bottom-services-outer"
              >
                <div class="navbar-bottom-serv-box">
                  <Link
                    onClick={() => {
                      setActive(0);
                      setGrams("");
                      setAmount("");
                      setErr("");
                      setReceiverUserName("");
                    }}
                    to="/vipsgold"
                  >
                    <img
                      src="/images/digigold-images/buy-white-icon.svg"
                      alt=""
                    />
                    <span class="navbar-bottom-serv-box-title">Buy Gold</span>
                  </Link>
                </div>

                <div class="navbar-bottom-serv-box">
                  <Link
                    onClick={() => {
                      setActive(1);
                      setGrams("");
                      setAmount("");
                      setErr("");
                      setReceiverUserName("");
                    }}
                    to="/vipsgold"
                  >
                    <img
                      src="images/digigold-images/sell-white-icon.svg"
                      alt=""
                    />
                    <span class="navbar-bottom-serv-box-title">Sell Gold</span>
                  </Link>
                </div>
                <div class="navbar-bottom-serv-box">
                  <Link
                    to="/vipsgold"
                    onClick={() => {
                      setActive(2);
                      setGrams("");
                      setAmount("");
                      setErr("");
                      setReceiverUserName("");
                    }}
                  >
                    <img
                      src="images/digigold-images/gold_gift_icon _white.svg"
                      alt=""
                    />
                    <span class="navbar-bottom-serv-box-title">Gift</span>
                  </Link>
                </div>
                <div class="navbar-bottom-serv-box">
                  <Link
                    // href="#"
                    onClick={() => {
                      setIsSnackBar(true);
                      setErrorMsg("Service will be coming soon..");
                    }}
                  >
                    <img
                      src="images/digigold-images/sip-white-icon.svg"
                      alt=""
                    />
                    <span class="navbar-bottom-serv-box-title">SIP</span>
                  </Link>
                </div>

                <div class="navbar-bottom-serv-box">
                  <Link
                    // to="/vipsgold-delivery"
                    onClick={() => {
                      setIsSnackBar(true);
                      setErrorMsg("Service will be coming soon..");
                    }}
                  >
                    <img
                      src="images/digigold-images/delivery-white-icon.svg"
                      alt=""
                    />
                    <span class="navbar-bottom-serv-box-title">Delivery</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {/* {<!-- container-->} */}
        </div>
        {/* {<!-- header bottom end -->} */}
      </header>

      {/* {<!-- Sidebar start -->} */}
      <nav id="sidebar" class="sidebar-navigation">
        <div class="sidebar-header">
          {/* {<!-- <div class="container"> -->} */}
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
          {/* {<!-- </div> -->} */}
        </div>

        <ul class="list-unstyled components links">
          <li class="">
            <Link to="/"> Home</Link>
          </li>

          {/* {<!-- with multiple submenu start -->} */}
          <li>
            <Link to="/shopping">Shopping </Link>
          </li>
          {/* {<!-- with multiple submenu end -->} */}

          <li>
            <Link to="/services">Services </Link>
          </li>

          <li>
            <Link to="/onlinestores"> Online Stores</Link>
          </li>
          <li onClick={() => dispatch(CheckServiceEnableOrNot())}>
            <Link to="/vipsgold"> VIPS Gold</Link>
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

  return (
    <>
      {section()}
      <DigiGoldSignup
        setIsDigiLogin={setIsDigiLogin}
        setStep={setStep}
        step={step}
      />

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

export default CommonTopNav;
