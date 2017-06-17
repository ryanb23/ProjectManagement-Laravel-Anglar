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
  }

  getDepartment() {
      this.API.all('departments').get('index').then((response) => {
          var dep_list = response.plain().data
          this.departments = dep_list;
      })
  }

  $onInit() {
      this.getDepartment()
  }
}

export const ProjectsComponent = {
  templateUrl: './views/app/components/projects/projects.component.html',
  controller: ProjectsController,
  controllerAs: 'vm',
  bindings: {}
}
