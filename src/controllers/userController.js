const fs = require('fs');
const path = require('path');
const {
    validationResult
} = require("express-validator")
const User = require("../models/User")
const bcryptjs = require("bcryptjs")

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const usersFilePath = path.join(__dirname, '../data/userData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const userController = {
    register: (req, res) => {
        res.render("register")
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        let userInDb = User.findByField("email", req.body.email)

        if (userInDb) {
            return res.render("register", {
                errors: {
                    email: {
                        msg: "Este email ya esta registrado"
                    }
                },
                oldData: req.body
            })
        }

        let userToCreate = {
            ...req.body,
            pass: bcryptjs.hashSync(req.body.pass, 10),
            pass2: bcryptjs.hashSync(req.body.pass2, 10),
            avatar: req.file.filename
        }
        let userCreated = User.create(userToCreate)

        return res.redirect("login")
    },

    login: (req, res) => {
        res.render("login")
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findByField("email", req.body.email)

        if (userToLogin) {

            let checkPass = bcryptjs.compareSync(req.body.password, userToLogin.pass)
            if (checkPass) {
                delete userToLogin.pass
                delete userToLogin.pass2
                req.session.userLogged = userToLogin
                return res.redirect("profile")
            }
            return res.render("login", {
                errors: {
                    email: {
                        msg: "Las credenciales son invalidas"
                    }
                }
            })
        }
        return res.render("login", {
            errors: {
                email: {
                    msg: "No encuentro ese mail registrado"
                }
            }
        })

    },
    profile: (req, res) => {
        return res.render("profile", {
            user: req.session.userLogged
        })
    },
    logout: (req, res) => {
        req.session.destroy
        return res.redirect("/")
    },

    cart: (req, res) => {
        const productsCartPath = path.join(__dirname, '../data/cartData.json');
        const cart = JSON.parse(fs.readFileSync(productsCartPath, 'utf-8'));
        res.render("productCart", {
            cart: cart
        })
    },
    store: (req, res) => {
        const productsCartPath = path.join(__dirname, '../data/cartData.json');
        const cart = JSON.parse(fs.readFileSync(productsCartPath, 'utf-8'));

        let id = req.params.id;
        let elemento = cart.find(prod => prod.id == id)
        console.log(elemento)
        /*         if (elemento != undefined) {
                     prod.quantity = prod.quantity + 1
                 }
              else {
                     products.find(producto => {
                         if (producto.id == id) {
                             cart.push(producto)
                             
                         }
                     })
                 
                 }

                 let cartJSON = JSON.stringify(cart)
                 fs.writeFileSync(productsCartPath, cartJSON)
                 
                 */
        res.redirect("/users/cart")


    }
}
module.exports = userController