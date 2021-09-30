// 1. Guardar al usuario en la DB
// 2. Buscar al usuario que se quiere loguear por su email
// 3. Buscar a un usuario por su ID
// 4. Editar info de un usuario
// 5. Eliminar a un usuario de BD
const fs = require("fs")

const path = require("path")



const User = {

    fileName : path.join(__dirname, '../data/userData.json'),

    generateId: function () {
        let allUsers = this.findAll()
        let lastUser = allUsers.pop()
        if (lastUser) {
            return lastUser.id + 1
        }
        return 1
    },

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"))
    },

    findAll: function () {
        return this.getData()
    },

    findByPk: function (id) {
        let allUsers = this.findAll()
        let UserFound = allUsers.find(User => User.id === id)
        return UserFound
    },

    findByField: function (field, text) {
        let allUsers = this.findAll()
        let UserFound = allUsers.find(User => User[field] === text)
        return UserFound
    },
    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "))
    
        return newUser
    },
    delete :function(id){
        let allUsers= this.findAll()
        let finalUsers = allUsers.filter(User => User.id !== id)
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "))
        return true
    }

}

module.exports = User
