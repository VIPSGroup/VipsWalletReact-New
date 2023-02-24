import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddToCartButton = ({
  product,
  selectedColor,
  selectedSize,
  quantity,
  alreadyInCart,
}) => {
  let navigate = useNavigate();

  // const checkInCart = () => {
  //   let cartProducts = JSON.parse(localStorage.getItem("cart"));

  //   cartProducts &&
  //     cartProducts.map((c, i) => {
  //       if (c.product.Id == product.ProductDetails.Id) {
  //         return true;
  //       }
  //     });
  //   return false;
  // };

  const handleAddClick = (e) => {
    e.preventDefault();

    if (!alreadyInCart) {
      const cartProductDetails = {
        product: product.ProductDetails,
        charges: product.ProductTax,
        selectedColor: selectedColor,
        selectedSize: selectedSize,
        qty: quantity,
      };

      let prevCart = JSON.parse(localStorage.getItem("cart"));

      let cartToBe = [];
      if (prevCart) {
        cartToBe = [...prevCart];
      }

      cartToBe.push(cartProductDetails);

      // let strWishlist= JSON.stringify(wishlistToBe);
      localStorage.setItem("cart", JSON.stringify(cartToBe));
    }
    navigate("/shopping/cart");
  };

  return (
    <button onClick={handleAddClick} class="btn btn-cta mr-3" type="button">
      {" "}
      {alreadyInCart ? "Go To Cart" : "Add To Cart"}{" "}
    </button>
  );
};

export default AddToCartButton;
