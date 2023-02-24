import { baseApiUrl } from "../../constants";

export const getProfileDetails = (username, password) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);

  return fetch(`${baseApiUrl}/UserServices/GetUserProfileDetails`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const changePassword = (username, oldPass, newPass) =>{
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", oldPass);
  formData.append("NewPassword", newPass);

  return fetch(`${baseApiUrl}/UserServices/GetChangePassword`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

// export const editProfile = (userDetails) => {
//   const formData = new FormData();
//   formData.append("UserName", userDetails.username);
//   formData.append("Password", userDetails.password);
//   formData.append("FName", userDetails.username);
//   formData.append("LName", userDetails.username);
//   formData.append("Mobile", userDetails.username);
//   formData.append("EMailId", userDetails.username);
//   formData.append("Pancard", userDetails.username);
//   formData.append("StateId", userDetails.username);
//   formData.append("CityId", userDetails.username);
//   formData.append("AadharNo", userDetails.username);
//   formData.append("PincodeId", userDetails.username);

//   return fetch(`${baseApiUrl}/UserServices/GetUpdateUser`, {
//     method: "POST",
//     body: formData,
//   })
//     .then((data) => {
//       return data.json();
//     })
//     .catch((err) => {});
// };
