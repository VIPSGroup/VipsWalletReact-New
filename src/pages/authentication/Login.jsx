import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SignInForm, SignUpForm } from "../../components/forms";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const { isUserExist } = useSelector((state) => state.loginSlice.checkUser);
  console.log(isUserExist);
  return (
    <>
      {isUserExist &&
      isUserExist[0]?.ResponseStatus === 0 &&
      isUserExist[0]?.ErrorCode === "Ex402" && !isSignIn ? (
        <SignUpForm setIsSignIn={setIsSignIn} />
      ) : (
        <SignInForm setIsSignIn={setIsSignIn} />
      )}
    </>
  );
};

export default Login;
