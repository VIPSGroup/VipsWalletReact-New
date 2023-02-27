import { baseApiUrl, appType } from "../../constants";

export const login = ({ userName, password, ip }) => {
  console.warn("login", ip);
  const formData = new FormData();
  formData.append("Username", userName);
  formData.append("Password", password);
  formData.append("IP", ip || "103");
  formData.append("AppType", appType);
  return fetch(`${baseApiUrl}/UserServices/GetLoginDetailsnew`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const loginWithOtp = ({ userName, password, ip, otp }) => {
  // const formData = new FormData();
  // formData.append("Username", userName);
  // formData.append("Password", password);
  // formData.append("IP", ip || "103");
  // formData.append("OTP", otp);
  // return fetch(`${baseApiUrl}/UserServices/PostVerifyLogin`, {
  //   method: "POST",
  //   body: formData,
  // })
  //   .then((data) => {
  //     return data.json();
  //   })
  //   .catch((err) => {});
};

export const checkUserExist = (username) => {
  // const formData = new FormData();
  // formData.append("Username", username);
  // return fetch(`${baseApiUrl}/UserServices/CheckUserRegistration`, {
  //   method: "POST",
  //   body: formData,
  // })
  //   .then((data) => {
  //     return data.json();
  //   })
  //   .catch((err) => {});
};

export const forgotPasswordApi = ({ userName }) => {
  const formData = new FormData();
  formData.append("Username", userName);

  return fetch(`${baseApiUrl}/UserServices/GetForgotPassword`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
