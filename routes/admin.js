const express = require("express");
const route = express.Router();
const exe = require("./../connection")


route.get("/", async function(req, res) {
    try {
        // Total Users
        const totalUsers = (await exe("SELECT COUNT(*) AS total FROM users"))[0].total;

        // Pending Profiles
        const pendingUsers = (await exe("SELECT COUNT(*) AS total FROM users WHERE profile_status='Pending'"))[0].total;

        // Approved Profiles
        const approvedUsers = (await exe("SELECT COUNT(*) AS total FROM users WHERE profile_status='Approved'"))[0].total;

        // Blocked Users
        const blockedUsers = (await exe("SELECT COUNT(*) AS total FROM users WHERE profile_status='Blocked'"))[0].total;

        // Paid Members → current status from memberships table
        const paidMembers = (await exe("SELECT COUNT(*) AS total FROM memberships WHERE payment_status='Approved'"))[0].total;

        // New Registrations Today
        const newRegistrations = (await exe("SELECT COUNT(*) AS total FROM users WHERE DATE(created_at)=CURDATE()"))[0].total;

        // Gender Ratio
        const maleUsers = (await exe("SELECT COUNT(*) AS total FROM users WHERE gender='Male'"))[0].total;
        const femaleUsers = (await exe("SELECT COUNT(*) AS total FROM users WHERE gender='Female'"))[0].total;

        // Render EJS dashboard with all stats
        res.render("admin/index", {
            totalUsers,
            pendingUsers,
            approvedUsers,
            blockedUsers,
            paidMembers,       // ✅ Paid Members current status
            newRegistrations,
            maleUsers,
            femaleUsers
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching dashboard data");
    }
});




route.get("/users", async function (req, res) {

    var sql = "SELECT * FROM users";
    var users = await exe(sql);

    res.render("admin/users", { users });
});

    route.post("/add_user", async function (req, res) {

    var d = req.body;

    var sql = `
        INSERT INTO users
        (
            full_name,
            gender,
            date_of_birth,
            religion_caste,
            mother_tongue,
            email,
            mobile,
            username,
            password
        )
        VALUES
        (
            '${d.full_name}',
            '${d.gender}',
            '${d.date_of_birth}',
            '${d.religion_caste}',
            '${d.mother_tongue}',
            '${d.email}',
            '${d.mobile}',
            '${d.username}',
            '${d.password}'
        )
    `;

    var data = await exe(sql);

    res.redirect(("/register"))
});

route.get("/view_user/:id", async function (req, res) {
    var id = req.params.id;

    var sql = `SELECT * FROM users WHERE member_id='${id}'`;
    var data = await exe(sql);

    res.render("admin/view_user", { user: data[0] });
});


// Update user status
route.post("/update_status/:id", async function (req, res) {
    var id = req.params.id;
    var status = req.body.profile_status;

    var sql = `UPDATE users 
               SET profile_status='${status}' 
               WHERE member_id='${id}'`;

    await exe(sql);

    res.redirect("/admin/users");
});

route.get("/users_status", async (req,res)=>{
    var users = await exe("SELECT * FROM users");
    res.render("admin/users_status",{ users });
});

// GET blocked members page
route.get("/blocked_users", async (req, res) => {
    var sql = "SELECT * FROM users WHERE profile_status='Blocked'";
    var users = await exe(sql);
    res.render("admin/blocked_users", { users });
});

// POST unblock user
route.post("/unblock_user/:id", async (req, res) => {
    var id = req.params.id;
    var sql = `UPDATE users SET profile_status='Pending' WHERE member_id='${id}'`;
    await exe(sql);
    res.redirect("/admin/blocked_users");
});


route.get("/memberships", async (req, res) => {

    const memberships = await exe("SELECT * FROM memberships ORDER BY id DESC");

    res.render("admin/memberships", { memberships });
});


route.get("/admin/memberships", async (req, res) => {
    const memberships = await exe("SELECT * FROM memberships ORDER BY created_at DESC");
    res.render("admin/memberships", { memberships });
});

route.post("/membership/checkout", async function(req, res) {
    const d = req.body;

    const sql = `
        INSERT INTO memberships
        (full_name, email, mobile, plan, payment_method, payment_status)
        VALUES
        (
            '${d.full_name}',
            '${d.email}',
            '${d.mobile}',
            '${d.plan}',
            '${d.payment_method}',
            'Pending'
        )
    `;
    
    try {
        await exe(sql);
        // res.send("Membership request submitted successfully!");
         res.redirect(("/membership"))
    } catch(err) {
        console.error(err);
        res.status(500).send("Error while submitting membership.");
    }
});

route.get("/contact", function(req, res) {

    const sql = "SELECT * FROM contact_info LIMIT 1";

    conn.query(sql, function(err, result) {

        if (err) {
            console.log(err);
        } else {
            res.render("contact", {
                contact: result[0]
            });
        }

    });
});


module.exports =route;

