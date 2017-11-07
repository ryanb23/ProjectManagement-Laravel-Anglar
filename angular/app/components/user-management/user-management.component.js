class UserManagementController {
    constructor(API, $scope, $sce, $compile, $filter) {
        // 'ngInject'
        this.$sce = $sce;
        this.$scope = $scope;
        this.$compile = $compile;
        this.$filter = $filter;
        this.API = API;
        this.userRoute = API.all('users');
        let that = this

        this.errors = []
        this.table = angular.element('#tableUsers')
        this.addTable = angular.element('#addUserModal')
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
        this.department_sel = [];
        this.departments = [];

        this.roles = {}
        this.roles.list = [];
        this.roles.selected = [];

        this.jobtitles = {}
        this.jobtitles.list = [];
        this.jobtitles.selected = [];

        this.newUser = {
            name: '',
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            active: true,
            id: null
        }

        $scope.$on('initDataTable', function() {
            if ($.fn.DataTable.isDataTable('#tableUsers'))
                that.addTable_obj.fnDestroy()
            that.addTable_obj = that.table.dataTable(that.options)
        });
    }
    getRoleList() {
        this.userRoute.get('roles').then((response) => {
            var result = response.plain().data;
            this.roles.list = result.roles;
        })
    }

    getUserList(user_list) {
        if ($.fn.DataTable.isDataTable('#tableUsers'))
            this.addTable_obj.fnDestroy()
        this.users = user_list
        // console.log(user_list)
    }

    getDepartment() {
        this.API.all('departments').get('index').then((response) => {
            var dep_list = response.plain().data
            this.departments = dep_list;
        })
    }

    getJobTitle() {
        this.API.all('jobtitles').get('index').then((response) => {
            var jobtitle_list = response.plain().data
            this.jobtitles.list = jobtitle_list;
        })
    }

    init() {
        this.getRoleList()
        this.getDepartment();
        this.getJobTitle();

        this.userRoute.get('index').then((response) => {
            var user_list = response.plain().data;
            this.getUserList(user_list)
        })
    }

    filter(event) {
        this.table.dataTable().fnFilter(angular.element(event.currentTarget).val());
    }

    addNewUser(isValid) {
        if (isValid && this.department_sel.length) {

            this.newUser.department = this.department_sel
            this.newUser.role = this.roles.selected
            this.newUser.jobtitle = this.jobtitles.selected

            let endpoint = this.userRoute.all("user")
            if (this.formType == 'edit')
                endpoint = this.userRoute.all("user-update")

            endpoint.post(this.newUser).then(() => {
                this.init()
                this.addTable.modal('hide');
            }).catch(this.addNewUserFail.bind(this))
        } else {
            this.formSubmitted = true
        }
    }

    addNewUserFail(response) {
        if (response.status === 422) {
          for (var error in response.data.errors) {
            this.errors[error] = response.data.errors[error][0]
            this.addUserForm[error].$invalid = true
          }
        }
    }
    addUser() {
        this.formType = 'add';

        this.newUser = {
            name: '',
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            active: true,
            id: null
        }

        this.newUser.name = '';
        this.newUser.firstname = '';
        this.newUser.lastname = '';
        this.newUser.password = '';
        this.newUser.active = true;
        this.newUser.email = '';
        this.newUser.id = null;

        this.department_sel = [];
        this.roles.selected = [];
        this.showModal();
    }

    editUser(params) {
        this.formType = 'edit';
        let item = params.data;

        this.newUser.id = item.id;
        this.newUser.name = item.name;
        this.newUser.firstname = item.firstname;
        this.newUser.lastname = item.lastname;
        this.newUser.password = item.password;
        this.newUser.active = item.active == 1? true: false;
        this.newUser.email = item.email;

        let tmpDepIds = item.departments.map(function(item){ return item['id']});
        this.department_sel = this.departments.filter(function(i){
            return tmpDepIds.indexOf(i['id']) != -1;
        });

        let tmpRoleIds = item.roles.map(function(item){ return item['id']});
        this.roles.selected = this.roles.list.filter(function(i){
            return tmpRoleIds.indexOf(i['id']) != -1;
        });

        let tmpIds = item.job_titles.map(function(item){ return item['id']});
        this.jobtitles.selected = this.jobtitles.list.filter(function(i){
            return tmpIds.indexOf(i['id']) != -1;
        });
        this.showModal();
    }

    removeUser(params) {
        let id = params.id;
        if (confirm('Are you sure?'))
            this.userRoute.one('user', id).remove().then(() => {
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
        this.init()
    }
}

export const UserManagementComponent = {
    templateUrl: './views/app/components/user-management/user-management.component.html',
    controller: UserManagementController,
    controllerAs: 'vm',
    bindings: {}
}
