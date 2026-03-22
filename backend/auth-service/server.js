const express = require("express")
const { pool } = require("./config/dbConfig")
const passport = require("./config/PassportConfig")
const registrationRoutes = require("./routes/registration")
const loginRoutes = require("./routes/login")
const UserModel = require('./models/UserModel');
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())

app.get("/", (req, res) => {
    res.send("hi there!")
});

app.get('/users', async (req, res) => {
    try {

        const result = UserModel.findByUsername("user");
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.use("/api/auth/register", registrationRoutes);
app.use("/api/auth/login", loginRoutes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
}
)