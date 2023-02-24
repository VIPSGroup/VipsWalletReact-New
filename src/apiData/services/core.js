import { baseApiUrl, appType } from "../../constants";

export const getServiceDiscounts = () => {
  const formData = new FormData();

  formData.append("ServiceId", "1");
  return fetch(`${baseApiUrl}/OperatorServices/GetServiceName`, {
    method: "POST",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const getOperatorsByServiceId = (serviceId) => {
  const formData = new FormData();

  formData.append("ServiceId", serviceId);
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

export const commonServiceConfirm = (
  username,
  password,
  billAmount,
  inputObj,
  paymentRef,
  refId,
  operatorCode,
  mobNo
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
  formData.append("PointType", "Shopping");
  formData.append("MobileNumber", mobNo);
  formData.append("registerMobileNumber", mobNo);
  formData.append("customerMobileNumber", mobNo);
  formData.append("AppType", appType);

  inputObj.map((e) => {
    formData.append(`${e.fieldName}`, `${e.fieldValue}`);
  });

  return fetch(
    `${baseApiUrl}/Recharge/UtilityOnlineBillPaymentsForAllFBBPSOperators`,
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

export const naturalGasBillPay = (
  username,
  password,
  billAmount,
  inputObj,
  paymentRef,
  refId,
  operatorCode,
  mobNo
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
  formData.append("PointType", "Shopping");
  formData.append("MobileNumber", mobNo);
  formData.append("registerMobileNumber", mobNo);
  formData.append("customerMobileNumber", mobNo);
  formData.append("AppType", appType);

  inputObj.map((e) => {
    formData.append(`${e.fieldName}`, `${e.fieldValue}`);
  });

  return fetch(`${baseApiUrl}/Recharge/GetUtilityNaturalGasBillPayment`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
