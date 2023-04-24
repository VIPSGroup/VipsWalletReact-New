import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "../../redux/slices/digiGold/digiGoldSlice";

const MyVault = () => {
  const dispatch = useDispatch();
  const { logData, loading: digiLogLoading } = useSelector(
    (state) => state.registerDigiSlice.login
  );
  const { loggedInUser, loading: logLoading } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { rateData, loading } = useSelector(
    (state) => state.digiGoldSlice.rates
  );
  return (
    <>
      {loggedInUser && !logData?.Data && (
        <div class="col-lg-7 mx-auto digigold-logintext">
          <p class="digigold-logintext-title mt-2">
            You are not Register on DigiGold
          </p>
          <button
            onClick={() => dispatch(modalOpen())}
            class="digigold-logintext-btn mt-2 btn-primery"
          >
            Register now
          </button>
        </div>
      )}
      {loggedInUser && logData?.Data && (
        <div class="my-vault-wrapper">
          <div class="col-lg-7 mx-auto">
            <div class="my-vault-badge-wrapper">
              <span class="my-vault-badge">My Vault</span>
            </div>
            <div class="my-vault-inner">
              <div class="vault-value">
                <p class="vault-value-text">Gold Grams</p>
                <p class="vault-value-count mt-3">
                  {" "}
                  {logData.Data && !loading
                    ? logData.Data.GoldGrams?.toFixed(4)
                    : "0.0000"}{" "}
                  Grams
                </p>
              </div>
              <div class="vertical-separator"></div>
              <div class="vault-value">
                <p class="vault-value-text">Silver Grams</p>
                <p class="vault-value-count mt-3">
                  {" "}
                  {logData.Data && !loading
                    ? logData.Data.SilverGrams?.toFixed(4)
                    : "0.0000"}{" "}
                  Grams
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyVault;
