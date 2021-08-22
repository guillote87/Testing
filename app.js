const express = require("express")
const app = express()

app.set("view engine", "ejs")
const productRoute = require ("./routes/product")
const mainRoute = require ("./routes/index")
app.use(express.static("./public"))



app.listen(process.env.PORT||3000, ()=>{
    console.log('Servidor funcionando');
});

app.use("/", mainRoute)
app.use ("/productos",productRoute)



