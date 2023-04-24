import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SignInForm, SignUpForm } from "../../components/forms";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const { isUserExist } = useSelector((state) => state.loginSlice.checkUser);
  const [Username, setUsername] = useState(isUserExist[1])
  return (
    <>
      {isUserExist &&
      isUserExist[0]?.ResponseStatus === 0 &&
      isUserExist[0]?.ErrorCode === "Ex402" ? (
        <SignUpForm setIsSignIn={setIsSignIn} />
      ) : (
        <SignInForm setIsSignIn={setIsSignIn} isSignIn={isSignIn} Username={Username}/>
      )}
    </>
  );
};

export default Login;
