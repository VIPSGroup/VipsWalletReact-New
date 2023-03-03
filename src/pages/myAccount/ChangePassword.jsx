import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/common";
import { changePassword } from "../../redux/slices/profile/profileSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

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
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [success]);
  const clickSave = (e) => {
    const Mobile = loggedInUser.Mobile;
    const Password = loggedInUser.TRXNPassword;
    e.preventDefault();
    if (oldPassword === loggedInUser.TRXNPassword) {
      if (newPassword === confirmPassword) {
        dispatch(changePassword({ Mobile, Password, newPassword }));
      } else {
        setError("New Password and Confirm Password dont match .");
      }
    } else {
      setError("Enter correct Old password.");
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
                        <button
                          onClick={!loading && clickSave}
                          type="button"
                          class="btn-primery"
                        >
                          {" "}
                          {loading ? <Loading /> : "Change Password"}
                        </button>
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
    </>
  );

  return <>{changePasswordSection()}</>;
};

export default ChangePassword;
