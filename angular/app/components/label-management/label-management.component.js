class LabelManagementController {
    constructor(API, $scope, $sce, $compile, $filter) {
        'ngInject'
        this.$sce = $sce;
        this.$scope = $scope;
        this.$compile = $compile;
        this.$filter = $filter;
        this.API = API;
        this.labelRoute = API.all('labels');
        let that = this

        this.table = $('#tableDepartments')
        this.editModal = $('#editRewardModal')
        this.editRewardForm = null;
        this.addTable_obj = null;
        this.formSubmitted = false;
        this.modalType = "Add";
        this.updateLabelItem = {
            id    : null,
            name  : '',
            color : ''
        }
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
        this.labels = [];

        $scope.$on('initDataTable', function(ngRepeatFinishedEvent) {
            if ($.fn.DataTable.isDataTable('#tableDepartments'))
                that.addTable_obj.fnDestroy()
            that.addTable_obj = that.table.dataTable(that.options)
        });
    }
    InitValues(label_list) {
        if ($.fn.DataTable.isDataTable('#tableDepartments'))
            this.addTable_obj.fnDestroy()
        this.labels = label_list;
    }

    getLabels() {
        this.labelRoute.get('index').then((response) => {
            var label_list = response.plain().data;
            this.InitValues(label_list)
        })
    }
    filter(event) {
        this.table.dataTable().fnFilter($(event.currentTarget).val());
    }

    addLabel(){
        this.modalType = "Add"
        this.updateLabelItem.id = null;
        this.updateLabelItem.name = '';
        this.updateLabelItem.color = '#6D5CAE';
        this.showModal();
    }

    editLabel(params) {
        this.modalType = "Update"
        this.updateLabelItem.id = params.id;
        this.updateLabelItem.name = params.name;
        this.updateLabelItem.color = params.color;
        this.editModal.modal('show')
    }

    updateLabel(isValid)
    {
        if(isValid)
        {
            this.labelRoute.all("label").post(this.updateLabelItem).then((response) => {
                var label_list = response.plain().data;
                this.InitValues(label_list)
                this.editModal.modal('hide');
            }).catch(this.addNewDepartmentFail.bind(this))
        } else {
            this.formSubmitted = true;
        }
    }

    removeLabel(params) {
      let id = params.id;
      if(confirm('Are you sure?'))
        this.labelRoute.one('label', id).remove().then((response) => {
            var label_list = response.plain().data;
            this.InitValues(label_list)
        })
    }
    // Modal Functions
    showModal() {
        this.editModal.modal('show')
    }
    hideModal() {
        this.editModal.modal('hide');
    }

    trustAsHtml(value) {
        return this.$sce.trustAsHtml(value);
    }

    $onInit() {
        this.getLabels()
    }
}

export const LabelManagementComponent = {
    templateUrl: './views/app/components/label-management/label-management.component.html',
    controller: LabelManagementController,
    controllerAs: 'vm',
    bindings: {}
}
