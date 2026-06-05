import React from "react";
import RegisterForm from "../features/authorisation/components/RegisterForm.jsx";
import AuthSwitcher from "../features/authorisation/components/AuthSwitcher.jsx";
const RegisterPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-start pt-3">
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
export default RegisterPage;
