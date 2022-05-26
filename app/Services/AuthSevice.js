'use strict'
const UnauthorizedException=use('App/Exceptions/UnauthorizedException');
const NotFoundException=use('App/Exceptions/NotFoundException');
class AuthService{
    verificarPermiso(recurso,user){
        if(!recurso){
            throw new NotFoundException;
        }
        if(recurso.user_id != user.id){
            throw new UnauthorizedException();  
        };
    }
}

module.exports=new AuthService();