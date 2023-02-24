import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../apiData/user/profile";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import LoadingBar from "../common/loading";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const [oldShow, setOldShow] = useState(false);
  const [newShow, setNewShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
const {loggedInUser}= useSelector(state=>state.login)
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

  const handleOldShow = () => {
    setOldShow(!oldShow);
  };
  const handleNewShow = () => {
    setNewShow(!newShow);
  };
  const handleConfirmShow = () => {
    setConfirmShow(!confirmShow);
  };

  const clickSave = (e) => {
    e.preventDefault();
    if (oldPassword == loggedInUser.TRXNPassword) {
      if (newPassword == confirmPassword) {
        setLoading(true);
        changePassword(loggedInUser.Mobile, loggedInUser.TRXNPassword, newPassword).then(
          (response) => {
            setSuccess(true);
            setLoading(false);
            localStorage.removeItem("user");
            navigate("/");
          }
        );
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
                        <i onClick={handleOldShow} class="" id="">
                          {oldShow ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                        </i>
                        <input
                          onChange={handleOldPassword}
                          value={oldPassword}
                          id="user-pan-number"
                          type={oldShow ? "text" : "password"}
                          placeholder="&nbsp;"
                          autocomplete="off"
                        />
                        <label for="user-pan-number">Old Password</label>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="input-field">
                        <i onClick={handleNewShow} class="" id="">
                          {newShow ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                        </i>
                        <input
                          onChange={handleNewPassword}
                          value={newPassword}
                          id="user-new-password"
                          type={newShow ? "text" : "password"}
                          placeholder="&nbsp;"
                          autocomplete="off"
                        />
                        <label for="user-new-password">New Password</label>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="input-field">
                        <i onClick={handleConfirmShow} class="" id="">
                          {confirmShow ? (
                            <BsFillEyeFill />
                          ) : (
                            <BsFillEyeSlashFill />
                          )}
                        </i>
                        <input
                          onChange={handleConfirmPassword}
                          value={confirmPassword}
                          id="user-confirm-pw"
                          type={confirmShow ? "text" : "password"}
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
                          {loading ? <LoadingBar /> : "Change Password"}
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
