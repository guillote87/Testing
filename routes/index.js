const { Router } = require("express");
const express = require ("express")

const route = express.Router()

const mainController = require ("../controllers/mainController")

route.get("/", mainController.index)
route.get("/login",mainController.login)

module.exports = route;