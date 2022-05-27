'use strict'
const Project = use('App/Models/Project');
const Task = use('App/Models/Task');
const AuthService  = use('App/Services/AuthSevice');
class TaskController {
    async create({auth,request,params}){
         const user = await auth.getUser();
        const {description}=request.all();
        const {id}=params;
        const project = await Project.find(id);
        AuthService.verificarPermiso(project,user);
        const task  = new Task();
        task.fill({
            description
        });
        await project.task().save(task);
        return task;
    }
    async index ({auth,request,params}){
        const user  = await auth.getUser();
        const {id}=params;
        const project = await Project.find(id); 
        AuthService.verificarPermiso(project,user);
        return await project.task().fetch();
    }
    async destroy({auth,params}){
        const user = await auth.getUser();
        const {id} = params;
        const task = await Task.find(id);
        const project = await task.project().fetch();
        AuthService.verificarPermiso(project,user);
        await task.delete();
        return task;  
    }
    async update({auth,params,request}){
        const user = await auth.getUser();
        const {id} = params;
        const task = await Task.find(id);
        const project = await task.project().fetch();
        AuthService.verificarPermiso(project,user);
        await task.merge(request.only([
            'description',
            'finished'
        ])); 
        task.save();
        return task;  
    }    
}

module.exports = TaskController
