'use strict'
const AuthService=use('App/Services/AuthSevice.js')
const Project = use("App/Models/Project");

class ProjectController {
   async index({auth}){
        const user = await auth.getUser();
        return await user.projects().fetch();
    }
    async create({request,auth}){
        const user = await auth.getUser();
        const {name}=request.all();
        const project = await Project.create({
            name
        });
        await user.projects().save(project);
        return project;
        
    }
    async destroy({auth,response,params}){
        const user = await auth.getUser();
        const {id}=params;
        const project  = await Project.find(id);
        AuthService.verificarPermiso(project,user);
        await project.delete();
        return project;
    }
    async update({auth,params,request}){
        const user =await auth.getUser();
        const {id} =params;
        const project = await Project.find(id);
        AuthService.verificarPermiso(project,user);
        project.merge(request.only('name'));
        await project.save();
        return project;
    }
}

module.exports = ProjectController
