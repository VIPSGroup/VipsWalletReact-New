import { baseApiUrl, appType } from "../../constants";
export const getActiveApi = async () => {
  try {
    const data = await fetch(`${baseApiUrl}/PlanServices/GetBrowsPlanAPI`, {
      method: "GET",
    });

    return await data.json();
  } catch (err) {}
};

export const getOperators = async (serviceId) => {
  const formData = new FormData();
  formData.append("ServiceId", serviceId);
  try {
    const data = await fetch(`${baseApiUrl}/operatorServices/GetOperatorName`, {
      method: "POST",
      body: formData,
    });

    return await data.json();
  } catch (err) {}
};

export const getMobileRechargePlans = async (circleName, operatorName) => {
  const formData = new FormData();

  formData.append("CircleName", circleName);
  formData.append("OperatorName", operatorName);
  try {
    const data = await fetch(
      `${baseApiUrl}/PlanServices/GetMobileRechargePlans`,
      {
        method: "POST",
        body: formData,
      }
    );

    return await data.json();
  } catch (err) {}
};

export const getSpecialMobileRechargePlans = async (operatorName, mobileNo) => {
  const formData = new FormData();

  formData.append("OperatorName", operatorName);
  formData.append("Mobile", mobileNo);
  try {
    const data = await fetch(
      `${baseApiUrl}/PlanServices/GetSpecialMobileRechargePlans`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await data.json();
  } catch (err) {}
};

export const getRechargeCircleList = async () => {
  try {
    const data = await fetch(`${baseApiUrl}/PlanServices/GetRechargeCircle`, {
      method: "POST",
    });
    return await data.json();
  } catch (err) {}
};

export const getCircleAndOperatorByNumber = async (mobileNo) => {
  const formData = new FormData();

  formData.append("MobileNumber", mobileNo);

  try {
    const data = await fetch(
      `${baseApiUrl}/PlanServices/GetCircleAndOperatorByNumberSeries`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await data.json();
  } catch (err) {}
};

export const getRechargeHistory = async (
  userName,
  password,
  to,
  serviceId = 1
) => {
  const formData = new FormData();
  formData.append("UserName", userName);
  formData.append("Password", password);
  formData.append("FromDate", "01/01/2015");
  formData.append("ToDate", to);
  formData.append("ServiceID", serviceId);

  try {
    const data = await fetch(
      `${baseApiUrl}/UsersReports/GetTransactionHistory`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await data.json();
  } catch (err) {}
};

//BillAvenue Apis

export const billAvenueBrowsePlans = async (circle, operator) => {
  const formData = new FormData();
  formData.append("circle", circle);
  formData.append("billerId", operator);

  try {
    const data = await fetch(`${baseApiUrl}/PlanServices/GetBrowsPlans`, {
      method: "POST",
      body: formData,
    });
    return await data.json();
  } catch (err) {}
};

export const billAvenueGetOperatorCircle = async (mobileNo) => {
  const formData = new FormData();
  formData.append("MobileNumber", mobileNo);

  try {
    const data = await fetch(`${baseApiUrl}/PlanServices/GetMNP`, {
      method: "POST",
      body: formData,
    });
    return await data.json();
  } catch (err) {}
};

//...............

export const finalRecharge = async (
  userName,
  password,
  amount,
  number,
  operatorId,
  circleId,
  pointType
) => {
  const formData = new FormData();

  formData.append("username", userName);
  formData.append("password", password);
  formData.append("amount", amount);
  formData.append("mobileNumber", number);
  formData.append("optid", operatorId);
  formData.append("circle", circleId);
  formData.append("type", "");
  formData.append("accountNo", "");
  formData.append("isShop", true);
  formData.append("pointType", pointType);
  formData.append("AppType", appType);

  try {
    const data = await fetch(`${baseApiUrl}/Recharge/GetAllRecharge`, {
      method: "POST",
      body: formData,
    });
    return await data.json();
  } catch (err) {}
};
