class OrganizationController {
  constructor (API, $state, $stateParams, $scope, $sce, $compile, $filter) {
    'ngInject'

    let that = this
    this.$sce = $sce;
    this.$scope = $scope;
    this.$compile = $compile;
    this.$filter = $filter;
    this.$state = $state;
    this.API = API;

    this.departmentRoute = API.all('departments');
    this.departments = [];
    this.depSel = null;
  }

  getDepartment() {
      this.departmentRoute.get('department-tree').then((response) => {
        var dep_list = response.plain().data
        this.departments = dep_list['treeData'];
        this.depSel  = this.departments[0]['id']
      })
  }

  getUsers(){

  }

  $onInit() {
      this.getDepartment();
  }
}

export const OrganizationComponent = {
  templateUrl: './views/app/components/organization/organization.component.html',
  controller: OrganizationController,
  controllerAs: 'vm',
  bindings: {}
}
