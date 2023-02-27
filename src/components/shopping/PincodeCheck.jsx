import React, { useState, useEffect } from "react";
import { checkPincode } from "../../apiData/shopping/shopping";

const PincodeCheck = ({ productId, setIsSnackBar, setErrorMsg }) => {
  const [pincode, setPincode] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const handlePincode = (e) => {
    setApiResponse("");
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setPincode(value);
    }
  };

  const clickCheckPincode = (e) => {
    e.preventDefault();
    setApiResponse("");
    checkPincode(productId, pincode).then((response) => {
      if (response.ResponseStatus === 1) {
        setApiResponse(response.Remarks);
      } else {
        setIsSnackBar(true);
        setErrorMsg(response.Remarks);
      }
    });
  };

  return (
    <div class="quick-view-info-box">
      <h3 class="quick-view-box-title">Delivery Option :</h3>
      <div class="quick-view-pincode">
        <p>
          Enter your area / village pincode below to check this product is
          available or not for delivery to your door steps.
        </p>

        <form>
          <div class="input-group">
            <input
              onChange={handlePincode}
              type="text"
              class="form-control"
              placeholder="Enter a pin code"
              name="pincone"
              value={pincode}
              minLength={6}
              maxLength={6}
              required
            />
            <div class="input-group-append">
              <button onClick={clickCheckPincode} class="input-group-text">
                Check
              </button>
            </div>
          </div>
        </form>
        <p class="text-success mb-0">{apiResponse}</p>
      </div>
    </div>
  );
};

export default PincodeCheck;
