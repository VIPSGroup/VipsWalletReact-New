import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SignInForm, SignUpForm } from "../../components/forms";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState();
  const { isUserExist } = useSelector((state) => state.loginSlice.checkUser);
  return (
    <>
      {isUserExist &&
      isUserExist[0]?.ResponseStatus === 0 &&
      isUserExist[0]?.ErrorCode === "Ex402" ? (
        <SignUpForm setIsSignIn={setIsSignIn} />
      ) : (
        <SignInForm setIsSignIn={setIsSignIn} />
      )}
    </>
  );
};

export default Login;
