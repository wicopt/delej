import React from "react";
import { Link } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";
import Button from "../../../shared/ui/Button";

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
    rememberMe,
    setRememberMe,
  } = useLoginForm();
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className=" col-8 col-sm-8 col-md-6 col-lg-4 ">
          <h1 className="text-center mb-3">Авторизация</h1>
          <form onSubmit={handleSubmit}>
            <div className=" mb-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Введите почту"
                required
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                autoComplete="off"
                placeholder="Введите пароль"
                required
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className=" mb-2">
              <div className="form-check mb-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remeberMe"
                  checked={rememberMe}
                  onChange={(e)=> setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="remeber">
                  Запомнить пароль
                </label>
              </div>
              
            </div>
            <div className="d-flex gap-2 mb-2">
              <p>Забыли пароль? </p>
              <a href="/forgotpassword">Восстановить</a>
            </div>
            <div className="d-flex flex-column align-items-center mb-2">
              <Button type="submit" variant="primary" disabled={loading}>
                Войти
              </Button>
            </div>
          </form>
          <div className="d-flex flex-column align-items-center gap-2">
            <p>Нет аккаунта?</p>
            <Link
              to="/RegisterPage"
              className="custom-button custom-button--primary"
            >
              Зарегистрироваться{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
