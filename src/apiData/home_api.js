import { baseApiUrl } from "../constants";

export const getDynamicContent = () => {
  return fetch(`${baseApiUrl}/EcommerceServices/AllTermsAndCondition`, {
    method: "POST",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
