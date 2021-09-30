const express = require("express")
const router = express.Router()
const path  = require("path")

const validations = require("../middlewares/validateRegisterMiddleware")
const multer = require("multer")
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
const userController = require ("../controllers/userController")

let multerDiskStorage = multer.diskStorage ({
    destination : (req,file,callback) =>{
        let folder = path.join (__dirname, "../../public/images/users")
       
        callback(null,folder)
    },
    filename :(req,file,callback)=>{
         let image = Date.now() + path.extname(file.originalname)
    callback (null, image)
    }
})

const fileUpload = multer({storage: multerDiskStorage})



router.get("/login", guestMiddleware,userController.login)
router.post("/login",userController.loginProcess)

router.get("/register",guestMiddleware, userController.register)

router.post("/register",fileUpload.single("avatar"),validations,userController.processRegister)

router.get("/profile", authMiddleware, userController.profile)

router.get("/logout", userController.logout)

router.get ("/cart", userController.cart)
router.post("/cart/:id", userController.store)


module.exports = router