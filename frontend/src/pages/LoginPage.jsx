import React from "react";
import LoginForm from "../features/authorisation/components/LoginForm.jsx";
import AuthSwitcher from "../features/authorisation/components/AuthSwitcher.jsx";

const LoginPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center pt-md-5 pt-sm-5 pt-lg-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className=" col-11 col-sm-10 col-md-6 col-lg-4 ">
            <AuthSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
