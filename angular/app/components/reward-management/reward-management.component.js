class RewardManagementController {
    constructor(API, $scope, $sce, $compile, $filter) {
        'ngInject'
        this.$sce = $sce;
        this.$scope = $scope;
        this.$compile = $compile;
        this.$filter = $filter;
        this.API = API;
        this.departmentRoute = API.all('departments');
        let that = this

        this.table = $('#tableDepartments')
        this.addTable = $('#addDepartmentModal')
        this.addDepartmentForm = null
        this.addTable_obj = null
        this.formSubmitted = false
        this.formType = 'add';

        this.options = {
            "sDom": "<'table-responsive't><'row'<p i>>",
            "destroy": true,
            "bSort": false,
            "scrollCollapse": true,
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
            },
            "iDisplayLength": 10
        };
        this.departments = [];
        this.p_department_sel = {};
        this.p_departments = [];

        this.newDepartment = {
            name: '',
            active: true,
            des: '',
            p_dep: '0',
            id: null
        }

        $scope.$on('initDataTable', function(ngRepeatFinishedEvent) {
            if ($.fn.DataTable.isDataTable('#tableDepartments'))
                that.addTable_obj.fnDestroy()
            that.addTable_obj = that.table.dataTable(that.options)
        });
    }
    InitValues(dep_list) {
        if ($.fn.DataTable.isDataTable('#tableDepartments'))
            this.addTable_obj.fnDestroy()
        this.departments = dep_list;
        this.p_departments = [{
            id: '0',
            name: '---',
            des: ''
        }];
        for (var i = 0; i < dep_list.length; i++) {
            var item = dep_list[i];
            if(item.p_dep_id == 0)
              this.p_departments.push({
                  id: item.id,
                  name: item.name,
                  des: item.description
              })
        }
    }

    getDepartment() {
        this.departmentRoute.get('index').then((response) => {
            var dep_list = response.plain().data;
            this.InitValues(dep_list)
        })
    }
    filter(event) {
        this.table.dataTable().fnFilter($(event.currentTarget).val());
    }

    addNewDepartment(isValid) {
        if (isValid) {
            this.newDepartment.p_dep = this.p_department_sel.selected.id;
            console.log(this.newDepartment);
            let endpoint = this.departmentRoute.all("new-department")
            if (this.formType == 'edit')
                endpoint = this.departmentRoute.all("update-department")

            endpoint.post(this.newDepartment).then((response) => {
                var dep_list = response.plain().data;
                this.InitValues(dep_list)
                this.addTable.modal('hide');
            }).catch(this.addNewDepartmentFail.bind(this))
        } else {
            this.formSubmitted = true
        }
    }
    addNewDepartmentFail(response) {

    }
    addDepartment() {
        this.formType = 'add';
        this.newDepartment.name = '';
        this.newDepartment.active = true;
        this.newDepartment.des = '';
        this.newDepartment.p_dep = '0';
        this.newDepartment.id = null;

        this.p_department_sel.selected = this.p_departments[0]
        this.showModal();
    }

    editDepartment(params) {
        this.formType = 'edit';
        let item = params.data;
        this.newDepartment.id = item.id
        this.newDepartment.name = item.name
        this.newDepartment.des = item.description
        this.newDepartment.active = item.active == 1 ? true : false;

        this.newDepartment.p_dep = item.p_dep_id
        this.p_department_sel.selected = this.$filter('filter')(this.p_departments, {
            'id': item.p_dep_id
        })[0]
        this.showModal();
    }

    removeDepartment(params) {
      let id = params.id;
      if(confirm('Are you sure?'))
        this.departmentRoute.one('department', id).remove().then((response) => {
            this.getDepartment()
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
        this.p_department_sel.selected = this.p_departments[0]
        this.getDepartment()
    }
}

export const RewardManagementComponent = {
    templateUrl: './views/app/components/reward-management/reward-management.component.html',
    controller: RewardManagementController,
    controllerAs: 'vm',
    bindings: {}
}
