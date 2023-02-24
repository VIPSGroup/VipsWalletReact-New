import { baseApiUrl } from "../../constants";

export const getWalletBalance = ({ userName, password }) => {
  const formData = new FormData();
  formData.append("UserName", userName);
  formData.append("Password", password);

  return fetch(`${baseApiUrl}/Recharge/GetCheckBalance`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
