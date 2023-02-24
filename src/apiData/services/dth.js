import { baseApiUrl, appType } from "../../constants";

export const getOperators = () => {
  const formData = new FormData();
  formData.append("ServiceId", "2");
  return fetch(`${baseApiUrl}/operatorServices/GetOperatorName`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const finalDth = (
  userName,
  password,
  amount,
  number,
  operatorId,
  pointType
) => {
  const formData = new FormData();
  // formData.append('MobileNumber', mobileNo);
  formData.append("username", userName);
  formData.append("password", password);
  formData.append("amount", amount);
  formData.append("mobileNumber", number);
  formData.append("optid", operatorId);
  formData.append("circle", "0");
  formData.append("type", "DTH Number");
  formData.append("accountNo", "");
  formData.append("isShop", true);
  formData.append("pointType", pointType);
  formData.append("AppType", appType);

  return fetch(`${baseApiUrl}/Recharge/GetAllRecharge`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
