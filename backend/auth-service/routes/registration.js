const express = require("express");
const router = express.Router();
const { pool } = require("../config/dbConfig");
const bcrypt = require("bcrypt");

// JSON endpoint для регистрации
router.post("/register", async (req, res) => {
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
    const usernameCheck = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    const emailCheck = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    
    if (usernameCheck.rows.length > 0 || emailCheck.rows.length > 0) {
      let message = "";
      if (usernameCheck.rows.length > 0 && emailCheck.rows.length > 0) {
        message = "Username and email already registered";
      } else if (usernameCheck.rows.length > 0) {
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

    // Хешируем пароль и создаем пользователя
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await pool.query(
      `INSERT INTO users (username, name, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING user_id, username, name, email`,
      [username, name, email, hashedPassword]
    );

    console.log("Новый пользователь:", newUser.rows[0]);
    
    // Возвращаем успешный JSON ответ
    res.status(201).json({ 
      success: true, 
      message: "User successfully registered",
      user: newUser.rows[0]
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