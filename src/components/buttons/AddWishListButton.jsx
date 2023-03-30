import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWish, removeWish } from "../../redux/slices/shopping/wishlistSlice";
import { MuiSnackBar } from "../common";

const AddWishListButton = ({
  product,
  inWishlist,
  inWishlistStateChanger,
  stateChanger,
  wishlistState,
}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [isproductInWishlist, setIsProductInWishlist] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();

    let prevWishlist = JSON.parse(localStorage.getItem("wishlist"));

    let wishlistToBe = [];
    if (prevWishlist) {
      wishlistToBe = [...prevWishlist];
    }

    wishlistToBe.push(product);

    let strWishlist = JSON.stringify(wishlistToBe);
    dispatch(addWish(wishlistToBe));
    localStorage.setItem("wishlist", JSON.stringify(wishlistToBe));
    // window.location.reload()
    stateChanger(!wishlistState);

    setIsSnackBar(true)
    setSuccessMsg("Product was added to Wishlist successfully")
  };

  const removeFromWishlist = (e) => {
    e.preventDefault();
    const wishlistData = JSON.parse(localStorage.getItem("wishlist"));
    wishlistData.map((w, i) => {
      if (w.Id == product.Id) {
        dispatch(removeWish(w?.Id));
        const data = wishlistData.splice(i, 1);
        const newWishlist = [...wishlistData];
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
        inWishlistStateChanger(false);
        setIsProductInWishlist(false);
      }
    });

  };

  return <>
  { inWishlist === true ? (
    <button onClick={removeFromWishlist} type="button" class="btn-cta">
      <i class="fa-solid fa-heart fa-primery"></i>
    </button>
  ) : (
    <button onClick={handleWishlist} type="button" class="btn-cta">
      <i class="fa-regular fa-heart"></i>
    </button>
  )}
  <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              successMsg={successMsg}
              setSuccess={setSuccessMsg}
            />
  </>
 
};

export default AddWishListButton;
