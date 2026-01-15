// ===============================
// Required Modules
// ===============================
const express = require("express");
const bodyParser = require("body-parser");
 const upload = require("express-fileupload");
const path = require("path");

// ===============================
// App Initialization
// ===============================
const app = express();
const PORT = 1000;

// ===============================
// Middleware
// ===============================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 app.use(upload());

// Static Files (CSS, Images, JS)
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===============================
// Routes
// ===============================
const user_route = require("./routes/user");
const admin_route = require("./routes/admin");


app.use("/", user_route);
app.use("/admin", admin_route);

// ===============================
// Default Route (Optional Safety)
// ===============================
app.get(/.*/, (req, res) => {
    res.status(404).send("Page Not Found");
});


// ===============================
// Server Start
// ===============================
app.listen(1000);
