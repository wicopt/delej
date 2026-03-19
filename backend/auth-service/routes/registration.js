const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require('../models/UserModel');

// JSON endpoint для регистрации
router.post("/", async (req, res) => {
  let {
    username,
    name,
    password,
    password2,
    email
  } = req.body;

  let errors = [];

  console.log("Данные из формы:", req.body);

  // Валидация
  if (!name || !password || !password2 || !username || !email) {
    errors.push({ message: "Please enter all required fields" });
  }

  if (password && password.length < 6) {
    errors.push({ message: "Password must be at least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  // Если есть ошибки - возвращаем JSON
  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false, 
      errors: errors,
      data: { username, name, email }
    });
  }

  // Если валидация прошла успешно
  try {
    // Проверка существующего пользователя
    const existingUser = await UserModel.findByEmail(email);
    const existingUsername = await UserModel.findByUsername(username);
    
    if (existingUser || existingUsername) {
      let message = "";
      if (existingUser && existingUsername) {
        message = "Username and email already registered";
      } else if (existingUsername) {
        message = "Username already registered";
      } else {
        message = "Email already registered";
      }
      
      return res.status(400).json({ 
        success: false, 
        error: message,
        data: { username, name, email }
      });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 12);

    // Создаем пользователя через модель
    const newUser = await UserModel.create({ 
      username, 
      name, 
      email, 
      password_hash: hashedPassword 
    });

    console.log("Новый пользователь:", newUser);
    
    // Возвращаем успешный JSON ответ
    res.status(201).json({ 
      success: true, 
      message: "User successfully registered",
      user: newUser
    });
    
  } catch (err) {
    console.error("Ошибка при регистрации:", err);
    res.status(500).json({ 
      success: false, 
      error: "Database error during registration" 
    });
  }
});

module.exports = router;