const Menu = require('../../models/menu')

function homeController() {
    // factory function = return an object
    return{
            async index(req,res){
            const pizzas = await Menu.find();
                return res.render('home',{pizzas:pizzas})
        }
    }
}

module.exports = homeController;
