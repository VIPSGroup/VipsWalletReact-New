import { baseApiUrl } from "../../constants";

export const getAllCategories = () => {
  const formData = new FormData();

  return fetch(
    `${baseApiUrl}/EcommerceServices/Getdashboardslider?tocken=XMCNBVGDTE734BCU65DW`,
    {
      method: "GET",
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const getSubCategory = (categoryId) => {
  const formData = new FormData();

  return fetch(
    `${baseApiUrl}/EcommerceServices/GetSubcategorieList?tocken=XMCNBVGDTE734BCU65DW&Categoryid=${categoryId}`,
    {
      method: "GET",
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
