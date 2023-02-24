import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTransactionId, getPayUHash } from "../../apiData/payments";
import { GetUserDetail } from "../common/GetUserDetail";
import { MuiSnackBar } from "../common/snackbars";

const AddMoneyButton = ({ amount, setIsSnackBar, setErrorMsg }) => {
  const [loggedInUser, setLoggedInUser] = useState("");

  // const {loggedInUser}=useSelector(state=>state.login)
  const formRef = useRef(null);
  // const hashInputRef=useRef(null)
  useEffect(() => {
    setLoggedInUser(GetUserDetail());
  }, []);

  const [hash, setHash] = useState("");
  const [transactionId, setTransactionId] = useState("");
  var hashstring = "";
  const clickAddMoney = (e) => {
    setIsSnackBar(false);
    e.preventDefault();
    if (amount && amount > 0) {
      if (amount <= 5000) {
        const trxnId = getTransactionId();
        setTransactionId(trxnId);
        getPayUHash(loggedInUser, trxnId, amount).then(async (res) => {
          formRef.current.txnid.value = trxnId;
          formRef.current.hash.value = res.results.payment_hash;
          setHash(res.results.payment_hash);
          hashstring = res.results.payment_hash;
          const resp = await formRef.current.submit();
        });
      } else {
        setIsSnackBar(true);
        setErrorMsg("Max amount is 5000");
      }
    } else {
      setIsSnackBar(true);
      setErrorMsg("Please enter valid amount");
    }
  };

  const getTranId = () => {
    return transactionId;
  };

  const callHash = () => {
    const value = hash;
    return value;
  };

  const payuform = () => (
    <body>
      <form
        id="form1"
        ref={formRef}
        action="https://secure.payu.in/_payment"
        method="post"
        target="_blank"
      >
        <input
          name="firstname"
          type="hidden"
          value={loggedInUser.Name.split(" ")[0]}
        />
        <input name="txnid" type="hidden" value={getTranId()} />

        <input name="productinfo" type="hidden" value="AddMoney" />
        <input
          name="phone"
          type="hidden"
          value={loggedInUser && loggedInUser.Mobile}
        />
        <input
          name="furl"
          type="hidden"
          value={`http://api.vipswallet.com/api/Ecommerceservices/GetCallURL?code=${
            loggedInUser && loggedInUser.UserName
          }`}
        />
        <input name="key" type="hidden" value="e9ZmdY" />
        <input name="hash" type="hidden" value={callHash()} />
        <input
          name="email"
          type="hidden"
          value={loggedInUser && loggedInUser.Emailid}
        />
        <input
          name="surl"
          type="hidden"
          value={`http://api.vipswallet.com/api/Ecommerceservices/GetCallURL?code=${
            loggedInUser && loggedInUser.UserName
          }`}
        />
        <input name="amount" type="hidden" value={amount} />
      </form>
    </body>
  );

  return (
    <div class="add-money-body">
      <div class="col-md-12">
        <div class="add-money-btn">
          <button
            onClick={clickAddMoney}
            href="#"
            class="btn-primery"
            id="addmoneymodal"
            data-toggle="modal"
            data-target="#addmoneyform"
          >
            {" "}
            Add Money{" "}
          </button>
        </div>
      </div>
      {loggedInUser && <div>{payuform()}</div>}
    </div>
  );
};

export default AddMoneyButton;
