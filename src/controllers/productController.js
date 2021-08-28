const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productController = {
    detail: (req, res) => {
        let id = req.params.id
		let product = products.find(product => product.id == id)
		res.render("productDetail", {
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
            "talle ": req.body.talle,
            "description": req.body.description,
            "image": req.body.image
        }

        products.push(newProduct)

        let productJSON = JSON.stringify(products)
        fs.writeFileSync(productsFilePath, productJSON)

        res.redirect("/")
    }
}

module.exports = productController