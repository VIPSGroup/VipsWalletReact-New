import { baseApiUrl, appType } from "../../constants";

export const getLpgGasOperators = async () => {
  const formData = new FormData();

  formData.append("ServiceId", "33");
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

export const fetchLPGBill = async (bodyObj, username, password) => {
  const formData = new FormData();

  formData.append("UserName", `${username}`);
  formData.append("Password", `${password}`);

  for (let [key, value] of Object.entries(bodyObj)) {
    formData.append(`${key}`, `${value}`);
  }

  try {
    const data_2 = await fetch(
      `${baseApiUrl}/Recharge/GetLPGGasBillFetchFBBPS`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await data_2.json();
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

export const LPGBillPay = async (
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

  formData.append("username", username);
  formData.append("password", password);
  formData.append("paymentReferenceId", paymentRef);
  formData.append("billAmount", billAmount);
  formData.append("convFees", "0");
  formData.append("paymentMode", "Wallet");
  // formData.append("Number", inputObj[0].fieldValue);
  formData.append("referenceId", refId);
  formData.append("BillUnit", "");
  formData.append("paymentInfoTagValue", "vipswallet|7720021133");
  formData.append("IP", "123");
  formData.append("OperatorCode", operatorCode);
  formData.append("PointType", pointType);
  formData.append("MobileNumber", mobNo);
  // formData.append("registerMobileNumber", mobNo);
  // formData.append("customerMobileNumber", mobNo);
  formData.append("AppType", appType);

  inputObj.map((e) => {
    formData.append(`${e.fieldName}`, `${e.fieldValue}`);
  });

  var url = "";
  url = `${baseApiUrl}/Recharge/GetLPGBillPaymentsFBBPS`;

  try {
    const data = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return await data.json();
  } catch (err) {}
};
