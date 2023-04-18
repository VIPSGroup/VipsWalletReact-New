import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getTransactionId } from "../../constants";
import { getPayUHash } from "../../redux/slices/payment/paymentSlice";
import { ThemeButton } from "../common";
import { useEffect } from "react";

const AddMoneyButton = ({
  amount,
  setIsSnackBar,
  setErrorMsg,
  isCreditCardEnable = false,
  chargesAmount,
}) => {
  const {data,key,string}= useSelector(state=>state.paymentSlice.configBySubKey)

  const formRef = useRef(null);
  const [hash, setHash] = useState("");
  // const [value, setValue] = useState("");
  // const [stringValue, setStringValue] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const clickAddMoney = (e) => {
    setIsSnackBar(false);
    e.preventDefault();
    if (amount && amount > 0) {
      if (amount <= 5000) {
        const trxnId = getTransactionId();
        setTransactionId(trxnId);
        console.log(chargesAmount);
        getPayUHash(user, trxnId, amount,key,string, chargesAmount).then(async (res) => {
          formRef.current.txnid.value = trxnId;
          formRef.current.hash.value = res?.results?.payment_hash;
          setHash(res?.results?.payment_hash);
          const resp = await formRef.current.submit();
          if(res.status==='Failed'){
            setIsSnackBar(true)
            setErrorMsg(res.errormsg)
          }
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
  useEffect(() => {
    // if(data){
    //  if(data.ResponseStatus === 1){
    //   setValue(data.Data.Key)
    //   setStringValue(data.Data.String)
    //  }
    // }
   }, [data])
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
        <input name="firstname" type="hidden" value={user.Name.split(" ")[0]} />
        <input name="txnid" type="hidden" value={getTranId()} />

        <input name="productinfo" type="hidden" value="AddMoney" />
        <input name="phone" type="hidden" value={user && user.Mobile} />
        <input
          name="furl"
          type="hidden"
          value={`https://api.vipswallet.com/Home/PostHitURL?code=${user.UserName}`}
        />
        <input name="key" type="hidden" value={key} />
        <input name="hash" type="hidden" value={callHash()} />
        <input name="email" type="hidden" value={user && user.Emailid} />
        <input name="enforce_paymethod" type="hidden" value="CC" />
        {isCreditCardEnable ? <input name="drop_category" type="hidden" value="CC" />
        :<input name="enforce_paymethod" type="hidden" value="creditcard" />

           }
        <input
          name="surl"
          type="hidden"
          value={`https://api.vipswallet.com/Home/PostHitURL?code=${user.UserName}`}
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
      {user && <div>{payuform()}</div>}
    </div>
  );
};

export default AddMoneyButton;