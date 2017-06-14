class UserManagementController {
  constructor(API, $scope, $sce, $compile, $filter) {
      'ngInject'
      this.$sce = $sce;
      this.$scope = $scope;
      this.$compile = $compile;
      this.$filter = $filter;
      this.API = API;
      this.userRoute = API.all('users');
      let that = this

      this.table = $('#tableUsers')
      this.addTable = $('#addUserModal')
      this.addUserForm = null
      this.addTable_obj = null
      this.formSubmitted = false
      this.formType = 'add';

      this.options = {
          "sDom": "<'table-responsive't><'row'<p i>>",
          "destroy": true,
          "scrollCollapse": true,
          "oLanguage": {
              "sLengthMenu": "_MENU_ ",
              "sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
          },
          "iDisplayLength": 20
      };
      this.users = [];
      this.department_sel = {};
      this.departments = [];

      this.newUSer = {
          name: '',
          firstname: true,
          lastname: '',
          department: null,
          permission: null,
          email: '',
          id: null
      }

      $scope.$on('initDataTable', function(ngRepeatFinishedEvent) {
          if ($.fn.DataTable.isDataTable('#tableUsers'))
              that.addTable_obj.fnDestroy()
          that.addTable_obj = that.table.dataTable(that.options)
      });
  }
  InitValues(user_list) {
      if ($.fn.DataTable.isDataTable('#tableUsers'))
          this.addTable_obj.fnDestroy()
      this.users = user_list
      console.log(user_list)
  }

  getDepartment() {
    this.API.all('departments').get('index').then((response) => {
        var dep_list = response.plain().data;
        this.departments = [{
            id: '0',
            name: '---',
            des: ''
        }];
        for (var i = 0; i < dep_list.length; i++) {
            var item = dep_list[i];
            if(item.p_dep_id != 0)
              this.departments.push({
                  id: item.id,
                  name: item.name,
                  des: item.description
              })
        }
    })
  }

  init() {
      this.getDepartment();
      this.userRoute.get('index').then((response) => {
          var user_list = response.plain().data;
          this.InitValues(user_list)
      })
  }

  filter(event) {
      this.table.dataTable().fnFilter($(event.currentTarget).val());
  }

  addNewUser(isValid) {
      if (isValid) {
          this.newUSer.p_dep = this.department_sel.selected.id;
          console.log(this.newUSer);
          let endpoint = this.userRoute.all("new-department")
          if (this.formType == 'edit')
              endpoint = this.userRoute.all("update-department")

          endpoint.post(this.newUSer).then((response) => {
              var dep_list = response.plain().data;
              this.InitValues(dep_list)
              this.addTable.modal('hide');
          }).catch(this.addNewUserFail.bind(this))
      } else {
          this.formSubmitted = true
      }
  }
  addNewUserFail(response) {

  }
  addDepartment() {
      this.formType = 'add';
      this.newUSer.name = '';
      this.newUSer.active = true;
      this.newUSer.des = '';
      this.newUSer.p_dep = '0';
      this.newUSer.id = null;

      this.department_sel.selected = this.departments[0]
      this.showModal();
  }

  editDepartment(params) {
      this.formType = 'edit';
      let item = params.data;
      this.newUSer.id = item.id
      this.newUSer.name = item.name
      this.newUSer.des = item.description
      this.newUSer.active = item.active == 1 ? true : false;

      this.newUSer.p_dep = item.p_dep_id
      this.department_sel.selected = this.$filter('filter')(this.departments, {
          'id': item.p_dep_id
      })[0]
      this.showModal();
  }

  removeDepartment(params) {
    let id = params.id;
    if(confirm('Are you sure?'))
      this.userRoute.one('department', id).remove().then((response) => {
          this.init()
      })
  }
  // Modal Functions
  showModal() {
      this.addTable.modal('show')
  }
  hideModal() {
      this.addTable.modal('hide');
  }

  trustAsHtml(value) {
      return this.$sce.trustAsHtml(value);
  }

  $onInit() {
      this.department_sel.selected = this.departments[0]
      this.init()
  }
}

export const UserManagementComponent = {
  templateUrl: './views/app/components/user-management/user-management.component.html',
  controller: UserManagementController,
  controllerAs: 'vm',
  bindings: {}
}
