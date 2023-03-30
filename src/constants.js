import { SHA512 } from "crypto-js";

const themeColor = "#393186";
// export const baseApiUrl = "https://api.vipswallet.com/api";
export const baseApiUrl = "http://devtest.vipswallet.com/api";
export const digiBaseUrl = "http://devtest.vipswallet.com/api/DigiGold/";
// export const baseApiUrl = "http://webplat.vipswallet.com/api/";
export const shopadminUrl = "http://shopadmin.vipswallet.com";
export const vendorPanelAPi = "http://vendor.vipswallet.com/Login/Vendor";
export const staticTocken = "XMCNBVGDTE734BCU65DW"; //used for getting banners , affiliate etc while calling apis.
export const currAppVersion = 1.0;
// Digi Gold Cart Price Calculation
export function calculateTotalPrice(products, price) {
  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    totalPrice += products[i][price] * products[i].quantity;
  }
  return totalPrice;
}

export const handleKeyPressForName = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode !== 8 && !/^[a-zA-Z ]+$/.test(String.fromCharCode(charCode))) {
    event.preventDefault();
  }
};

export function handleMobileKeyPress(event) {
  const charCode = event.which || event.keyCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}
export const formatter = (value) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parser = (value) => {
  value = value.replace(/\$\s?|(,*)/g, "");
  return isNaN(value) ? "" : parseFloat(value).toFixed(4);
};
export const handleKeyDown = (event) => {
  const maxLength = 8;
  const key = event.key;
  const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (key === "." || key === "," || key === "-") {
    // prevent decimal and negative sign
    event.preventDefault();
    return;
  }

  if (key === "Backspace" || key === "Delete") {
    return;
  }

  if (event.target.value.length >= maxLength) {
    // limit to 8 digits
    event.preventDefault();
    return;
  }

  if (!allowedKeys.includes(key)) {
    // prevent non-digit keys
    event.preventDefault();
    return;
  }
};
export const handleKeyDown2 = (event) => {
  const maxLength = 8;
  const key = event.key;
  const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

  if (key === "," || key === "-") {
    // prevent comma and negative sign
    event.preventDefault();
    return;
  }

  if (key === "Backspace" || key === "Delete") {
    return;
  }

  if (event.target.value.length >= maxLength && key !== ".") {
    // limit to 8 digits (excluding the decimal point)
    event.preventDefault();
    return;
  }

  if (!allowedKeys.includes(key)) {
    // prevent non-digit and non-decimal-point keys
    event.preventDefault();
    return;
  }
};

// RegEX
export const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/; // regular expression for full name validation
export const pincodeRegex = /^[1-9][0-9]{5}$/; // regular expression for Indian PIN code validation
export const mobileRegex = /^[6-9]\d{9}$/; // regular expression for Indian mobile number validation
// export const namePattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/; // regular expression for full name validation
export const namePattern = /^([\w]{3,})+\s+([\w\s]{1,})+$/i;
export const FirstNamePattern = /^[a-zA-Z]+$/;

export const validateName = (_, value) => {
  if (!value || nameRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("Please enter a valid full name");
};
export const validatePincode = (_, value) => {
  if (!value || pincodeRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("Please enter a valid Indian PIN code");
};

export const validateMobile = (_, value) => {
  if (!value) {
    return Promise.reject("Please enter your mobile number");
  }
  if (mobileRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("Please enter a valid 10-digit mobile number");
};
export const gameZopLink = "https://6234.play.gamezop.com/";

//Service IDS
export const mobileServiceId = 1;
export const dthServiceId = 2;
export const electricityServiceId = 6;
export const postpaidServiceId = 4;
export const fastagServiceId = 36;
export const lpgGasServiceId = 33;
export const broadbandServiceId = 10;
export const waterServiceId = 8;
export const landlineServiceId = 11;
export const digitalCableServiceId = 43;
export const gasServiceId = 7;
export const insuranceServiceId = 5;
export const loanRepaymentServiceId = 39;
export const creditCardServiceId = 49;
export const housingSocietyServiceId = 46;
export const hospitalBillsServiceId = 47;
export const subscriptionServiceId = 48;
export const clubAndAssociationServiceId = 50;
export const municipalTaxServiceId = 44;
export const municipalServicesServiceId = 45;

export const jharkandOpCode = "JBVNL0000JHA01";
export const torrentOpCode = "TORR00000NATLX";

export const indaneGasOpCode = "INDI00000NATT5";
export const hpGasOpCode = "HPCL00000NAT01";
export const bharatGasOpCode = "BHAR00000NATR4";

export const facebookUrl = "https://www.facebook.com/Vipswallet";
export const instaUrl = "https://www.instagram.com/vipswallet__official/";
export const youtubeUrl =
  "https://www.youtube.com/channel/UCjCa6YieoQBB4D0XR1K8dIg/featured";
export const twitterUrl = "https://twitter.com/VIPS_Wallet";
export const linkedinUrl =
  "https://www.linkedin.com/company/vipswallet-pvt-ltd/";

export const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.vipswallet.shopping";
export const appStoreUrl =
  "https://apps.apple.com/us/app/vips-wallet/id1577945678";

export const operartorsUrl =
  "https://api.vipswallet.com/Content/Images/Recharge/Operators/";

const primeTerms = "Prime";
const signupTerms = "Signup";
const profileTerms = "Profile";
const aboutUsTerms = "About";
const travelTerms = "Travel";
const faq = "FAQ";
const privacypolicy = "Privacy Policy";
const termsAndConditions = "Terms And Conditions";
const DigitermsAndConditions = "DigiGold Terms And Conditions";
const Digifaq = "DigiGold FAQs";

export const appType = "Website";

export const electronicCategoryId = 53;
export const fashionCategoryId = 43;

export const needHelpUrl = "https://wa.me/9922098098";

export const getTermsConditionsId = (type) => {
  if (type && type.includes("privacypolicy")) {
    return privacypolicy;
  } else if (type && type.includes("signupTerms")) {
    return signupTerms;
  } else if (type && type.includes("aboutus")) {
    return aboutUsTerms;
  } else if (type && type.includes("primeterms")) {
    return primeTerms;
  } else if (type && type.includes("profile")) {
    return profileTerms;
  } else if (type && type.includes("travel")) {
    return travelTerms;
  } else if (type && type.includes("faq")) {
    return faq;
  } else if (type && type.includes("termscondtion")) {
    return termsAndConditions;
  } else if (type && type.includes("DigiGold Terms And Conditions")) {
    return DigitermsAndConditions;
  } else if (type && type.includes("DigiGold FAQs")) {
    return Digifaq;
  }
};

export const googleAnalytics = "UA-220725992-1";
export function getFixedDecimalNumber(input, precision) {
  if (input.toString().split(".").pop().length > precision) {
    return parseFloat(
      input
        .toString()
        .substring(0, input.toString().indexOf(".") + precision + 1)
    );
  } else {
    return input;
  }
}
// Amount Round
export function digitPrecision(data, type) {
  if (type === "amount") {
    const amt = parseFloat(data);
    return amt.toFixed(2);
  } else if (type === "quantity") {
    console.log(data, "data");
    return getFixedDecimalNumber(data, 4);
  } else {
    return data;
  }
}

export const getServiceId = (serviceName) => {
  if (serviceName && serviceName.includes("broadband")) {
    return broadbandServiceId;
  } else if (serviceName && serviceName.includes("water")) {
    return waterServiceId;
  } else if (serviceName && serviceName.includes("landline")) {
    return landlineServiceId;
  } else if (serviceName && serviceName.includes("digitalCable")) {
    return digitalCableServiceId;
  } else if (serviceName && serviceName.includes("gas")) {
    return gasServiceId;
  } else if (serviceName && serviceName.includes("loan")) {
    return loanRepaymentServiceId;
  } else if (serviceName && serviceName.includes("creditcard")) {
    return creditCardServiceId;
  } else if (serviceName && serviceName.includes("housingSociety")) {
    return housingSocietyServiceId;
  } else if (serviceName && serviceName.includes("hospitalBill")) {
    return hospitalBillsServiceId;
  } else if (serviceName && serviceName.includes("subscription")) {
    return subscriptionServiceId;
  } else if (serviceName && serviceName.includes("club")) {
    return clubAndAssociationServiceId;
  } else if (serviceName && serviceName.includes("municipalTax")) {
    return municipalTaxServiceId;
  } else if (serviceName && serviceName.includes("municipalService")) {
    return municipalServicesServiceId;
  } else if (serviceName && serviceName.includes("insuranceService")) {
    return insuranceServiceId;
  }
};

// REGEX
export const panRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

export const getTodayDate = () => {
  return new Date().toLocaleDateString();
};

export const getRandomNumber = () => {
  var buffer = "";
  for (let i = 0; i < 32; i++) {
    var randNum = Math.floor(Math.random() * 9) + 1;
    buffer = buffer + randNum;
  }
  return buffer;
};

export const getDouble = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const getReplaceSpace = (str) => {
  if (str && str !== "undefine") {
    return str.replace(/\s+/g, "-").replace("/", "-");
  } else {
    return str;
  }
};

export const getTransactionId = () => {
  var randomString =
    Math.floor(Math.random() * 100).toString() + (Date.now() / 1000).toString();

  const finalHash = SHA512(randomString).toString().substring(0, 20);
  return finalHash;
};
