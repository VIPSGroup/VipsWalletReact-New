import { baseApiUrl } from "../../constants";

export const checkPrime = (username, password) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);

  return fetch(`${baseApiUrl}/CardServices/ShoppingcardDetails`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const becomePrime = (username, password) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("PayType", "App_Wallet");

  return fetch(`${baseApiUrl}/CardServices/PurchaseShoppingcard`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
