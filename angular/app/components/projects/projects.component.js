class ProjectsController {
  constructor (API, $state, $stateParams, $scope, $sce, $compile, $filter) {
    'ngInject'

    let that = this
    this.$sce = $sce;
    this.$scope = $scope;
    this.$compile = $compile;
    this.$filter = $filter;
    this.$state = $state;
    this.API = API;

    this.status = null;
    if ($stateParams.status) {
      this.status = $stateParams.status;
    }

    this.totalProject = 0;
    this.countArr = {
        'opened' : 0,
        'approved' : 0,
        'dismissed' : 0
    }

    this.departmentRoute = API.all('departments');
    this.departments = [];

    this.projectRoute = API.all('projects');
    this.projects = [];
    this.filterName = '';
    this.filterTypes = [
        { 'name': 'By name', 'value': 'test'},
        { 'name': 'By date', 'value': 'test1'},
    ]

    this.depSel = {'type':'dep','value': 'all'};

    this.projectPagination ={
        'lastID'  : null,
        'count' : 1,
        'busy'  : true,
        'end'   : false
    }
  }

  detailView(project){
      this.$state.go('app.projects.view', {projectId: project.id})
  }

  viewProfile(user)
  {
      let $state = this.$state
      $state.go('app.user.other-profile',{userId:user.id})
  }

  getDepartment() {
      this.departmentRoute.get('department-tree').then((response) => {
        var dep_list = response.plain().data
        this.departments = dep_list['treeData'];
        this.countArr = dep_list['countArr'];
        this.totalProject = dep_list['countArr']['all'];
      })
  }

  getProjects(depParam){
      this.depSel =  depParam;
      this.projectPagination ={
          'lastID'  : null,
          'count' : 1,
          'busy'  : true,
          'end'   : false
      }
      this.projects = []
      this.loadProjects(depParam);
  }

  loadProjects(depParam){
      this.depSel =  depParam;
      let param = {
          'depParam'    : depParam,
          'pagination'  : this.projectPagination
      }

      if(!this.projectPagination['end'])
        this.projectPagination['busy'] = true;

      this.projectRoute.get('all',param).then((response) => {
          var result = response.plain().data
          if(result.length)
          {
              this.projects = this.projects.concat(result);
              this.projectPagination['lastID'] = result[result.length-1]['id'];
          }else{
              this.projectPagination['end'] = true;
          }
          this.projectPagination['busy'] = false;
      })
  }

  getImageUrl(project_id, filename){
      return 'pro_imgs/' + project_id+ '/' + filename
  }

  trustAsHtml(value) {
      return this.$sce.trustAsHtml(value);
  };

  toggleVote(project_id,is_vote){
      if(!is_vote)
      {
          this.projectRoute.all('upvote').post({'project_id':project_id}).then((response) => {
              let project = this.projects.find(function(item){
                  return item.id == project_id;
              })
              project.vote_count ++;
              project.is_vote = true;
          });
      }else{
          this.projectRoute.all('downvote').post({'project_id':project_id}).then((response) => {
              let project = this.projects.find(function(item){
                  return item.id == project_id;
              })
              project.vote_count --;
              project.is_vote = false;
          });
      }
  }

  $onInit() {
      this.getDepartment();
      let param = this.depSel;

      if(this.status != null)
      {
          param.type = 'status';
          param.value = this.status;

      }
      this.getProjects(param);
  }
}

export const ProjectsComponent = {
  templateUrl: './views/app/components/projects/projects.component.html',
  controller: ProjectsController,
  controllerAs: 'vm',
  bindings: {}
}
