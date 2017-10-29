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

    this.searchName = '';

    this.departments = {};
    this.departments.list = [];
    this.departments.sel = [];
    this.departments.setting = {
        showCheckAll: false,
        showUncheckAll: false,
        smartButtonMaxItems: 1,
        smartButtonTextConverter: function(itemText, originalItem) { return itemText;}
    }
    function depSelect(){
        that.filterUsers();
    }
    this.departments.event_setting ={
        onSelectionChanged: depSelect
    }

    angular.extend(that, this.departments.event_setting);

    this.permissions = {};
    this.permissions.list = [];
    this.permissions.sel = [];
    this.permissions.setting = {
        showCheckAll: false,
        showUncheckAll: false,
        smartButtonMaxItems: 1,
        smartButtonTextConverter: function(itemText, originalItem) { return itemText;}
    }
    function pemSelect(){
        that.filterUsers();
    }
    this.permissions.event_setting ={
        onSelectionChanged: pemSelect
    }

    angular.extend(that, this.departments.event_setting);

    this.uesrs = []
    this.favIds = [];
  }

  trustAsHtml(value) {
      return this.$sce.trustAsHtml(value);
  };

  getFavIds(){
      this.userRoute.get('favorite-ids').then((response) => {
        this.favIds = response.plain().data;
      })
  }

  getPermission() {
      this.userRoute.get('roles').then((response) => {
        var permission_list = response.plain().data.roles;
        this.permissions.list = permission_list.map(function(item){
            return {id: item.id, label: item.name};
        });
      })
  }

  getDepartment() {
      this.departmentRoute.get('index').then((response) => {
        var dep_list = response.plain().data
        this.departments.list = dep_list.map(function(item){
            return {id: item.id, label: item.name};
        });
        this.filterUsers();
      })
  }

  filterUsers(deps){
      let depIds = this.departments.sel.map(function(item){return item['id']}).join(",");
      let roleIds = this.permissions.sel.map(function(item){return item['id']}).join(",");
      this.userRoute.get('filter-users',{departments: depIds, roles: roleIds}).then((response) => {
          this.users = response.plain().data
      });
  }

  filterByName(user)
  {
      return user.name.toLowerCase().includes(this.searchName.toLowerCase());
  }

  viewProfile(user)
  {
      let $state = this.$state
      $state.go('app.user.other-profile',{userId:user.id})
  }

  $onInit() {
      this.getDepartment();
      this.getPermission();
      this.getFavIds();
  }
}

export const OrganizationComponent = {
  templateUrl: './views/app/components/organization/organization.component.html',
  controller: OrganizationController,
  controllerAs: 'vm',
  bindings: {}
}
