// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import AddMoneyButton from "../../components/home/AddMoneyButton";
// import Footer from "../../components/home/Footer";

// // import { checkGABBalance, addMoneyFromGAB } from "../../apiData/payments";

// import "../../assets/styles/addMoney/addMoney.css";
// import "../../assets/styles/styles.css";
// import LoadingBar from "../../components/common/loading";
// import { MuiSnackBar } from "../../components/common/snackbars";
// import { useDispatch, useSelector } from "react-redux";
// import { GetUserDetail } from "../../components/common/GetUserDetail";
// import {
//   addMoneyFromGAB,
//   checkGABBalance,
// } from "../../redux/slices/walletSlice";
// const AddAmount = () => {
//   const dispatch = useDispatch();
//   const [amount, setAmount] = useState(0);
//   const [GABBalance, setGABBalance] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [isSnackBar, setIsSnackBar] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loggedInUser, setLoggedInUser] = useState("");

//   const { data: gabBalance } = useSelector(
//     (state) => state.walletSlice.GABBalance
//   );
//   const { data: addMoney } = useSelector((state) => state.walletSlice.addMoney);
//   let { option } = useParams();
//   const clickAddFromGAB = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     if (amount && amount > 0) {
//       dispatch(
//         addMoneyFromGAB(
//           loggedInUser?.Mobile,
//           loggedInUser?.TRXNPassword,
//           amount
//         )
//       );
//       if (addMoney?.ResponseStatus === 1) {
//         setLoading(false);
//         setIsSnackBar(true);
//         setSuccessMsg(addMoney?.Remarks);
//         setAmount(0);
//       } else {
//         setLoading(false);
//         setIsSnackBar(true);
//         setErrorMsg(addMoney?.Remarks);
//       }
//     } else {
//       setIsSnackBar(true);
//       setErrorMsg("Please enter valid amount");
//     }
//   };

//   useEffect(() => {
//     setLoggedInUser(GetUserDetail());
//     dispatch(checkGABBalance(loggedInUser.Mobile, loggedInUser.TRXNPassword));
//     gabBalance.Data && setGABBalance(gabBalance?.Data);
//   }, []);

//   const onChange = (e) => {
//     const re = /^[0-9\b]+$/;

//     if (e.target.value === "" || re.test(e.target.value)) {
//       setAmount(e.target.value);
//     }
//   };

//   return (
//     <div className="color-body">
//       <section class="inpage-section-align inset-shadow-top-light addmoney">
//         <div class="container">
//           <div class="container">
//             <div class="section-head">
//               <h1 class="section-head-title">Enter Amount</h1>
//             </div>
//           </div>

//           <div class="container">
//             <div class="row">
//               <div class="col-xl-5 col-lg-6 col-md-8 col-sm-12 add-money-outer box-shadow-1 border-0 mx-auto">
//                 <div class="add-money-card">
//                   {option === "GAB" ? (
//                     <div class="add-money-body">
//                       <span class="add-money-title">
//                         {" "}
//                         Affiliate Balance : (&#x20B9; {GABBalance}){" "}
//                       </span>
//                     </div>
//                   ) : null}

//                   <div class="add-money-body">
//                     <form class="add-money-amt">
//                       <div class="form-group input-group">
//                         <span class="input-group-prepend">
//                           <div class="input-group-text">&#x20B9;</div>
//                         </span>
//                         <input
//                           onChange={onChange}
//                           value={amount > 0 ? amount : ""}
//                           minLength={1}
//                           maxLength={option === "Payu" ? 4 : 7}
//                           required
//                           type="text"
//                           autoComplete="off"
//                           autoFocus="true"
//                         />
//                       </div>

//                       <div class="col-md-12 p-0">
//                         <div class="add-balance-btn">
//                           <button
//                             onClick={(e) => {
//                               e.preventDefault();
//                               setAmount(
//                                 parseInt(amount) + parseInt(e.target.value)
//                               );
//                             }}
//                             class="btn-cta"
//                             value="1000"
//                           >
//                             {" "}
//                             + 1000{" "}
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.preventDefault();
//                               setAmount(
//                                 parseInt(amount) + parseInt(e.target.value)
//                               );
//                             }}
//                             class="btn-cta"
//                             value="800"
//                           >
//                             {" "}
//                             + 800
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.preventDefault();
//                               setAmount(
//                                 parseInt(amount) + parseInt(e.target.value)
//                               );
//                             }}
//                             class="btn-cta"
//                             value="500"
//                           >
//                             {" "}
//                             + 500{" "}
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.preventDefault();
//                               setAmount(
//                                 parseInt(amount) + parseInt(e.target.value)
//                               );
//                             }}
//                             class="btn-cta"
//                             value="100"
//                           >
//                             {" "}
//                             + 100{" "}
//                           </button>
//                         </div>
//                       </div>
//                     </form>
//                   </div>

//                   <div class="dropdown-divider"></div>

//                   {option === "Payu" ? (
//                     <AddMoneyButton
//                       amount={amount}
//                       setIsSnackBar={setIsSnackBar}
//                       setErrorMsg={setErrorMsg}
//                     />
//                   ) : (
//                     <div class="add-money-body">
//                       <div class="col-md-12">
//                         <div class="add-money-btn">
//                           <button
//                             onClick={!loading && clickAddFromGAB}
//                             href="#"
//                             class="btn-primery"
//                             id="addmoneymodal"
//                             data-toggle="modal"
//                             data-target="#addmoneyform"
//                           >
//                             {loading ? <LoadingBar /> : "Add Money"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <MuiSnackBar
//                   open={isSnackBar}
//                   setOpen={setIsSnackBar}
//                   successMsg={successMsg}
//                   errorMsg={errorMsg}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default AddAmount;
