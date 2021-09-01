const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productController = {
 
    detail: (req, res) => {
        let id = req.params.id
        let product = products.find(product => product.id == id)
        let interes = products.filter(product => product.id != id)
        res.render("productDetail", {
          product:  product ,interes: interes
        })
    },
    filter: (req, res) => {
        let filter = req.params.filter
        let product = products.filter(product => product.category == filter)
        res.render("index", {
            product
        })
    },

    create: (req, res) => {
        res.render("createProducts")
    },

    store: (req, res) => {
        newProduct = {
            "id": products.length + 1,
            "name": req.body.name,
            "price": req.body.price,
            "category": req.body.category,
            "size": req.body.size,
            "color": req.body.color,
            "description": req.body.description,
            "image": req.body.image,
            "image2": req.body.image2
        }

        products.push(newProduct)

        let productJSON = JSON.stringify(products)
        fs.writeFileSync(productsFilePath, productJSON)

        res.redirect("/",{productJSON})
    },

    /* Update - Form to edit*/
    edit: (req, res) => {
        let id = req.params.id
        let productToEdit = products.find(product => product.id == id)
        res.render("editProducts", {
            productToEdit
        })
    },
    // Update - Method to update
    update: (req, res) => {
        let id = req.params.id;
        products.forEach(producto => {
            if (producto.id == id) {
                producto.name = req.body.name
                producto.description = req.body.description
               /* producto.image = req.body.image
                producto.image2 = req.body.image2*/
                producto.category = req.body.category
                producto.size = req.body.size
                producto.color = req.body.color
                producto.price = req.body.price
            }
        })

        let productJSON = JSON.stringify(products)
        fs.writeFileSync(productsFilePath, productJSON)

        res.redirect("/")
    },
    // Delete - Delete one product from DB
	destroy: (req, res) => {
		let id = req.params.id;
		let eliminado = products.filter(producto => producto.id != id)

		let productJSON = JSON.stringify(eliminado)
		fs.writeFileSync(productsFilePath, productJSON)
		res.redirect("/")
		}
}

module.exports = productController