'use strict'

const Store = require("@adonisjs/framework/src/Route/Store")
const User = use('App/Models/User');
class UserController {
    async login ({request,auth}){
        const{email,password}=request.all(); 
        const token = auth.attempt(email,password)
        return token;   
    }
    async store({request}){
        const {email,password}=request.all();
        const user = await User.create({
            email,
            password,
            username:email
        });
        return user;
    }
}

module.exports = UserController
