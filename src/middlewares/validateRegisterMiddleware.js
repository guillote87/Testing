const {body} = require("express-validator")
const path = require("path")

module.exports =[
    body("name").notEmpty().withMessage("Debe ingresar un nombre"),
    body("email")
    .notEmpty().withMessage("Debe ingresar un mail valido").bail()
    .isEmail().withMessage("Debes ingresar un formato de email valido"),
    body("pass").notEmpty().withMessage("Debe ingresar una contraseña"),
    body("birthday").notEmpty().withMessage("Debe seleccionar tu fecha de nacimiento"),
    body("avatar").custom((value, {req})=>{
        let file = req.file
        let acceptedExtensions=[".jpg",".png",".gif"]
        if (!file){
            throw new Error ("Tienes que subir una imagen")
        }else{
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error (`las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`)
            }
        }

        return true
    })
]