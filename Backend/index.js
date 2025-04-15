const express = require('express')
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const path = require('path')
const { userModel, connectDB } = require('./models/mogodb');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json())

connectDB();

app.get("/", (req, res) => {
    res.send("Hello form backend");
})

app.post("/api/register", async (req, res) => {
    console.log(req.body);
    try {
        let { name, email, password } = req.body;

        const exixtingUser = await userModel.findOne({ email });
        if (exixtingUser) {
            return res.status(404).json({ status: "error", error: "User already exists" });
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let CreatedUser = await userModel.create({
                    name,
                    email,
                    password: hash,
                });

                let token = jwt.sign({ email }, "shhhhhhhhhhhh")
                res.cookie("token", token)

                res.send(CreatedUser);
            })
        })

    } catch (error) {
        res.json({ status: "error", error: "Duplicate email" })
    }
})

app.post("/api/login", async (req, res) => {
    console.log(req.body.email, req.body.password)
    let user = await userModel.findOne({ email: req.body.email });


    if (!user) {
        console.log("user not found in database");
        return res.send("User not found");
    }
    console.log("user found", user);
    bcrypt.compare(req.body.password, user.password, (err, result) => {

        if (result) {
            let token = jwt.sign({ email: user.email }, "shhhhhhhhhhhh", { expiresIn: "1h" });

            res.cookie("token", token, { httpOnly: true }); // Secure the token in a cookie
            return res.json({ status: "ok", message: "User verified" }); // ✅ Send JSON response
        }

    })
})

app.listen(1337, () => {
    console.log("server is started");
})