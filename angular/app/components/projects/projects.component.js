class ProjectsController {
  constructor (API, $scope, $sce, $compile, $filter) {
    'ngInject'

    let that = this
    this.$sce = $sce;
    this.$scope = $scope;
    this.$compile = $compile;
    this.$filter = $filter;
    this.API = API;

    this.departmentRoute = API.all('departments');
    this.departments = [];

    this.projectRoute = API.all('projects');
    this.projects = [];

  }

  getDepartment() {
      this.API.all('departments').get('department-tree').then((response) => {
          var dep_list = response.plain().data
          this.departments = dep_list;
      })
  }
  getProjects(){
      this.projectRoute.get('by-date-group').then((response) => {
          var result = response.plain().data
          this.projects = result;
      })
  }
  $onInit() {
      this.getDepartment();
      this.getProjects();
  }
}

export const ProjectsComponent = {
  templateUrl: './views/app/components/projects/projects.component.html',
  controller: ProjectsController,
  controllerAs: 'vm',
  bindings: {}
}
