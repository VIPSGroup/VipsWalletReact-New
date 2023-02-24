import axios from "axios";
import { baseApiUrl, appType } from "../../constants";

export const sendOtp = async ({userName,emailId}) => {
  const formData = new FormData();
  formData.append("MobileNo", userName);
  formData.append("CountryCode", "244");
  formData.append("RefeId", "");
  formData.append("Country", "India");
  formData.append("emailid", emailId);
  try {
    const data = await fetch(
      `${baseApiUrl}/UserServices/GetSendOTPforAddUser`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await data.json();
  } catch (err) {}
};

export const signup = async (
  {fName,lName,emailId,userName,password,RefId,Otp,stateId,cityId,pincodeId,Ip}) => {
  const formData = new FormData();
  formData.append("FName", fName);
  formData.append("LName", lName);
  formData.append("EmailId", emailId);
  formData.append("UserName", userName);
  formData.append("Password", password);
  formData.append("MobileNo", userName);
  formData.append("RefeId", RefId);
  formData.append("UserType", "Member");
  formData.append("OTP", Otp);
  formData.append("StateId", stateId);
  formData.append("CityId", cityId);
  formData.append("AreaId", pincodeId);
  formData.append("IMEI", Ip);
  formData.append("EarnAndReferFlag", RefId ? 1 : 0);
  formData.append("SIDE", "");
  formData.append("CountryCode", "244");
  formData.append("Country", "India");
  formData.append("AppType", appType);

  try {
    const data = await fetch(`${baseApiUrl}/UserServices/GetAddNewUservips`, {
      method: "POST",
      body: formData,
    });
    return await data.json();
  } catch (err) {}
};

export const validateReference = async (refId) => {
  const formData = new FormData();
  formData.append("RefID", refId);

  try {
    const data = await fetch(
      `${baseApiUrl}/UserServices/GetIsValidateReference`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await data.json();
  } catch (err) {}
};

export const getCityState = async (pincode) => {
  const formData = new FormData();
  formData.append("pincode", pincode);

  try {
    const data = await fetch(
      `${baseApiUrl}/UserServices/GetCityAndStateByPincode`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await data.json();
  } catch (err) {}
};

export const listStateAndCity = async () => {
  try {
    const data = await fetch(`${baseApiUrl}/UserServices/GetStatesList`, {
      method: "POST",
    });
    return await data.json();
  } catch (err) {}
};
