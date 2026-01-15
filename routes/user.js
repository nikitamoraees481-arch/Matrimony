const express = require("express");
const route = express.Router();
const exe = require("./../connection");

route.get("/",async function(req,res){

    const profiles = await exe(`
        SELECT member_id, full_name,gender, date_of_birth, religion_caste, mother_tongue
        FROM users
        WHERE profile_status = 'Approved'
        ORDER BY member_id DESC
        
        `);

        res.render("user/index",{ profiles});
});


route.get("/about_us",function(req,res){
    res.render("user/about_us.ejs")
});

route.get("/membership",function(req,res){
    res.render("user/membership.ejs")
});

route.get("/search",function(req,res){
    res.render("user/search.ejs")
});

route.get("/login",function(req,res){
    res.render("user/login.ejs")
});

route.get("/register",function(req,res){
    res.render("user/register.ejs")
});

route.get("/profile",function(req,res){
    res.render("user/profile.ejs")
});

route.get("/contact", function (req, res) {
    res.render("user/contact");
});


module.exports = route;