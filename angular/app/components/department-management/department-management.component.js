class DepartmentManagementController {
  constructor (API, $scope, $sce, $compile) {
    'ngInject'
    this.$sce = $sce;
    this.$scope = $scope;
    this.$compile = $compile;
    this.API = API;
    this.departmentRoute = API.all('department');
    let that = this

    this.table = $('#tableDepartments')
    this.addTable = $('#addDepartmentModal')
    this.addDepartmentFrom = null
    this.addTable_dj = null
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

    this.newDepartment = {name:'',active: true, des:'' ,p_dep:'0'}

    $scope.$on('initDataTable', function(ngRepeatFinishedEvent) {
      if($.fn.DataTable.isDataTable( '#tableDepartments' ))
        that.addTable_dj.fnDestroy()
      that.addTable_dj = that.table.dataTable(that.options)
    });
  }
  InitValues(dep_list){
    if($.fn.DataTable.isDataTable( '#tableDepartments' ))
      this.addTable_dj.fnDestroy()
    this.departments = dep_list;
    this.p_departments = [{id:'0',name:'---',des:'',p_dep:''}];
    for(var i=0; i<dep_list.length; i++)
    {
      var item = dep_list[i];
      this.p_departments.push({id:item.id,name:item.name,des:item.description})
    }
  }

  getDepartment(){
    this.departmentRoute.get('index').then((response) => {
        var dep_list = response.plain().data;
        this.InitValues(dep_list)
    })
  }
  filter(event) {
    this.table.dataTable().fnFilter($(event.currentTarget).val());
  }

  addNewDepartment() {
    this.newDepartment.active = false
    // console.log(this.addDepartmentFrom);
    this.formSubmitted = true
    // let selected_dep_id = this.p_department_sel.selected.id;
    // this.newDepartment.p_dep = selected_dep_id
    // this.departmentRoute.all("new-department").post(this.newDepartment).then((response) => {
    //     var dep_list = response.plain().data;
    //     this.InitValues(dep_list)
    // })
    // this.addTable.modal('hide');
  }
  addDepartment(){
    this.formType = 'add';
    this.newDepartment = {name:'',active: true, des:'' ,p_dep:'0'}
    this.showModal();
  }

  editDepartment(params){
    this.formType = 'edit';
    let type = params.type;
    let item = params.data;
    if(type == 'parent')
    {
      this.newDepartment.name = item.name
      this.newDepartment.des = item.description
      this.newDepartment.active = item.active == 1 ? true: false;

      // this.p_department_sel

      this.newDepartment.p_dep = item.p_dep
    }
    else{

    }
    this.showModal();
  }

  removeDepartment(params){

  }
  // Modal Functions
  showModal(){
    this.addTable.modal('show')
  }
  hideModal() {
    this.addTable.modal('hide');
  }

  trustAsHtml(value) {
      return this.$sce.trustAsHtml(value);
  }

  $onInit () {
    this.p_department_sel.selected = this.p_departments[0]
    this.getDepartment()
  }
}

export const DepartmentManagementComponent = {
  templateUrl: './views/app/components/department-management/department-management.component.html',
  controller: DepartmentManagementController,
  controllerAs: 'vm',
  bindings: {}
}
