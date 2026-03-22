import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    name:"",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value }); //??
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.password2) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);
    try {
      const {...userData } = formData;
      await register(userData);
      navigate("/EventsPage");
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    handleSubmit,
    handleChange,
  };
};
