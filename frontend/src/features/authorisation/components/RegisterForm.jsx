import React from "react";
import Button from '../../../shared/ui/Button';
const LoginForm = ({ onSuccess }) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center ">
        <div className=" p-3 rounded-2 shadow fit-content">
          <h1 className="text-center mb-3 ">Регистрация</h1>
          <form >
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
            <div className=" mb-2">
              <label htmlFor="name" className="form-label">
                Имя пользователя
              </label>
              <input
                type="text"
                id="name"
                autoComplete="off"
                placeholder="Введите ваше имя"
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
                        <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Повторите пароль
              </label>
              <input
                type="password"
                id="confirmPassword"
                autoComplete="off"
                placeholder="Повторите пароль"
                required
                className="form-control"
              ></input>
            </div>
            <div className="d-flex flex-wrap gap-2 align-items-center ">
              <Button variant="secondary"className="mb-2 ">Отмена</Button>
            <Button type="submit" className="mb-2 ">Зарегистрироваться</Button></div>
            </form>
    
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
