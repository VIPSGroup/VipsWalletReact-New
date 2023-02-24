import { baseApiUrl, appType } from "../../constants";

export const getElectricityOperators = async () => {
  const formData = new FormData();
  formData.append("ServiceId", "6");
  try {
    const data = await fetch(
      `${baseApiUrl}/OperatorServices/GetCommonElectricityOperatorByServiceId`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await data.json();
  } catch (err) {}
};

export const getInputFieldsByOperator = async (ourCode) => {
  const formData = new FormData();

  formData.append("billerId", ourCode);
  try {
    const data = await fetch(
      `${baseApiUrl}/Recharge/GetRegexValidationForLPG`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await data.json();
  } catch (err) {}
};

export const getSubdivisionData = async (ourCode) => {
  try {
    const data = await fetch(
      `${baseApiUrl}/Recharge/GetElectricitySubdivision?Opcode=${ourCode}`,
      {
        method: "GET",
      }
    );
    return await data.json();
  } catch (err) {}
};

export const fetchBill = async (bodyObj, username, password) => {
  var data = new URLSearchParams();

  for (let [key, value] of Object.entries(bodyObj)) {
    data.append(`${key}`, `${value}`);
  }

  try {
    const data_2 = await fetch(
      `${baseApiUrl}/Recharge/GetCommonFBBPSBillFetch`,
      {
        method: "POST",
        headers: {
          contentType: "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
        body: data,
      }
    );
    return await data_2.json();
  } catch (err) {}
};

export const OnlinefinalElecticity = async (
  username,
  password,
  billAmount,
  inputObj,
  paymentRef,
  refId,
  operatorCode,
  mobNo,
  paymentMode,
  pointType
) => {
  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);
  formData.append("paymentReferenceId", paymentRef);
  formData.append("billAmount", billAmount);
  formData.append("convFees", "0");
  formData.append("paymentMode", "Wallet");
  formData.append("Number", inputObj[0].fieldValue);
  formData.append("referenceId", refId === undefined ? paymentRef : refId);
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

  var url = "";
  if (paymentMode === 1) {
    url = `${baseApiUrl}/Recharge/GetUtilityAllElectricityBillPayments`;
  } else {
    url = `${baseApiUrl}/Recharge/UtilityOfflineBillPaymentsForAllFBBPSOperators`;
  }

  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {},
      body: formData,
    });
    return data.json();
  } catch (err) {}
};
