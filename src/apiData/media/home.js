import { baseApiUrl, staticTocken } from "../../constants";

export const getSliderBannerImages = () => {
  const formData = new FormData();

  formData.append("tocken", staticTocken);
  formData.append("appweb", "WEB");
  return fetch(`${baseApiUrl}/EcommerceServices/AllBanners`, {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};

export const getAffiliate = () => {
  const formData = new FormData();

  formData.append("tocken", staticTocken);
  formData.append("Categoryid", "1");
  return fetch(
    `${baseApiUrl}/EcommerceServices/VCommissionProductViaCategory`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => {});
};
