import { baseApiUrl } from "../../constants";

export const walletReport = (username, password, to) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("FromDate", "01/01/2015");
  formData.append("ToDate", to);

  return fetch(`${baseApiUrl}/UsersReports/GetWalletReport`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const rechargeBillsReport = (username, password, to) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("FromDate", "01/01/2015");
  formData.append("ToDate", to);

  return fetch(`${baseApiUrl}/UsersReports/GetTransactionHistory`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const shoppingReport = (username, password, to) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("FromDate", "01/01/2015");
  formData.append("ToDate", to);

  return fetch(`${baseApiUrl}/EcommerceServices/GetOrderReport`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const cashbackReport = (username, password, to) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("FromDate", "01/01/2015");
  formData.append("ToDate", to);

  return fetch(`${baseApiUrl}/UsersReports/PostCashbackHistory`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const allCashbackReport = (username, password, to) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("FromDate", "01/01/2015");
  formData.append("ToDate", to);

  return fetch(`${baseApiUrl}/UsersReports/GetAllCashbackHistory`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const shoppingPointReport = (username, password, to) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("FromDate", "01/01/2015");
  formData.append("ToDate", to);

  return fetch(`${baseApiUrl}/UsersReports/GetShoppingWalletReport`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const primePointReport = (username, password, to) => {
  const formData = new FormData();
  formData.append("UserName", username);
  formData.append("Password", password);
  formData.append("FromDate", "01/01/2015");
  formData.append("ToDate", to);

  return fetch(`${baseApiUrl}/UsersReports/GetPrimePointWalletReport`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
