import React from "react";
import Button from "../../../shared/ui/Button";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { Link } from "react-router-dom";
const RegisterForm = () => {
  const { formData, error, loading, handleChange, handleSubmit } =
    useRegisterForm();
  return (
    <div className="container">
      <div className="d-flex justify-content-center ">
        <div className="col-8 col-sm-8 col-md-6 col-lg-4">
          <h1 className="text-center mb-3 ">Регистрация</h1>
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.name}
                onChange={handleChange}
              ></input>
            </div>
            <div className=" mb-2">
              <label htmlFor="username" className="form-label">
                Никнейм
              </label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                placeholder="Введите ваш никнейм"
                required
                className="form-control"
                value={formData.username}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
              ></input>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Повторите пароль
              </label>
              <input
                type="password"
                id="password2"
                autoComplete="off"
                placeholder="Повторите пароль"
                required
                className="form-control"
                value={formData.password2}
                onChange={handleChange}
              ></input>
            </div>
            <div className="d-flex justify-content-between align-items-center ">
              <Link to="/" className="custom-button custom-button--secondary">
                Отмена{" "}
              </Link>
              <Button type="submit" className="">
                Зарегистрироваться
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
