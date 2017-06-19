class ProjectsController {
  constructor (API, $scope, $sce, $compile, $filter) {
    'ngInject'

    let that = this
    this.$sce = $sce;
    this.$scope = $scope;
    this.$compile = $compile;
    this.$filter = $filter;
    this.API = API;

    this.totalProject = 0;
    this.countArr = {
        'approved' : 0,
        'dismissed' : 0
    }

    this.departmentRoute = API.all('departments');
    this.departments = [];

    this.projectRoute = API.all('projects');
    this.projects = [];

    this.depSel = 'all';
  }

  getDepartment() {
      this.departmentRoute.get('department-tree').then((response) => {
        var dep_list = response.plain().data
        this.departments = dep_list['treeData'];
        this.countArr = dep_list['countArr'];
        this.totalProject = dep_list['countArr']['approved'] + dep_list['countArr']['dismissed'];
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
      this.getProjects({'type':'dep','value':this.depSel});
  }
}

export const ProjectsComponent = {
  templateUrl: './views/app/components/projects/projects.component.html',
  controller: ProjectsController,
  controllerAs: 'vm',
  bindings: {}
}
