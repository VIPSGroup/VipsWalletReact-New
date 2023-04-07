import React from "react";
import { Link } from "react-router-dom";
import {
  appStoreUrl,
  facebookUrl,
  instaUrl,
  linkedinUrl,
  needHelpUrl,
  playStoreUrl,
  twitterUrl,
  youtubeUrl,
} from "../../../constant/Constants";
import "../../../assets/styles/home/footer.css";

const Footer = () => {
  return (
    <>
      <section class="vips-footer footer-section mb-0 mt-5">
        <footer class="footer-outer">
          <div class="container">
            <div class="footer-inner">
              <div class="footer-box">
                <div class="footer-logo mb-3">
                  <img
                    src="/images/VipsLogoMain.png"
                    alt="VIPS LOGO"
                    class=""
                  />
                </div>

                <div class="social mt-4 mb-3">
                  <h5 class="heading">Join Us</h5>

                  <div class="footer-social-icons">
                    {Socialicons.map((e, i) => {
                      return (
                        <Link
                          key={i}
                          to={e.link}
                          target="_blank"
                          class="footer-twitter"
                        >
                          <i class={e.icon}></i>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div class="social mt-4">
                  <h5 class="heading">Download App</h5>
                  <div class="footer-social-icons">
                    {Downloadurl.map((e, i) => {
                      return (
                        <Link
                          key={i}
                          to={e.link}
                          target="_blank"
                          class="footer-apple"
                        >
                          <i class={e.icon}></i>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div class="footer-box">
                <h5 class="heading">VIPS Wallet</h5>
                <ul class="">
                  {UsefullLinks.map((e, i) => {
                    return (
                      <li key={i}>
                        <Link to={e.route}>
                          {" "}
                          {e.title}{" "}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div class="footer-box">
                <h5 class="heading">Policies</h5>
                <ul class="">
                  <li>
                    {" "}
                    <Link to="/privacypolicy" target="_blank">
                      {" "}
                      Privacy Policy{" "}
                    </Link>{" "}
                  </li>

                  <li>
                    {" "}
                    <Link to="/termscondtion" target="_blank">
                      {" "}
                      Terms & Conditions{" "}
                    </Link>{" "}
                  </li>
                  {/* <li> <Link to="/"> Cancellation Policy </Link> </li> */}
                </ul>
              </div>

              <div class="footer-box">
                <h5 class="heading">Services</h5>
                <ul class="">
                  <li>
                    {" "}
                    <Link to="/shopping"> VIPS Shopping </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="/services"> Recharge & Pay Bills </Link>{" "}
                  </li>
                </ul>
              </div>

              <div class="footer-box border-btm-no">
                <h5 class="heading">Customer Care</h5>
                <ul class="footer-contact">
                  <li>
                    {" "}
                    <Link to={needHelpUrl} target="_blank">
                      <i class="fa-solid fa-phone"></i> 9922098098{" "}
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="mailto:support@vipswallet.com">
                      {" "}
                      <i class="fa-solid fa-envelope"></i>{" "}
                      support@vipswallet.com{" "}
                    </Link>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        <div class="footer-bottom">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-sm-12 col-xs-6">
                <div class="footer-copyright">
                  <p>
                    VIPS WALLET PVT LTD © 2023 All Rights Reserved. Designed by{" "}
                    <Link to="/"> vipswallet.com </Link>{" "}
                  </p>
                </div>
              </div>

              <div class="col-lg-6 col-sm-12 col-xs-6">
                <div class="policy">
                  <div>
                    {" "}
                    <Link to="/termscondtion" target="_blank">
                      {" "}
                      Terms & Conditions{" "}
                    </Link>{" "}
                  </div>
                  <div>
                    {" "}
                    <Link to="/privacypolicy" target="_blank">
                      {" "}
                      Privacy Policy{" "}
                    </Link>{" "}
                  </div>
                  {/* <div> <Link to="#" target="_blank"> Sitemap </Link> </div> */}
                  {/* <div> <Link to="#"> Disclaimer </Link> </div>  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Socialicons = [
  {
    link: twitterUrl,
    icon: "fa fa-twitter fa-lg",
  },
  {
    link: youtubeUrl,
    icon: "fa-brands fa-youtube",
  },
  {
    link: linkedinUrl,
    icon: "fa fa-linkedin-square fa-lg",
  },
  {
    link: instaUrl,
    icon: "fa fa-instagram fa-lg",
  },
  {
    link: facebookUrl,
    icon: "fa-brands fa-facebook",
  },
];
const Downloadurl = [
  {
    link: appStoreUrl,
    icon: "fa-brands fa-apple fa-lg",
  },
  {
    link: playStoreUrl,
    icon: "fa fa-android fa-lg",
  },
];
const UsefullLinks = [
  {
    title: "My Account",
    route: "/myaccount",
  },
  {
    title: "About us",
    route: "/aboutus",
  },
  {
    title: "Contact us",
    route: "/contactus",
  },
  {
    title: "FAQ's",
    route: "/faq",
  },
];

export default Footer;
