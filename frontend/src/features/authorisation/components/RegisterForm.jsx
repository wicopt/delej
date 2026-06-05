import React from "react";
import Button from "../../../shared/ui/Button";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { Link } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";
import "./LoginFormStyle.css";

const RegisterForm = () => {
  const { formData, error, loading, handleChange, handleSubmit } =
    useRegisterForm();
  return (
    <form onSubmit={handleSubmit}>
      <div className=" mb-2">
        {error && (
          <div className="error mb-2 d-flex justify-content-center">
            {error}
          </div>
        )}
        <FloatingLabel label="Email" htmlFor="email">
          <Form.Control
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Введите почту"
            required
            className="input"
            size="sm"
            value={formData.email}
            onChange={handleChange}
          />
        </FloatingLabel>
      </div>
      <div className=" mb-2">
        <FloatingLabel label="имя" htmlFor="name">
          <Form.Control
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Введите имя"
            required
            className="input"
            size="sm"
            value={formData.name}
            onChange={handleChange}
          />
        </FloatingLabel>
      </div>
      <div className=" mb-2">
        <FloatingLabel label="никнейм" htmlFor="username">
          <Form.Control
            type="text"
            id="username"
            autoComplete="off"
            placeholder="Введите никнейм"
            required
            className="input"
            size="sm"
            value={formData.username}
            onChange={handleChange}
          />
        </FloatingLabel>
      </div>
      <div className="mb-2">
        <FloatingLabel label="пароль" htmlFor="password">
          <Form.Control
            type="password"
            id="password"
            autoComplete="off"
            placeholder="Введите пароль"
            required
            className="input"
            size="sm"
            value={formData.password}
            onChange={handleChange}
          />
        </FloatingLabel>
      </div>
      <div className="mb-4">
        <FloatingLabel label="повторите пароль" htmlFor="password2">
          <Form.Control
            type="password"
            id="password2"
            autoComplete="off"
            placeholder="Введите пароль"
            required
            className="input"
            size="sm"
            value={formData.password2}
            onChange={handleChange}
          />
        </FloatingLabel>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button type="submit" className="">
          Зарегистрироваться
        </Button>
      </div>
      <div className="line-horisontal mb-4"></div>
      <div className="d-flex flex-column align-items-center gap-2">
        <button className="google-button">
          <FcGoogle size={24} />
          <span>Продолжить с Google</span>
        </button>
      </div>
    </form>
  );
};
export default RegisterForm;
