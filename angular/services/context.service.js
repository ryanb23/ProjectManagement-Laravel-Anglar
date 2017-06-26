export class ContextService {
  constructor ($auth, $rootScope, API) {
    'ngInject'
    this.$auth = $auth
    this.API = API
    this.$rootScope = $rootScope
  }

  getContext () {
    let $auth = this.$auth

    if ($auth.isAuthenticated()) {
      let API = this.API
      let UserData = API.service('me', API.all('users'))

      return UserData.one().get()
    } else {
      return null
    }
  }

  hasRole(param,roles)
  {
      let result = false;
      if(typeof roles != 'undefined'){
          for(let i=0; i<roles.length; i++)
          {
             if(param.indexOf(roles[i].slug) >= 0)
                result = true;
          }
      }
      return result;
  }
  hasProject(param,projects)
  {
      let result = false;
      if(typeof projects != 'undefined'){
          for(let i=0; i<projects.length; i++)
          {
              if(param.indexOf(projects[i].id) >= 0)
                 result = true;
          }
      }
      return result;
  }
  hasTodos(param,todos)
  {
      let result = false;
      if(typeof todos != 'undefined'){
          for(let i=0; i<todos.length; i++)
          {
              if(param.indexOf(todos[i].id) >= 0)
                 result = true;
          }
      }
      return result;
  }
  hasTask(task,tasks)
  {
      let result = false;
      if(typeof tasks != 'undefined'){
          for(let i=0; i<tasks.length; i++)
          {
              if(tasks[i].id == task.id)
                 result = true;
              if(tasks[i].department_id == task.department_id)
                result = true;
          }
      }
      return result;
  }
  me (cb) {
    this.$rootScope.$watch('me', function (nv) {
      cb(nv)
    })
  }
}
