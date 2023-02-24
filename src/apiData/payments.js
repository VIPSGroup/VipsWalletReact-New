import sha512 from "crypto-js/sha512";
import { baseApiUrl, appType } from "../constants";

export const getTransactionId = () => {
  var randomString =
    Math.floor(Math.random() * 100).toString() + (Date.now() / 1000).toString();

  const finalHash = sha512(randomString).toString().substring(0, 20);
  return finalHash;
};

export const getPayUHash = (user, transactionId, amount) => {
  const formData = new FormData();
  const fname = user.Name.split(" ")[0];
  formData.append("txnid", transactionId);
  formData.append("amount", amount);
  formData.append("productinfo", "AddMoney");
  formData.append("firstname", fname);
  formData.append("email", user.Emailid);
  formData.append("user_credentials", "e9ZmdY:" + user.UserName);
  formData.append("transactionType", "ADD_MONEY");
  formData.append("AppType", appType);
  return fetch(`${baseApiUrl}/payuhash`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const checkGABBalance = (username, password) => {
  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);

  return fetch(`${baseApiUrl}/UserServices/GetHolidayBalance`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const addMoneyFromGAB = (username, password, amount) => {
  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);
  formData.append("Amount", amount);
  formData.append("PayType", "VIPSHOLIDAY");

  return fetch(`${baseApiUrl}/RequestService/GetWithdrawByVips`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const finstockGenerateOtp = (username, password, email, vipsCoin) => {
  const formData = new FormData();

  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("email", email);
  formData.append("VipsCoin", vipsCoin);

  const data = {
    UserName: username,
    Password: password,
    email: email,
    VipsCoin: vipsCoin,
  };

  var json = JSON.stringify(data);

  return fetch(`${baseApiUrl}/RequestService/VIPSFINSTOCK_GENERATE_OTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    body: json,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const finstockAdd = (
  username,
  password,
  email,
  vipsCoin,
  otp,
  vipstxid
) => {
  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);
  formData.append("email", email);
  formData.append("otp", otp);
  formData.append("VipsCoin", vipsCoin);
  formData.append("vipstxid", vipstxid);

  const data = {
    UserName: username,
    Password: password,
    email: email,
    VipsCoin: vipsCoin,
    otp: otp,
    vipstxid: vipstxid,
  };

  var json = JSON.stringify(data);

  return fetch(`${baseApiUrl}/RequestService/VIPSFINSTOCK_WITHDRAWALS`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    body: json,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const finstocTradePriceCheck = (username, password) => {
  const data = {
    UserName: username,
    Password: password,
  };

  return fetch(`${baseApiUrl}/RequestService/VIPSFINSTOCK_RECENT_TRADES_RATE`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
