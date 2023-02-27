import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//importing Navbar elements from react bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";

//import "../../assets/styles/core/topNav.css";
import "../../assets/styles/styles.css";

import { BsSearch } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { vendorPanelAPi } from "../../constants";
import { useSelector } from "react-redux";

const TopMenu = ({ balance }) => {
  const themeColor = "#393186";
  const clickLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  const { loggedInUser } = useSelector((state) => state.login);
  const menuBarTextStyle = {
    fontSize: "14px",
    fontFamily: "'Poppins', sansSerif",
    color: "#212121",
  };

  const rightMenuTextStyle = {
    fontSize: "12px",
    fontFamily: "'Poppins', sansSerif",
    color: "#212121",
  };

  const menubar1 = () => (
    <div>
      <div className="section-top">
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <p>
                (Offer/ membership line) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Pellentesque fermentum dolor egestas nunc
                tellus.
              </p>
            </div>
            <div className="col">
              {loggedInUser && (
                <p className="float-none float-md-right">
                  {" "}
                  VIPS Wallet:{" "}
                  <span className="wallet-amt"> &#x20B9; {balance} </span>{" "}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const menubar2 = () => (
    <div>
      <header className="section-header">
        <section className="header-main border-bottom">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-3 col-sm-4 col-md-4 col-5">
                {" "}
                <a href="#" className="brand-wrap" data-abc="true">
                  <img
                    src="/images/VipsLogoMain.png"
                    alt="VIPS Logo"
                    className="logo img-fluid vips-brand"
                  />
                </a>{" "}
              </div>
              <div className="col d-none d-md-block">
                <form action="#" className="search-wrap nav-search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control search-form "
                      placeholder="Search"
                    />
                    <div className="input-group-append">
                      <button className="btn nav-search-btn" type="submit">
                        <BsSearch className="h6 m-0" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="align-self-center">
                <a
                  className="nav-link align-self-center"
                  href={vendorPanelAPi}
                  target="_blank"
                >
                  Become A Supplier
                </a>
              </div>

              <div className="col-auto">
                <div className="d-flex justify-content-end">
                  <span className="vl"></span>
                  <div className="dropdown btn-group">
                    <a
                      className="nav-link nav-icons"
                      href="#"
                      id="navbarDropdownMenuLink1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      data-abc="true"
                    >
                      <img
                        src="icons/cart.png"
                        className="img-fluid nav-icon"
                      />{" "}
                      <span className="d-xl-block d-md-none"> My Cart </span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right notification-dropdown">
                      <li>
                        <div className="notification-title">More Info</div>
                        <div className="notification-list">
                          <div className="list-group">
                            <a
                              href="affiliates"
                              className="list-group-item list-group-item-action active"
                              data-abc="true"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    Affiliate program
                                  </span>
                                </div>
                              </div>
                            </a>
                            <a
                              href="redemption-center"
                              className="list-group-item list-group-item-action active"
                              data-abc="true"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    Redemption Center
                                  </span>{" "}
                                </div>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action active"
                              data-abc="true"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    Achievements
                                  </span>{" "}
                                </div>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action active"
                              data-abc="true"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    Contact us
                                  </span>{" "}
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <span className="vl"></span>
                  <div className="dropdown btn-group">
                    <a
                      className="nav-link nav-icons"
                      href="#"
                      id="navbarDropdownMenuLink1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      data-abc="true"
                    >
                      <img
                        src="icons/wallet.png"
                        className="img-fluid nav-icon"
                      />{" "}
                      <span className="d-xl-block d-md-none"> My Wallet </span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right notification-dropdown">
                      <li>
                        <div className="notification-title">More Info</div>
                        <div className="notification-list">
                          <div className="list-group">
                            <a
                              href="affiliates"
                              className="list-group-item list-group-item-action active"
                              data-abc="true"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    Affiliate program
                                  </span>
                                </div>
                              </div>
                            </a>
                            <a
                              href="redemption-center"
                              className="list-group-item list-group-item-action active"
                              data-abc="true"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    Redemption Center
                                  </span>{" "}
                                </div>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action active"
                              data-abc="true"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    Achievements
                                  </span>{" "}
                                </div>
                              </div>
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action active"
                              data-abc="true"
                            >
                              <div className="notification-info">
                                <div className="notification-list-user-block">
                                  <span className="notification-list-user-name">
                                    Contact us
                                  </span>{" "}
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <span className="vl"></span>

                  <div className="dropdown btn-group">
                    <Link
                      to="/login"
                      className="nav-link nav-icons"
                      id="loginDropdown"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    ></Link>
                  </div>

                  <div className="dropdown btn-group">
                    <a
                      className="nav-link nav-icons"
                      type="button"
                      onClick={clickLogout}
                      id="loginDropdown"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      <MdLogout className="img-fluid nav-icon" />{" "}
                      <span className="d-xl-block d-md-none">Log out </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <nav className="navbar navbar-expand-md navbar-main border-bottom">
          <div className="container-fluid">
            <form className="d-md-none my-2">
              <div className="input-group">
                {" "}
                <input
                  type="search"
                  name="search"
                  className="form-control"
                  placeholder="Search"
                  required=""
                />
                <div className="input-group-append">
                  {" "}
                  <button type="submit" className="btn btn-secondary">
                    <i className="fa fa-search"></i>{" "}
                  </button>{" "}
                </div>
              </div>
            </form>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#dropdown6"
              aria-expanded="false"
            >
              {" "}
              <span className="navbar-toggler-icon"></span>{" "}
            </button>
            <div className="navbar-collapse collapse" id="dropdown6">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="" data-abc="true">
                    Home
                  </a>{" "}
                </li>
                <li className="nav-item dropdown">
                  {" "}
                  <a
                    className="nav-link dropdown-toggle"
                    href=""
                    data-toggle="dropdown"
                    data-abc="true"
                    aria-expanded="false"
                  >
                    Shopping
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="" data-abc="true">
                      Services 1
                    </a>
                    <a className="dropdown-item" href="" data-abc="true">
                      Services 2
                    </a>
                    <a className="dropdown-item" href="" data-abc="true">
                      Services 3
                    </a>
                    <a className="dropdown-item" href="" data-abc="true">
                      Services 4
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  {" "}
                  <a
                    className="nav-link dropdown-toggle"
                    href=""
                    data-toggle="dropdown"
                    data-abc="true"
                    aria-expanded="false"
                  >
                    Services
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="" data-abc="true">
                      Services 1
                    </a>
                    <a className="dropdown-item" href="" data-abc="true">
                      Services 2
                    </a>
                    <a className="dropdown-item" href="" data-abc="true">
                      Services 3
                    </a>
                    <a className="dropdown-item" href="" data-abc="true">
                      Services 4
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="/onlinestores" data-abc="true">
                    Online Stores
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );

  /*
    <Navbar   expand="lg" style={{backgroundColor:"#ffffff"}} className="col-12 p-0">
                <Container fluid className="m-0 ">
                  <Navbar.Brand href="#home"><img src="/images/VipsLogoMain.svg" width="100%" height="100%"></img></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav"  />
                  <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="col-5 mt-3">
                      <Nav.Link href="#home" className="mx-2"><p  style={menuBarTextStyle}>Home</p></Nav.Link>
                      
                      <Dropdown className="mx-2">
                       <Dropdown.Toggle variant="transparent" id="dropdown-basic "  style={menuBarTextStyle}>
                         Shopping
                       </Dropdown.Toggle>
                 
                       <Dropdown.Menu>
                         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>

                     <Dropdown className="mx-2">
                       <Dropdown.Toggle variant="" id="dropdown-basic "  style={menuBarTextStyle}>
                         Services
                       </Dropdown.Toggle>
                 
                       <Dropdown.Menu>
                         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>

                     

                     <Nav.Link href="#home" className="mx-2"><p  style={menuBarTextStyle}>Online Stores</p></Nav.Link>


                    </Nav>

                    <Nav className=" col-4">
                     <div className="col-12" >
                      <div className="input-group  rounded " style={{backgroundColor:"#F4F4F4"}}>
                         <input type="search" className="form-control border-0 " placeholder="Search Here" style={{backgroundColor:"#F4F4F4"}} />
                         <button className="btn  border-0" type="button" id="button-addon2"><BsSearch /></button>
                       </div>
                      </div>
                    </Nav>

                    <Nav className="ms-auto me-5 col-2.5">

                   
                    <Nav.Link href="#home" className=" ms-auto my-auto ">
                        <span className="text-center">
                            <div><img src="/icons/cart.png" /></div>
                            <div className="p-1" style={rightMenuTextStyle}>My Cart</div>
                        </span>
                    </Nav.Link>

                    <Nav.Link href="#home" className=" ms-auto my-auto ">
                        <span className="text-center">
                            <div><img src="/icons/wallet.png" /></div>
                            <Dropdown className="">
                               <Dropdown.Toggle variant="transparent" id="dropdown-basic "  style={rightMenuTextStyle}>
                                 Wallet
                               </Dropdown.Toggle>
                         
                               <Dropdown.Menu>
                                 <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                 <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                 <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                               </Dropdown.Menu>
                             </Dropdown>
                        </span>
                    </Nav.Link>

                    <Nav.Link href="#home" className=" ms-auto my-auto  ">
                        <span className="text-center">
                            <div><img src="/icons/profile.png" /></div>
                            <Dropdown className="">
                              <Dropdown.Toggle variant="transparent" id="dropdown-basic "  style={rightMenuTextStyle}>
                                SignIn
                              </Dropdown.Toggle>
                       
                              <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                        </span>
                    </Nav.Link>
                    
                    </Nav>

                  </Navbar.Collapse>
                </Container>
              </Navbar>
     */

  const categoryBar = () => (
    <div style={{ backgroundColor: themeColor }}>
      <div className="row col-10 mx-auto p-2">
        <div className="col text-center">
          <Link style={{ textDecoration: "none" }}>
            <div>
              <img src="/icons/categoryIcons/card.png"></img>
            </div>
            <div className="text-white" style={menuBarTextStyle}>
              VIPS Card
            </div>
          </Link>
        </div>
        <div className="col text-center">
          <Link style={{ textDecoration: "none" }}>
            <div>
              <img src="/icons/categoryIcons/Recharge.png"></img>
            </div>
            <div className="text-white" style={menuBarTextStyle}>
              Recharge
            </div>
          </Link>
        </div>
        <div className="col text-center">
          <Link style={{ textDecoration: "none" }}>
            <div>
              <img src="/icons/categoryIcons/dth.png"></img>
            </div>
            <div className="text-white" style={menuBarTextStyle}>
              DTH
            </div>
          </Link>
        </div>
        <div className="col text-center">
          <Link style={{ textDecoration: "none" }}>
            <div>
              <img src="/icons/categoryIcons/broadband.png"></img>
            </div>
            <div className="text-white" style={menuBarTextStyle}>
              Broadband
            </div>
          </Link>
        </div>
        <div className="col text-center">
          <Link style={{ textDecoration: "none" }}>
            <div>
              <img src="/icons/categoryIcons/electricity.png"></img>
            </div>
            <div className="text-white" style={menuBarTextStyle}>
              Electricity
            </div>
          </Link>
        </div>
        <div className="col text-center">
          <Link style={{ textDecoration: "none" }}>
            <div>
              <img src="/icons/categoryIcons/flight.png"></img>
            </div>
            <div className="text-white" style={menuBarTextStyle}>
              Flight
            </div>
          </Link>
        </div>
        <div className="col text-center">
          <Link style={{ textDecoration: "none" }}>
            <div>
              <img src="/icons/categoryIcons/landline.png"></img>
            </div>
            <div className="text-white" style={menuBarTextStyle}>
              Landline
            </div>
          </Link>
        </div>
        <div className="col text-center">
          <Link style={{ textDecoration: "none" }}>
            <div>
              <img src="/icons/categoryIcons/pipedGas.png"></img>
            </div>
            <div className="text-white" style={menuBarTextStyle}>
              Gas
            </div>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {menubar1()}
      {menubar2()}
      {categoryBar()}
    </div>
  );
};

export default TopMenu;
