'use strict'
class AuthService{
    verificarPermiso(recurso,user){
        if(recurso.user_id != user.id){
            return response.status(403).json({
                message:"Unauthorized"
            });
        };
    }
}

module.exports=new AuthService();