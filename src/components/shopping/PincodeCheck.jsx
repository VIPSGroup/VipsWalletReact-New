import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkPinCode } from "../../redux/slices/pincodeSlice";

const PincodeCheck = ({ productId, setIsSnackBar, setErrorMsg }) => {
  const dispatch = useDispatch();
  const [pincode, setPincode] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const { data } = useSelector((state) => state.pincodeSlice.pinCode);
  const handlePincode = (e) => {
    setApiResponse("");
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setPincode(value);
    }
  };
  const clickCheckPincode = async (e) => {
    if (pincode) {
      setApiResponse("");
      const res = await dispatch(checkPinCode({ pincode, productId }));
      if (res.payload.ResponseStatus === 1) {
        setApiResponse(res.payload.Remarks);
      } else if (res.payload.ResponseStatus === 0) {
        setIsSnackBar(true);
        setErrorMsg(res.payload?.Remarks);
      }
    } else {
      setIsSnackBar(true);
      setErrorMsg("Please Enter Pin Code");
    }
  };

  // useEffect(() => {
  //   if (data.ResponseStatus === 1) {
  //     setApiResponse(data?.Remarks);
  //   } else if (data.ResponseStatus === 0) {
  //     setIsSnackBar(true);
  //     setErrorMsg(data?.Remarks);
  //   }
  // }, [data]);

  return (
    <div class="quick-view-info-box">
      <h3 class="quick-view-box-title">Delivery Option :</h3>
      <div class="quick-view-pincode">
        <p>
          Enter your area / village pincode below to check this product is
          available or not for delivery to your door steps.
        </p>

        <div>
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
              // required
            />
            <div class="input-group-append">
              <button onClick={clickCheckPincode} class="input-group-text">
                Check
              </button>
            </div>
          </div>
        </div>
        <p class="text-success mb-0">{apiResponse}</p>
      </div>
    </div>
  );
};

export default PincodeCheck;
