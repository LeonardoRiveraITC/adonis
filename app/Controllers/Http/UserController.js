'use strict'

const Store = require("@adonisjs/framework/src/Route/Store");
const AuthSevice = require("../../Services/AuthSevice");
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
    async destroy({auth,params,response}){
        try{
        const sesion = await auth.getUser();
        const {email}=params;
        const user = await User.findBy('email',email);
        AuthSevice.verificarUsuario(user,sesion);
        await user.delete();
        return user;
        }catch(e){
            return response.status(404).json({
                error: 'Invalid token'
            });
        }
    }
    async update({auth,params,request}){
        const sesion =await auth.getUser();
        const {email} =params;
        const user = await User.findBy('email',email);
        AuthSevice.verificarUsuario(user,sesion);
        user.merge(request.only('username'));
        user.merge(request.only('email'));
        user.merge(request.only('password'));
        await user.save();
        return user;
    }
}

module.exports = UserController
