import { baseApiUrl } from "../../constants";

export const getAddress = (username, password) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("password", password);

  return fetch(`${baseApiUrl}/EcommerceServices/GetShippingAddress`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const updateAddress = (addressData, username, password,state,city) => {
  console.log(addressData);
  const data = {
    Fname: addressData.fname,
    Lname: addressData.lname,
    Mobileno: addressData.mobileno,
    City:city,
    State: state,
    AddressType: addressData.addressType,
    Address: addressData.address,
    Pincode: addressData.pincode,
    Landmark: addressData.landmark,
    UserName: username,
    Password: password,
    Addressid: addressData.addressId,
  };

  var json = JSON.stringify(data);

  return fetch(`${baseApiUrl}/EcommerceServices/UpdateShippingAddress`, {
    method: "POST",
    body: json,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const deleteAddress = (addressId, username, password) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("password", password);
  formData.append("addressid", addressId);

  const data = {
    Addressid: addressId,
    UserName: username,
    Password: password,
  };

  var json = JSON.stringify(data);

  return fetch(`${baseApiUrl}/EcommerceServices/DeleteShippingAddress`, {
    method: "POST",
    body: json,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const addAddress = (addressData, username, password,state,city) => {

  const data = {
    Fname: addressData.fname,
    Lname: addressData.lname,
    Mobileno: addressData.mobileno,
    City:city,
    State: state,
    AddressType: addressData.addressType,
    Address: addressData.address,
    Pincode: addressData.pincode,
    Landmark: addressData.landmark,
    UserName: username,
    Password: password,
    Addressid: "0",
  };
  var json = JSON.stringify(data);

  return fetch(`${baseApiUrl}/EcommerceServices/AddShippingAddress`, {
    method: "POST",
    body: json,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
