import { baseApiUrl } from "../../constants";

export const updateProfile = (userData) => {
  const formData = new FormData();

  formData.append("UserName", userData?.username);
  formData.append("Password", userData?.password);
  formData.append("FName", userData.FName);
  formData.append("LName", userData.LName);
  formData.append("Mobile", userData.Mobile);
  formData.append("EmailId", userData.EmailId);
  formData.append("Pancard", userData.Pancard);
  formData.append("Address", userData.Address);
  formData.append("StateId", userData.StateId);
  formData.append("CityId", userData.CityId);
  formData.append("AadharNo", userData.AadharNo);
  formData.append("PincodeId", userData.Pincode);
  formData.append("AlternateMobile", userData.AlternateMobile);

  return fetch(`${baseApiUrl}/UserServices/GetUpdateUser`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
