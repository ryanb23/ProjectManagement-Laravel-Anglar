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

    this.depSel = 'all';
  }
  detailView(project){
      this.$state.go('app.projects.view', {projectId: project.id})
  }
  getDepartment() {
      this.departmentRoute.get('department-tree').then((response) => {
        var dep_list = response.plain().data
        this.departments = dep_list['treeData'];
        this.countArr = dep_list['countArr'];
        this.totalProject = dep_list['countArr']['all'];
      })
  }
  getProjects(param){
      this.depSel = param.value;
      this.projectRoute.get('by-date-group',param).then((response) => {
          var result = response.plain().data
          this.projects = result;
      })
  }
  $onInit() {
      this.getDepartment();
      let param = {'type':'dep','value':this.depSel}

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
