import { baseApiUrl, appType } from "../../constants";

export const sendMoneyOtp = (userName, password, recieverNo, amount) => {
  const formData = new FormData();

  formData.append("UserName", userName);
  formData.append("Password", password);
  formData.append("CrUserName", recieverNo);
  formData.append("Amount", amount);
  formData.append("Remarks", "");
  formData.append("Token", "ouehdjdj78wg4772bbdbdf35d9ad4a5");
  formData.append("Otp", "");
  formData.append("AppType", appType);

  return fetch(`${baseApiUrl}/RequestService/GetUserToUserTransfer`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${userName}:${password}`),
    },
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const sendMoney = (userName, password, recieverNo, amount, otp) => {
  const formData = new FormData();

  formData.append("UserName", userName);
  formData.append("Password", password);
  formData.append("CrUserName", recieverNo);
  formData.append("Amount", amount);
  formData.append("Remarks", "");
  formData.append("Token", "ouehdjdj78wg4772bbdbdf35d9ad4a5");
  formData.append("Otp", otp);
  formData.append("AppType", appType);
  var headers = new Headers();

  return fetch(`${baseApiUrl}/RequestService/GetUserToUserTransfer`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${userName}:${password}`),
    },
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

//{urc,fname,lname,email,phno,pin,pointType}

export const redirectedToGIBL = async () => {
  try {
    const data = await fetch(`${baseApiUrl}/Insurance/RedirectToGIBLPortal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urc: "9970039584",
        fname: "Nilesh",
        lname: "Kadam",
        email: "nilkadam085@gmail.com",
        phno: "9970039584",
        pin: "411046",
        pointType: "PRIME",
      }),
    });
    return await data.json();
  } catch (err) {}
};

export const postGIBL = async (urlData) => {
  var details = {
    ret_data: urlData,
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  await fetch("https://www.gibl.in/wallet/validate2/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  }).then((data) => {
    return data.json();
  });
};
