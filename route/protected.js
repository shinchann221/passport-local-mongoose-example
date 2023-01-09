// importing modules 
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/user');

router.get("/", (req, res, next) => {
    res.json({ user: req.user });
}
);

module.exports = router;