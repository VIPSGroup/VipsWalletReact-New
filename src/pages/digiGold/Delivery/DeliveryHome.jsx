import { Select } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/digigold/digigold-delivery.css";
import "../../../assets/styles/digigold/gold-home.css";
import MyVault from "../MyVault";
const DeliveryHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <section class="section-align buy-sell-form">
        <div class="container">
          <div class="digigold-work-section-head delivery-section-head">
            <h1 class="section-head-title py-2">Delivery</h1>
            <p class="col-lg-8 m-auto digigold-section-subtitle">
              The price mentioned here is a nominal fee for minting & delivering
              the coins at your doorstep. You need to have sufficient quantity
              of gold and silver to request delivery.
            </p>
          </div>

          <div class="row">
            <div class="col-lg-12">
              {/* <div class="my-vault-wrapper">
                <div class="col-lg-7 mx-auto my-vault-outer">
                  <div class="my-vault-badge-wrapper">
                    <span class="my-vault-badge">My Vault</span>
                  </div>
                  <div class="my-vault-inner">
                    <div class="vault-value">
                      <p class="vault-value-text">Gold Grams</p>
                      <p class="vault-value-count">0.0000 Grams</p>
                    </div>
                    <div class="vertical-separator"></div>
                    <div class="vault-value">
                      <p class="vault-value-text">Silver Grams</p>
                      <p class="vault-value-count">0.0000 Grams</p>
                    </div>
                  </div>
                </div>
              </div> */}
              <MyVault />
            </div>
          </div>
        </div>
      </section>

      <section class="delivery-charges">
        <div class="container-fluid">
          <div class="col-11 delivery-charges-outer">
            <div class="digigold-work-section-head">
              <h1 class="section-head-title">Making & Delivery Charges</h1>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="row justify-content-end digigold-product-select">
                  {/* <div class="dropdown">
                    <button
                      class="btn dropdown-toggle delivery-product-select-btn"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      All
                    </button>
                    <div class="dropdown-menu">
                      <button class="dropdown-item" type="button">
                        Product 1
                      </button>
                      <button class="dropdown-item" type="button">
                        Product 2
                      </button>
                      <button class="dropdown-item" type="button">
                        Product 3
                      </button>
                    </div>
                  </div> */}
                  <Select placeholder="All" style={{ width: 150 }}>
                    <Select.Option value="All">All</Select.Option>
                    <Select.Option value="Coin">Coin</Select.Option>
                    <Select.Option value="Jewellery">Jewellery</Select.Option>
                    <Select.Option value="Bar">Bar</Select.Option>
                  </Select>

                  <div class="digi-delivery-cart-badge">
                    <img
                      alt=""
                      src="/public/images/digigold-images/buy-icon.svg"
                      class="digigold-cart-badge-icon"
                    />
                    <div class="digigold-cart-badge">6</div>
                  </div>
                </div>
              </div>
              {cards.map((e) => {
                return (
                  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="digi-coin-wrapper">
                      <div class="digi-coin-img">
                        <img
                          src={e.productImages}
                          style={{ width: 200 }}
                          class="img img-fluid"
                          alt="VIPS Gold"
                        />
                      </div>
                      <div class="digi-coin-info">
                        <p class="digi-gram">{e.productWeight} gm</p>
                        <p class="digi-coin-product-name">{e.name}</p>
                        <p class="digi-coin-amt">&#x20B9; {e.basePrice}</p>
                        <p class="digi-coin-small-text">
                          (Making & Delivery Charges)
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          navigate(
                            `/digigold-delivery/${e.name
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`,
                            {
                              state: e,
                            }
                          )
                        }
                        class="btn btn-primery"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const cards = [
  {
    Id: 1,
    basePrice: "350.00",
    description:
      "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
    jewelleryType: "coin",
    metalType: "gold",
    name: "Augmont 1Gm Gold Coin (999 Purity)",
    productImages:
      "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
    productSize: "1",
    productWeight: "1.00",
    purity: "999.00",
    redeemWeight: "1.00",
    sku: "AU999GC01G",
    status: "active",
  },
  {
    Id: 2,

    basePrice: "350.00",
    description:
      "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
    jewelleryType: "coin",
    metalType: "gold",
    name: "Augmont 1Gm Gold Coin (999 Purity)",
    productImages:
      "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
    productSize: "1",
    productWeight: "1.00",
    purity: "999.00",
    redeemWeight: "1.00",
    sku: "AU999GC01G",
    status: "active",
  },
  {
    Id: 3,

    basePrice: "350.00",
    description:
      "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
    jewelleryType: "coin",
    metalType: "gold",
    name: "Augmont 1Gm Gold Coin (999 Purity)",
    productImages:
      "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
    productSize: "1",
    productWeight: "1.00",
    purity: "999.00",
    redeemWeight: "1.00",
    sku: "AU999GC01G",
    status: "active",
  },
  {
    Id: 4,

    basePrice: "350.00",
    description:
      "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
    jewelleryType: "coin",
    metalType: "gold",
    name: "Augmont 1Gm Gold Coin (999 Purity)",
    productImages:
      "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
    productSize: "1",
    productWeight: "1.00",
    purity: "999.00",
    redeemWeight: "1.00",
    sku: "AU999GC01G",
    status: "active",
  },
  {
    Id: 5,

    basePrice: "350.00",
    description:
      "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
    jewelleryType: "coin",
    metalType: "gold",
    name: "Augmont 1Gm Gold Coin (999 Purity)",
    productImages:
      "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
    productSize: "1",
    productWeight: "1.00",
    purity: "999.00",
    redeemWeight: "1.00",
    sku: "AU999GC01G",
    status: "active",
  },
  {
    Id: 6,

    basePrice: "350.00",
    description:
      "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
    jewelleryType: "coin",
    metalType: "gold",
    name: "Augmont 1Gm Gold Coin (999 Purity)",
    productImages:
      "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
    productSize: "1",
    productWeight: "1.00",
    purity: "999.00",
    redeemWeight: "1.00",
    sku: "AU999GC01G",
    status: "active",
  },
  {
    Id: 7,

    basePrice: "350.00",
    description:
      "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
    jewelleryType: "coin",
    metalType: "gold",
    name: "Augmont 1Gm Gold Coin (999 Purity)",
    productImages:
      "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
    productSize: "1",
    productWeight: "1.00",
    purity: "999.00",
    redeemWeight: "1.00",
    sku: "AU999GC01G",
    status: "active",
  },
  {
    Id: 8,

    basePrice: "350.00",
    description:
      "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
    jewelleryType: "coin",
    metalType: "gold",
    name: "Augmont 1Gm Gold Coin (999 Purity)",
    productImages:
      "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
    productSize: "1",
    productWeight: "1.00",
    purity: "999.00",
    redeemWeight: "1.00",
    sku: "AU999GC01G",
    status: "active",
  },
  {
    Id: 9,

    basePrice: "350.00",
    description:
      "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
    jewelleryType: "coin",
    metalType: "gold",
    name: "Augmont 1Gm Gold Coin (999 Purity)",
    productImages:
      "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
    productSize: "1",
    productWeight: "1.00",
    purity: "999.00",
    redeemWeight: "1.00",
    sku: "AU999GC01G",
    status: "active",
  },
  {
    Id: 10,

    basePrice: "350.00",
    description:
      "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
    jewelleryType: "coin",
    metalType: "gold",
    name: "Augmont 1Gm Gold Coin (999 Purity)",
    productImages:
      "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
    productSize: "1",
    productWeight: "1.00",
    purity: "999.00",
    redeemWeight: "1.00",
    sku: "AU999GC01G",
    status: "active",
  },
  {
    Id: 11,

    basePrice: "350.00",
    description:
      "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
    jewelleryType: "coin",
    metalType: "gold",
    name: "Augmont 1Gm Gold Coin (999 Purity)",
    productImages:
      "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
    productSize: "1",
    productWeight: "1.00",
    purity: "999.00",
    redeemWeight: "1.00",
    sku: "AU999GC01G",
    status: "active",
  },
];

export default DeliveryHome;
