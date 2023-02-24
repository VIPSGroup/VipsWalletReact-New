import { baseApiUrl } from "../../constants";

export const getUserReferal = (userName, password) => {
  const formData = new FormData();

  formData.append("UserName", userName);
  formData.append("Password", password);

  return fetch(`${baseApiUrl}/RGUSER/GetUserAllReferal`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const getMerchantReferal = (userName, password) => {
  const formData = new FormData();

  formData.append("UserName", userName);
  formData.append("Password", password);

  return fetch(`${baseApiUrl}/Merchant/MerchantRefList`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
