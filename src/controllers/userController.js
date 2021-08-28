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
        res.render("productCart")
    }
}

module.exports = userController