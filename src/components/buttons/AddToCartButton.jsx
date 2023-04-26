import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCart } from "../../redux/slices/shopping/cartSlice";
import { MuiSnackBar } from "../common";

const AddToCartButton = ({
  product,
  selectedColor,
  selectedSize,
  quantity,
  alreadyInCart,
}) => {
  let navigate = useNavigate();
const dispatch= useDispatch()
const [isSnackBar, setIsSnackBar] = useState(false);
const [successMsg, setSuccessMsg] = useState("");
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
dispatch(addCart(cartToBe))
      localStorage.setItem("cart", JSON.stringify(cartToBe));
    }
    navigate("/shopping/cart");
    setIsSnackBar(true)
    setSuccessMsg("Product was added to Cart successfully")
  };

  return <>{ alreadyInCart===true ?<button onClick={()=>{
    navigate("/shopping/cart")
  }} class="btn btn-cta mr-3" type="button">Go To Cart</button>
  :<button onClick={handleAddClick} class="btn btn-cta mr-3" type="button">Add To Cart</button>}
  <MuiSnackBar
  open={isSnackBar}
  setOpen={setIsSnackBar}
  successMsg={successMsg}
  setSuccess={setSuccessMsg}
/>
</>
};

export default AddToCartButton;

