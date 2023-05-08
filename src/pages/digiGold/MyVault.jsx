import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "../../redux/slices/digiGold/digiGoldSlice";

export const CurrentRateSection = ({ active }) => {
  const { rateData, loading } = useSelector(
    (state) => state.digiGoldSlice.rates
  );
  return (
    <>
      <div class="current-rate-outer">
        <div class="current-rate">
          <span class="current-rate-title mb-3">GOLD</span>
          <span class="current-rate-amt">
            &#x20B9;{" "}
            {!loading && rateData
              ? parseFloat(active) === 0
                ? rateData.Data?.result?.data?.rates?.gBuy
                : rateData?.Data?.result?.data?.rates?.gSell
              : "Loading..."}{" "}
            / gm
          </span>
        </div>
        <div class="digi-icon d-none d-md-block">
          <img src="/images/digigold-images/digi-icon.svg" alt="" />
        </div>
        <div className="vertical-separator d-md-none d-sm-block"></div>
        <div class="current-rate">
          <span class="current-rate-title mb-3">SILVER</span>
          <span class="current-rate-amt">
            {" "}
            &#x20B9;{" "}
            {!loading && rateData
              ? parseFloat(active) === 0
                ? rateData?.Data?.result?.data?.rates?.sBuy
                : rateData?.Data?.result?.data?.rates?.sSell
              : "Loading..."}{" "}
            / gm
          </span>
        </div>
      </div>
    </>
  );
};

const MyVault = ({ setStep }) => {
  const dispatch = useDispatch();
  // const [step, setStep] = useState("");
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
            onClick={() => {
              dispatch(modalOpen());
              setStep(0);
            }}
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
