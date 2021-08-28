const express = require("express")

const router = express.Router()

const productController = require ("../controllers/productController")


router.get ("/:id", productController.detail)


/* Rutas de detalle y creacion de productos */
router.get ("/", productController.create)
router.post ("/",productController.store)




module.exports = router;