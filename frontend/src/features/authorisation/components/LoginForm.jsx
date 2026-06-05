import React from "react";
import { Link } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";
import Button from "../../../shared/ui/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FcGoogle } from "react-icons/fc";
import "./LoginFormStyle.css";

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
<>
          <form onSubmit={handleSubmit} >
            {error && (
              <div className="error mb-2 d-flex justify-content-center">
                {error}
              </div>
            )}
            <div className=" mb-2">
              <FloatingLabel label="Email или никнейм" htmlFor="email">
                <Form.Control
                  type="text"
                  id="email"
                  autoComplete="off"
                  placeholder="Введите почту"
                  required
                  className="input"
                  size="sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
              {/* <input
                type="text"
                id="email"
                autoComplete="off"
                placeholder="Введите почту"
                required
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <label htmlFor="email" className="form-label" >
                Email или никнейм
              </label>*/}
            </div>
            <div className="mb-2">
              <FloatingLabel label="Пароль" htmlFor="password">
                <Form.Control
                  type="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Введите почту"
                  required
                  className="input form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
              {/*<label htmlFor="password" className="form-label">
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
              ></input>*/}
            </div>
            <div className=" mb-2">
              <div className="form-check mb-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remeberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="remeber">
                  Запомнить пароль
                </label>
              </div>
            </div>
            
            <div className="d-flex flex-column align-items-center margin-bottom-middle">
              <Button type="submit" variant="primary" disabled={loading}>
                Войти
              </Button>
            </div>
            <div className="line-horisontal "></div>
            <div className="d-flex flex-column align-items-center gap-2">
              <div className="d-flex gap-2 mb-2">
              <p>Забыли пароль? </p>
              <a href="/forgotpassword" className="link">
                Восстановить
              </a>
            </div>

              <button className="google-button">
                <FcGoogle size={24} />
                <span>Продолжить с Google</span>
              </button>
            </div>
          </form>
</>
  );
};
export default LoginForm;
