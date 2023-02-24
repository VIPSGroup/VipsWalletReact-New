import { baseApiUrl } from "../../constants";

export const placeOrder = (paymentObj) => {
  var json = JSON.stringify(paymentObj);

  return fetch(`${baseApiUrl}/EcommerceServices/PlaceOrders`, {
    method: "POST",
    body: json,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const checkPincode = (productId, pincode) => {
  const formData = new FormData();
  formData.append("ProductId", productId);
  formData.append("Pincode", pincode);

  const data = {
    ProductId: productId.toString(),
    Pincode: parseInt(pincode),
  };
  var json = JSON.stringify(data);

  return fetch(`${baseApiUrl}/EcommerceServices/Validatepincode`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
