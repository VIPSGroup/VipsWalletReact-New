import { baseApiUrl } from "../../constant/Baseurls";

export const getProductsByCategory = (categoryId) => {
  const formData = new FormData();
  formData.append("tocken", "XMCNBVGDTE734BCU65DW");
  formData.append("Categoryid", categoryId);

  return fetch(`${baseApiUrl}/EcommerceServices/ProductViaCategory`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const getProductsBySubCategory = (subCategoryId) => {
  const formData = new FormData();
  formData.append("tocken", "XMCNBVGDTE734BCU65DW");
  formData.append("SubCategoryid", subCategoryId);

  return fetch(`${baseApiUrl}/EcommerceServices/ProductViaSubCategory`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const getSingleProductData = (productId) => {
  const formData = new FormData();
  formData.append("tocken", "XMCNBVGDTE734BCU65DW");
  formData.append("Productid", productId);

  return fetch(`${baseApiUrl}/EcommerceServices/Productdescription`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const getNewArrivalProducts = () => {
  return fetch(`${baseApiUrl}/EcommerceServices/TopNewArrivalProducts`, {
    method: "POST",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
