import { baseApiUrl, appType } from "../../constants";

export const getFastagOperators = () => {
  const formData = new FormData();
  formData.append("ServiceId", "36");
  return fetch(
    `${baseApiUrl}/OperatorServices/GetCommonElectricityOperatorByServiceId`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const getInputFieldsByOperator = (ourCode) => {
  const formData = new FormData();
  formData.append("billerId", ourCode);
  return fetch(`${baseApiUrl}/Recharge/GetRegexValidationForLPG`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const fastagOnlineConfirmation = (
  username,
  password,
  billAmount,
  inputObj,
  paymentRef,
  refId,
  operatorCode,
  mobNo,
  pointType
) => {
  const formData = new FormData();

  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("paymentReferenceId", paymentRef);
  formData.append("billAmount", billAmount);
  formData.append("convFees", "00");
  formData.append("paymentMode", "Wallet");
  formData.append("referenceId", refId);
  formData.append("Number", inputObj[0].fieldValue);
  formData.append("BillUnit", "");
  formData.append("paymentInfoTagValue", "vipswallet|7720021133");
  formData.append("IP", "123");
  formData.append("OperatorCode", operatorCode);
  formData.append("PointType", pointType);
  formData.append("MobileNumber", mobNo);
  formData.append("registerMobileNumber", mobNo);
  formData.append("customerMobileNumber", mobNo);
  formData.append("AppType", appType);

  inputObj.map((e) => {
    formData.append(`${e.fieldName}`, `${e.fieldValue}`);
  });

  return fetch(`${baseApiUrl}/Recharge/GetFastTagBillPaymentsFBBPS`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
