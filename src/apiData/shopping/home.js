import { baseApiUrl } from "../../constants";

export const getDealsOfTheDay = (username, password) => {
  const formData = new FormData();
  formData.append("tocken", "XMCNBVGDTE734BCU65DW");
  formData.append("Categoryid", null);

  return fetch(`${baseApiUrl}/ECommerceServices/GetDODProduct`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
