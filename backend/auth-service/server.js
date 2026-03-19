const express = require("express")
const {pool} = require("./dbConfig")
const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("hi there!")
});

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM user');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => console.log(`listening on port ${port}`)
)