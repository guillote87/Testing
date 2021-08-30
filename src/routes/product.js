const express = require("express")

const router = express.Router()

const productController = require ("../controllers/productController")





/* Rutas de detalle y creacion de productos */

router.get ("/", productController.create)
router.post ("/",productController.store)

/* Rutas de detalle y filtro de productos */

router.get ("/:id", productController.detail)
router.get ("/filter/:filter", productController.filter)

/* Rutas de edicion de productos */

router.get ("/edit/:id",productController.edit)
router.put ("/:id",productController.update)

/* Rutas de eliminacion de productos */

router.delete("/:id",productController.destroy)


module.exports = router;