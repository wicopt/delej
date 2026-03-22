const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const UserModel = require('../models/UserModel');
const { createToken } = require("../middleware/jwtToken");

const login = async (username, password) => {
    const user = await UserModel.findByEmailOrUsername(username);
    if (user) {
        console.log(user);
        const auth = await bcrypt.compare(password, user.password_hash);

        console.log(auth);
        if (auth) {
            return user;
        }
    }
}
router.post("/", async (req, res) => {
    let {
        username,
        password
    } = req.body;

    let errors = [];

    console.log("Данные из формы:", req.body);
    // Валидация
    if (!password || !username) {
        errors.push({ message: "Please enter all required fields" });
    }

    try {
        const user = await login(username, password);
        const token = createToken(user.user_id)
        res.status(200).json({ 
            user_id: user.user_id, 
            token: token
         });
    }
    catch (err) {
        res.status(400).json({})
    }
})

module.exports = router;