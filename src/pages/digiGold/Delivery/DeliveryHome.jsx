import { Pagination, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/digigold/digigold-delivery.css";
import "../../../assets/styles/digigold/gold-home.css";
import MyVault from "../MyVault";
import { getMetalProductlist } from "../../../redux/slices/digiGold/delivery/DeliverySlice";
const DeliveryHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { items } = useSelector((state) => state.DeliverySlice);
  const { list, listLoading } = useSelector(
    (state) => state.DeliverySlice.coinList
  );

  useEffect(() => {
    dispatch(getMetalProductlist({ page }));
  }, []);
  // console.log(list.Data.result.data, "list.Data.result.data");
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
              <MyVault />
            </div>
          </div>
        </div>
      </section>
      <Spin spinning={listLoading}>
        <section class="delivery-charges">
          <div class="container-fluid">
            <div class="col-11 delivery-charges-outer">
              <div class="digigold-work-section-head">
                <h1 class="section-head-title">Making & Delivery Charges</h1>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="row justify-content-end digigold-product-select">
                    <Select placeholder="All" style={{ width: 150 }}>
                      <Select.Option value="All">All</Select.Option>
                      <Select.Option value="Coin">Coin</Select.Option>
                      <Select.Option value="Jewellery">Jewellery</Select.Option>
                      <Select.Option value="Bar">Bar</Select.Option>
                    </Select>

                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/vipsgold-cart")}
                      class="digi-delivery-cart-badge"
                    >
                      <img
                        alt=""
                        src="/images/digigold-images/cart-icon.svg"
                        class="digigold-cart-badge-icon"
                      />

                      <div class="digigold-cart-badge">{items?.length}</div>
                    </div>
                  </div>
                </div>

                {list?.Data?.result?.data?.map((e) => {
                  return (
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                      <div class="digi-coin-wrapper">
                        <div class="digi-coin-img">
                          <img
                            src={e.productImages[0].url}
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
                              `/vipsgold-delivery/${e.name
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
        <div className="">
          <Pagination defaultCurrent={1} total={50}/>
        </div>
      </Spin>
    </>
  );
};

// export const cards = [
//   {
//     Id: 1,
//     basePrice: "350.00",
//     description:
//       "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
//     jewelleryType: "coin",
//     metalType: "gold",
//     name: "Augmont 1Gm Gold Coin (999 Purity)",
//     productImages:
//       "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
//     productSize: "1",
//     productWeight: "1.00",
//     purity: "999.00",
//     redeemWeight: "1.00",
//     sku: "AU999GC01G",
//     status: "active",
//   },
//   {
//     Id: 2,

//     basePrice: "350.00",
//     description:
//       "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
//     jewelleryType: "coin",
//     metalType: "gold",
//     name: "Augmont 1Gm Gold Coin (999 Purity)",
//     productImages:
//       "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
//     productSize: "1",
//     productWeight: "1.00",
//     purity: "999.00",
//     redeemWeight: "1.00",
//     sku: "AU999GC01G",
//     status: "active",
//   },
//   {
//     Id: 3,

//     basePrice: "350.00",
//     description:
//       "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
//     jewelleryType: "coin",
//     metalType: "gold",
//     name: "Augmont 1Gm Gold Coin (999 Purity)",
//     productImages:
//       "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
//     productSize: "1",
//     productWeight: "1.00",
//     purity: "999.00",
//     redeemWeight: "1.00",
//     sku: "AU999GC01G",
//     status: "active",
//   },
//   {
//     Id: 4,

//     basePrice: "350.00",
//     description:
//       "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
//     jewelleryType: "coin",
//     metalType: "gold",
//     name: "Augmont 1Gm Gold Coin (999 Purity)",
//     productImages:
//       "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
//     productSize: "1",
//     productWeight: "1.00",
//     purity: "999.00",
//     redeemWeight: "1.00",
//     sku: "AU999GC01G",
//     status: "active",
//   },
//   {
//     Id: 5,

//     basePrice: "350.00",
//     description:
//       "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
//     jewelleryType: "coin",
//     metalType: "gold",
//     name: "Augmont 1Gm Gold Coin (999 Purity)",
//     productImages:
//       "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
//     productSize: "1",
//     productWeight: "1.00",
//     purity: "999.00",
//     redeemWeight: "1.00",
//     sku: "AU999GC01G",
//     status: "active",
//   },
//   {
//     Id: 6,

//     basePrice: "350.00",
//     description:
//       "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
//     jewelleryType: "coin",
//     metalType: "gold",
//     name: "Augmont 1Gm Gold Coin (999 Purity)",
//     productImages:
//       "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
//     productSize: "1",
//     productWeight: "1.00",
//     purity: "999.00",
//     redeemWeight: "1.00",
//     sku: "AU999GC01G",
//     status: "active",
//   },
//   {
//     Id: 7,

//     basePrice: "350.00",
//     description:
//       "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
//     jewelleryType: "coin",
//     metalType: "gold",
//     name: "Augmont 1Gm Gold Coin (999 Purity)",
//     productImages:
//       "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
//     productSize: "1",
//     productWeight: "1.00",
//     purity: "999.00",
//     redeemWeight: "1.00",
//     sku: "AU999GC01G",
//     status: "active",
//   },
//   {
//     Id: 8,

//     basePrice: "350.00",
//     description:
//       "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
//     jewelleryType: "coin",
//     metalType: "gold",
//     name: "Augmont 1Gm Gold Coin (999 Purity)",
//     productImages:
//       "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
//     productSize: "1",
//     productWeight: "1.00",
//     purity: "999.00",
//     redeemWeight: "1.00",
//     sku: "AU999GC01G",
//     status: "active",
//   },
//   {
//     Id: 9,

//     basePrice: "350.00",
//     description:
//       "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
//     jewelleryType: "coin",
//     metalType: "gold",
//     name: "Augmont 1Gm Gold Coin (999 Purity)",
//     productImages:
//       "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
//     productSize: "1",
//     productWeight: "1.00",
//     purity: "999.00",
//     redeemWeight: "1.00",
//     sku: "AU999GC01G",
//     status: "active",
//   },
//   {
//     Id: 10,

//     basePrice: "350.00",
//     description:
//       "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
//     jewelleryType: "coin",
//     metalType: "gold",
//     name: "Augmont 1Gm Gold Coin (999 Purity)",
//     productImages:
//       "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
//     productSize: "1",
//     productWeight: "1.00",
//     purity: "999.00",
//     redeemWeight: "1.00",
//     sku: "AU999GC01G",
//     status: "active",
//   },
//   {
//     Id: 11,

//     basePrice: "350.00",
//     description:
//       "<p>Auspicious 1 gram gold coin crafted with 999 purity and 24k pure gold by Augmont is sure to bring prosperity and luck in your life, this gold coin is a great investment choice for your present and future, gold coin is also valuable and makes a best gift to appreciate your dear and near ones.</p>",
//     jewelleryType: "coin",
//     metalType: "gold",
//     name: "Augmont 1Gm Gold Coin (999 Purity)",
//     productImages:
//       "https://prod-augmontgold.s3.ap-south-1.amazonaws.com/products/1/gallery/3eb57c8409724cc500218a57e885d556.png",
//     productSize: "1",
//     productWeight: "1.00",
//     purity: "999.00",
//     redeemWeight: "1.00",
//     sku: "AU999GC01G",
//     status: "active",
//   },
// ];

export default DeliveryHome;
