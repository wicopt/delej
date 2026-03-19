import React from "react";
import {Link} from 'react-router-dom';
import Button from '../../../shared/ui/Button';
const LoginForm = ({ onSuccess }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className=" col-12 col-sm-8 col-md-6 col-lg-4 p-3 shadow">
          <h1 className="text-center mb-3">Авторизация</h1>
          <form>
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
              ></input>
            </div>
            <div className=" mb-4">
              <div className="form-check mb-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remeber"
                />
                <label className="form-check-label" htmlFor="remeber">
                  Запомнить пароль
                </label>
              </div>
              <a href="/forgotpassword">Забыли пароль? Восстановить</a>
            </div>
            <div className="d-flex flex-column align-items-center mb-2">
            <Button type="submit" variant='primary'>Войти</Button></div>
            </form>
            <div className="d-flex flex-column align-items-center gap-2">
            <p>Нет аккаунта?</p>
            < Link to="/RegisterPage" className="custom-button custom-button--primary">Зарегистрироваться </Link></div>
          
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
