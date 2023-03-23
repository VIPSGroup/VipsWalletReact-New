import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loading, MuiSnackBar, ThemeButton } from "../../components/common";
import { changePassword } from "../../redux/slices/profile/profileSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { success, loading } = useSelector(
    (state) => state.profileSlice.changePass
  );

  let navigate = useNavigate();
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const handleOldPassword = (e) => {
    setError("");
    setOldPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setError("");
    setNewPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setError("");
    setConfirmPassword(e.target.value);
  };
  useEffect(() => {
    if (success) {
      if(success.ResponseStatus===1){
        setErrorMsg("")
        setIsSnackBar(true)
        setSuccessMsg(success.Remarks)
 localStorage.removeItem("user");
 navigate("/");
 window.location.reload()
      }else{
        setSuccessMsg("")
        setIsSnackBar(true)
        setErrorMsg(success.Remarks)
      }
    }
  }, [success]);
  const clickSave = (e) => {
    const Mobile = loggedInUser.Mobile;
    const Password = loggedInUser.TRXNPassword;
    e.preventDefault();
    
  
    if (oldPassword === loggedInUser.TRXNPassword && newPassword!=='' && confirmPassword!=='') {
    
      if (newPassword === confirmPassword && loggedInUser.TRXNPassword!==newPassword && loggedInUser.TRXNPassword!==confirmPassword) {
        dispatch(changePassword({ Mobile, Password, newPassword }));
      }else{
        setSuccessMsg("")
        setIsSnackBar(true)
        setErrorMsg("New password and confirm password should not be same as old password")
      }
    }else if(oldPassword===''){
      
      setSuccessMsg("")
      setIsSnackBar(true)
      setErrorMsg("Enter Old Password")
    }else if(newPassword===''){
      setSuccessMsg("")
      setIsSnackBar(true)
      setErrorMsg("Enter New Password")
    }else if(confirmPassword===''){
      setSuccessMsg("")
      setIsSnackBar(true)
      setErrorMsg("Enter Confirm Password")
    }else if(newPassword!== confirmPassword){
      setSuccessMsg("")
      setIsSnackBar(true)
      
      setErrorMsg("New Password and Confirm Password don't match .");
    } else {
      setSuccessMsg("")
      setIsSnackBar(true)
      setErrorMsg("Enter All Correct Fields.")
    }
  };

  const showError = () => (
    <>{error && <div className="col-md-12 alert alert-danger">{error}</div>}</>
  );

  const changePasswordSection = () => (
    <>
      <div class="my-account-right">
        <div class="my-account-content box-shadow-1">
          <div class="my-account-change-pw">
            <div class="row">
              <div class="col-md-12 my-account-head">
                <h3 class="my-account-title">Change Password</h3>
              </div>
            </div>

            <div class="row">
              {/* <div class="col-md-12"> */}

              {showError()}

              <div class="formStyle">
                <form class="edit-profile-form">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="input-field">
                        <input
                          onChange={handleOldPassword}
                          value={oldPassword}
                          id="user-pan-number"
                          type={"password"}
                          placeholder="&nbsp;"
                          autocomplete="off"
                        />
                        <label for="user-pan-number">Old Password</label>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="input-field">
                        <input
                          onChange={handleNewPassword}
                          value={newPassword}
                          id="user-new-password"
                          type={"password"}
                          placeholder="&nbsp;"
                          autocomplete="off"
                        />
                        <label for="user-new-password">New Password</label>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="input-field">
                        <input
                          onChange={handleConfirmPassword}
                          value={confirmPassword}
                          id="user-confirm-pw"
                          type={"password"}
                          placeholder="&nbsp;"
                          autocomplete="off"
                        />
                        <label for="user-confirm-pw">Confirm Password</label>
                      </div>
                    </div>

                    <div class="col-lg-12">
                      <div class="save-profile-btn text-center mt-4">
                        {/* <button
                          onClick={!loading && clickSave}
                          type="button"
                          class="btn-primery"
                        >
                          {" "}
                          {loading ? <Loading /> : "Change Password"}
                        </button> */}
                        <ThemeButton onClick={clickSave} value={"Change Password"} loading={loading}/>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      <MuiSnackBar
             open={isSnackBar}
             setOpen={setIsSnackBar}
             successMsg={successMsg}
             errorMsg={errorMsg}
             setSuccess={setSuccessMsg}
             setError={setErrorMsg}
           />
    </>
  );

  return <>{changePasswordSection()}</>;
};

export default ChangePassword;
