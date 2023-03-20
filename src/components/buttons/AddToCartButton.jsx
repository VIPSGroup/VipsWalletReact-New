import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeButton } from "../common";

const AddToCartButton = ({
  product,
  selectedColor,
  selectedSize,
  quantity,
  alreadyInCart,
}) => {
  let navigate = useNavigate();

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
    // <ThemeButton value={alreadyInCart ? "Go To Cart" : "Add To Cart"} onClick={handleAddClick} class="btn btn-cta mr-3"/>
    <button onClick={handleAddClick} class="btn btn-cta mr-3" type="button">
      {" "}
      {alreadyInCart ? "Go To Cart" : "Add To Cart"}{" "}
    </button>
  );
};

export default AddToCartButton;
