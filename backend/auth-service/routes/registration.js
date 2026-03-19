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
  if (
    !name ||
    !password ||
    !password2 ||
    !username ||
    !email
  ) {
    errors.push({ message: "Please enter all required fields" });
  }

  if (password && password.length < 6) {
    errors.push({ message: "Password must be at least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  // Если есть ошибки - загружаем departments и показываем форму с ошибками
  if (errors.length > 0) {
    try {
      res.render("register", {
        errors,
        username: username || "",
        name: name || "",
        email: email || "",
        password: password || "",
        password2: password2 || "",
      });
    } catch (err) {
      console.error("Ошибка при рендеринге:", err);
      res.status(500).send("Server error");
    }
    return;
  }

  // Если валидация прошла успешно
  try {
    // ЗАПРОС В БД!!!!!!
    const usernameCheck = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    const emailCheck = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (usernameCheck.rows > 0 || emailCheck.rows > 0) {
      let errors = ""
      if (usernameCheck.rows > 0 && emailCheck.rows > 0) {
        errors = [{ message: "Username and email already registered" }]
      } else if (usernameCheck.rows > 0) {
        errors = [{ message: "Username already registered" }]
      } else {
        errors = [{ message: "Email already registered" }]
      }
      return res.render("register", {
        errors: errors,
        username: username || "",
        name: name || "",
        surname: surname || "",
        patronymic: patronymic || "",
        department_id: department_id || "",
        birthday: birthday || "",
        password: password || "",
        password2: password2 || "",
      });
    }

    // Хешируем пароль и создаем пользователя
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await pool.query(
      `INSERT INTO users (username, name, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING user_id, username, name`,
      [
        username,
        name,
        email,
        hashedPassword,
      ]
    );

    console.log("Новый пользователь:", newUser.rows[0]);
    res.send("Пользователь успешно зарегистрирован");
  } catch (err) {
    console.error("Ошибка при регистрации:", err);


    res.render("register", {
      errors: [{ message: "Database error during registration" }],
      username: username || "",
      name: name || "",
      email: email || "",
      password: password || "",
      password2: password2 || "",
    });
  }
});
