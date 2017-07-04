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
    this.userRoute = API.all('users');

    this.departments = [];
    this.depSel = null;

    this.uesrs = []
  }

  getDepartment() {
      this.departmentRoute.get('department-tree-with-users').then((response) => {
        var dep_list = response.plain().data
        this.departments = dep_list['treeData'];
        this.depSel  = this.departments[0]['id']
        this.getUsers(this.departments[0])
      })
  }

  getUsers(dep){
      this.depSel  = dep['id']
      this.userRoute.get('department-users',{'id':dep['id']}).then((response) => {
          this.users = response.plain().data
      });
  }

  viewProfile(user)
  {
      let $state = this.$state
      $state.go('app.user.other-profile',{userId:user.id})
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
