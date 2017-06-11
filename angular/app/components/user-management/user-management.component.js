class UserManagementController {
  constructor ($scope) {
    'ngInject'
    this.table = $('#tableWithSearch')
    this.addTable = $('#addNewAppModal')
    let that = this

    this.options = {
        "sDom": "<'table-responsive't><'row'<p i>>",

        "destroy": true,
        "scrollCollapse": true,
        "oLanguage": {
            "sLengthMenu": "_MENU_ ",
            "sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
        },
        "iDisplayLength": 5
    };
    this.filter = function(event) {
      that.table.dataTable().fnFilter($(event.currentTarget).val());
    }
    this.showModal = function(){
      that.addTable.modal('show');
    }
    this.addNewUser = function() {
        alert()
        that.addTable.modal('hide');
    }
    this.hideModal = function() {
        that.addTable.modal('hide');
    }
  }

  $onInit () {

  }
}

export const UserManagementComponent = {
  templateUrl: './views/app/components/user-management/user-management.component.html',
  controller: UserManagementController,
  controllerAs: 'vm',
  bindings: {}
}
