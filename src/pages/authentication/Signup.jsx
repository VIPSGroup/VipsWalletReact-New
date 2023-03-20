import React, { useEffect } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup'
import { useState } from 'react';
// import { MuiSnackBar } from '../common/snackbars';
// import { getCityState, listStateAndCity, sendOtp, signup,  } from '../../apiData/authentication/signup';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import LoadingBar from "../common/loading";
import Modal from "react-bootstrap/Modal";
import "../../assets/styles/authentication/signupModal.css";
import { MdArrowBack } from 'react-icons/md';
import SelectField from '../shopping/SelectField';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, signUpWithOtp, validateReference } from '../../redux/Actions/SignupAction';
import OTPInput, { ResendOTP } from "otp-input-react";
import { getStateCity } from '../../redux/Actions/CommonActions';

export default function SignUp() {
 const navigate= useNavigate()
const dispatch= useDispatch()
 const {isUserExist}=  useSelector(state=>state.login)
 const {response,loading,newUser,validateNo}=  useSelector(state=>state.signup)
  const [getData, setGetData] = useState({})
  const [show, setShow] = useState(true)
  const [signupFormCount, setSignupFormCount] = useState(1);
  const [otp, setOtp] = useState("");
  const [pincode, setPincode] = useState("");
  const [errorMsg,setErrorMsg]=useState()
  const [successMsg,setSuccessMsg]=useState()
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [refError, setRefError] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [refId, setRefId] = useState("");
  const [pincodeId, setPincodeId] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [ip, setIp] = useState("");
    const signUpFormik= useFormik({
        initialValues:{
      fName:'',
      lName:'',
      emailId:'',
      refId:'',
      password:'',
      pincode:'',
      termsCheck:false
        },
        validationSchema:yup.object({
          fName:yup.string().required("Please Enter Your First Name"),
          lName:yup.string().required("Please Enter Your Last Name"),
          emailId:yup.string().email('email is not valid').required("Please Enter Your email"),
          refId:yup.string(),
          password:yup.string().min(8).max(16).required("Please Enter Password")
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character" ),
          pincode:yup.string().required("Please Enter Pincode")
         }),
        onSubmit:(values,{resetForm})=>{
          setSignupFormCount(2)
          if(getData.stateName!='' && getData.cityName!=''){
            if(signUpFormik.values.termsCheck){
              setIsSnackBar(false)
              setErrorMsg("")
              if(!refError){
                setUserDetails({...values,cityId:getData.cityId,stateId:getData.stateId,RefId:refId,pincodeId,Ip:ip,userName:isUserExist && isUserExist[1]})
                dispatch(signUpWithOtp({ userName:isUserExist && isUserExist[1], emailId:signUpFormik.values.emailId }))
              }
            }else{
              setIsSnackBar(true)
              setErrorMsg('You must accept the terms and conditions')
            }
          }
        }
      })
useEffect(() => {
if(isUserExist && isUserExist[1]){
}else{
  navigate("/login")
}
  if (signUpFormik.values.refId.length === 10) {
    setRefId(signUpFormik.values.refId);
    dispatch(validateReference(signUpFormik.values.refId))
  }

  if (!ip) {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((user) => {
        setIp(user.ip);
      });
  }

  if(response?.ResponseStatus==1){
    setIsSnackBar(true)
    setSuccessMsg(response.Remarks)
  }else if(response?.ResponseStatus==0){
    setIsSnackBar(true)
    setErrorMsg(response.Remarks)
  }
  if(newUser?.ResponseStatus==1 && otp.length===6){
    setIsSnackBar(true)
    setSuccessMsg("user Registered Successfully")
  }else if(newUser?.ResponseStatus==0 && otp.length===6){
    setIsSnackBar(true)
    setErrorMsg(newUser.Remarks)
  }
}, [
  signUpFormik.values.refId,
  signUpFormik.values.password,signUpFormik.values.pincode,response,newUser])


      const handlePincode = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setPincode(value);
    if(e.target.value.length===6){
      signUpFormik.values.pincode=e.target.value
      getStateCity(e.target.value).then(response=>{
        if(response?.ResponseStatus==1){
          setGetData({...getData,stateName:response.Data[0].StateName,cityName:response.Data[0].CityName,cityId:response.Data[0].CityId,stateId:response.Data[0].StateId,pincodeId:response.Data[0].PincodeId,stateError:false,cityError:false})
            }else if(response?.ResponseStatus==0){
              setGetData({...getData,stateName:'',stateId:'',stateError:false,cityId:'',cityName:'',cityError:false})
            }
      })
    }

    if (e.target.value.length == 0) {
      setGetData({...getData,cityId:'',stateId:'',cityName:'',stateName:''}) }
      };
      
  const renderButton2 = (buttonProps) => {
    return (
      <div className="resendotp col-12 mx-auto pt-3">
        <p {...buttonProps} className="col-12 d-block">
          {buttonProps.remainingTime !== 0 ? (
            <p>
              {" "}
              Please wait for{" "}
              <span style={{ color: "#CA3060" }}>
                {" "}
                {`${buttonProps.remainingTime} sec`}
              </span>
            </p>
          ) : (
            <p>
              Not received OTP?{" "}
              <a>
                <span style={{ color: "#CA3060" }}>Resend OTP</span>
              </a>
            </p>
          )}
        </p>
      </div>
    );
  };
  const renderTime2 = () => React.Fragment;
  const clickVerifySignupOtp = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ ...userDetails, Otp: otp }))
  };
  return (
<>
     <Modal
        show={show}
        onHide={()=>{setShow(false)}}
        centered
        keyboard={false}
        className={
          signupFormCount === 1
            ? "modal fade signup-modal"
            : "modal fade otp-modal"
        }
        id="exampleModal"
        onExit={() => setShow(false)}
      >
        {response?.ResponseStatus==1 && signupFormCount==2
         ?  <>
          <button
            className="close otp-close mt-3"
            onClick={() => {
              setSignupFormCount(1);
              setOtp("");
            }}
          >
            <MdArrowBack />
          </button>
         <section class="loginPage mbTopSpace">
           <div class="row ">
             <div class="col-lg-6 otpBgCol order-lg-last d-none d-lg-block">
               <div class="row no-gutters1 align-items-center">
                 <div class="col-12">
                   <div class="otpLogoCol"></div>
                 </div>
               </div>
             </div>
             <div class="col-12 col-lg-6 align-self-center">
               <div class="otpForm-outer">
                 <div class="row">
                   <div class="col-lg-12">
                     <div class="otp-titleMain formText text-center">
                       <img src="/images/VipsLogoMain.png" alt="VIPS Logo" />
                       <h2>OTP Verification</h2>
                       <div class="otp-send-to">
                         <p>
                           Enter the OTP sent to
                           <label for="">
                             {" "}
                             &nbsp; +91 {isUserExist && isUserExist[1]}
                           </label>
                         </p>
                       </div>
                     </div>
                   </div>
                 </div>
   
                 <div className="formStyle">
                   <form>
                     <div className="row">
                       <div className="col-lg-12  mx-auto p-0">
                         <div className="otpform-in">
                           <div
                             id="otp"
                             className="row row-flex justify-content-center mt-1"
                           >
                             <OTPInput
                               className="text-dark"
                               value={otp}
                               onChange={setOtp}
                               autoFocus
                               OTPLength={6}
                               otpType="number"
                               disabled={false}
                             />
   
                             <ResendOTP
                               renderButton={renderButton2}
                               renderTime={renderTime2}
                             />
   
                             <div class="col-lg-12">
                               <div class="otp-btnCol btnTopSpace">
                                 <button
                                   type="button"
                                   class="btn otp-btn modal-loading-btn"
                                   disabled={otp.length == 6 ? false : true}
                                   onClick={clickVerifySignupOtp}
                                 >
                                   {loading ? (
                                     <LoadingBar class="" />
                                   ) : (
                                     "Verify & Proceed"
                                   )}
                                 </button>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </form>
                 </div>
               </div>
             </div>
           </div>
         </section>
       </>
      : <>
      <Link to='/login'
            class="close signup-close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <MdArrowBack />
          </Link>
      <section class="loginPage mbTopSpace">
        <div class="row no-gutters1">
          <div class="col-lg-4 signupBgCol order-lg-last d-none d-lg-block">
            <div class="row no-gutters1 align-items-center">
              <div class="col-12">
                <div class="signupLogoCol">
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 align-self-center">
            <div class="signupForm-outer">
              <div class="row">
                <div class="col-lg-12">
                  <div class="titleMain formText text-center">
                    <img src="/images/VipsLogoMain.png" alt="VIPS Logo" />
                    <h2>Sign up to get Started</h2>
                  </div>
                 {/* {response?.ResponseStatus==0 && <div className="alert alert-danger">{response.Remarks}</div>} */}
                </div>
              </div>
              <div class="formStyle">
                <form 
                  class=" signup-form"
                  onSubmit={ !loading && signUpFormik.handleSubmit }
                  >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="input-field">
                        <input
                          type="text"
                          name="fName"
                          value={signUpFormik.values.fName}
                          className={signUpFormik.errors.fName &&  signUpFormik.touched.fName ? " is-invalid":""}
                          autocomplete="off"
                          onChange={signUpFormik.handleChange}
                          onBlur={signUpFormik.handleBlur}
                          autoFocus={true}
                          id="enter-first-name"
                          placeholder="&nbsp;"
                          
                        />
                        <label for="enter-first-name" class="label-name">
                          <span class="content-name">Enter First Name</span>
                        </label>
                        <div className="invalid-feedback text-danger">{signUpFormik.errors.fName}</div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="input-field">
                        <input
                          type="text"
                          name="lName"
                          value={signUpFormik.values.lName}
                          className={signUpFormik.errors.lName && signUpFormik.touched.lName ? " is-invalid":""}
                          onChange={signUpFormik.handleChange}
                          onBlur={signUpFormik.handleBlur}
                          id="enter-last-name"
                          placeholder="&nbsp;"
                          autocomplete="off"
                        />
                        <label for="enter-last-name" class="label-name">
                          <span class="content-name">Enter Last Name</span>
                        </label>
                        <div className="invalid-feedback text-danger">{signUpFormik.errors.lName}</div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="input-field">
                        <input
                          type="email"
                          name="emailId"
                          value={signUpFormik.values.emailId}
                          className={signUpFormik.errors.emailId && signUpFormik.touched.emailId ?"is-invalid":""}
                          onChange={signUpFormik.handleChange}
                          onBlur={signUpFormik.handleBlur}
                          id="enter-emailid"
                          placeholder="&nbsp;"
                          autocomplete="off"
                        />
                        <label for="enter-emailid" class="label-name">
                          <span class="content-name">Enter Email ID</span>
                        </label>
                        <div className="invalid-feedback text-danger">{signUpFormik.errors.emailId}</div>
                      </div>
                    </div>
                    
                    <div class="col-lg-6">
                      <div class="input-field">
                        <input
                          type="text"
                          value={isUserExist && isUserExist[1]}
                          name="userName"
                          id="enter-number"
                          placeholder="&nbsp;"
                          readOnly="readonly"
                        />
                        <label
                          for="enter-number"
                          class="label-name signup-readonly-label"
                        >
                          <span class="signup-readonly-content-name">
                            Enter Mobile Number
                          </span>
                        </label>
                      </div>
                    </div>
  
                    <div class="col-lg-6 optional-field">
                      <div class="input-field">
                        <input name="refId"
                          value={signUpFormik.values.refId}
                          onChange={signUpFormik.handleChange}
                          id="referral-mobile"
                          type="tel"
                          placeholder="&nbsp;"
                          maxlength="10"
                          autocomplete="off"
                        />
  
                        <label for="referral-mobile">
                          <span class="content-name">
                            {" "}
                            Referral Mobile (optional){" "}
                          </span>{" "}
                        </label>
                      </div>
                      {validateNo?.ResponseStatus==1 ? <div className=" text-left"  style={{ color: "#CA3060" }} >  {validateNo?.Remarks}</div>
                        :<div className=" text-left" style={{ color: "#CA3060" }}> {validateNo?.Remarks} </div>
                      }
                       <div className="invalid-feedback text-danger">{signUpFormik.errors.refId}</div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="input-field">
                        <i
                          type={showSignupPassword ? "text" : "password"}
                          id="togglePassword"
                          onClick={() => {
                            setShowSignupPassword(!showSignupPassword);
                          }}
                        >
                          {showSignupPassword ? (
                            <BsFillEyeFill />
                          ) : (
                            <BsFillEyeSlashFill />
                          )}{" "}
                        </i>
                        <input
                          type={showSignupPassword ? "text" : "password"}
                          name="password"
                          value={signUpFormik.values.password}
                          className={signUpFormik.errors.password && signUpFormik.touched.password ?"is-invalid":""}
                          onChange={signUpFormik.handleChange}
                          onBlur={signUpFormik.handleBlur}
                          id="create_password"
                          placeholder="&nbsp;"
                          autocomplete="off"
                        />
                        <label for="create_password" class="label-name">
                          <span class="content-name">Create a Password</span>
                        </label>
                      <div className="invalid-feedback text-danger">{signUpFormik.errors.password}</div>
                      </div>
                    </div>
                    <div class="col-lg-6 ">
                      <div class="input-field">
                        <input
                          type="tel"
                          name="pincode"
                          value={pincode}
                          id="user-pincode"
                          placeholder="&nbsp;"
                          maxLength="6"
                          minLength="6"
                          className={signUpFormik.errors.pincode && signUpFormik.touched.pincode ?"is-invalid":""}
                          autocomplete="off"
                          onChange={handlePincode}
                        />
                        <label for="user-pincode" class="label-name">
                          <span class="content-name">Enter Pincode</span>
                        </label>
                        <div className="invalid-feedback text-danger">{signUpFormik.errors.pincode}</div>
                      </div>
                    </div>
<SelectField pincode={signUpFormik.values.pincode} getData={getData} setGetData={setGetData}/>

                    <div class="col-lg-12 ">
                      <div class="custom-control custom-checkbox checkStyle ">
                        <input
                          type="checkbox"
                          name="termsCheck"
                          class="custom-control-input "
                          id="customCheck1"
                          checked={signUpFormik.values.termsCheck}
                          onChange={signUpFormik.handleChange}
                        />
                        <label class="custom-control-label " for="customCheck1">
                          {" "}
                          By clicking signup you agree to{" "}
                          <Link to="/termscondtion">Terms & Conditions</Link>{" "}
                        </label>
                      </div>
                    </div>
  
                    <div class="col-lg-12">
                      <div class="signup-btnCol btnTopSpace">
                        <button
                          type="submit"
                          class="btn signup-btn" onClick={()=>{
                            if(!getData.stateName ){
                              if(!getData.cityName){
                                setGetData({...getData,stateError:true,cityError:true})
                              }else{
                                setGetData({...getData,stateError:true,cityError:false})
                              }
                            }
                          }}
                        >
                          {loading ? <LoadingBar /> : "SIGNUP"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </>
      }
     
      </Modal>
      {newUser?.ResponseStatus==1 && navigate("/")}
      {/* <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              errorMsg={errorMsg}
              setError={setErrorMsg}
              successMsg={successMsg}
               setSuccess={setSuccessMsg}
            /> */}
      </>
  )
}
