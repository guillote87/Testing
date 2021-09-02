const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const userController = {
    register: (req,res)=>{
        res.render("register")
    },
    login: (req,res)=>{
        res.render ("login")
    },
   
    cart: (req, res) => {
        const productsCartPath = path.join(__dirname, '../data/cartData.json');
        const cart = JSON.parse(fs.readFileSync(productsCartPath, 'utf-8'));
        console.log (cart)
        res.render("productCart",{cart: cart})
    },
    store:(req,res) =>{
        const productsCartPath = path.join(__dirname, '../data/cartData.json');
        const cart = JSON.parse(fs.readFileSync(productsCartPath, 'utf-8'));
  
                  let id = req.params.id;
                products.forEach(producto => {
                    if (producto.id == id) {
                       cart.push(producto)
                    }
                })
                console.log(cart)
                let cartJSON = JSON.stringify(cart)
            fs.writeFileSync(productsCartPath, cartJSON)
            res.redirect("/users/cart")
        }}


        
module.exports = userController