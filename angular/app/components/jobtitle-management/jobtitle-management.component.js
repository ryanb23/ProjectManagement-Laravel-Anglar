class JobtitleManagementController {
    constructor(API, $scope, $sce, $compile, $filter) {
        'ngInject'
        this.$sce = $sce;
        this.$scope = $scope;
        this.$compile = $compile;
        this.$filter = $filter;
        this.API = API;
        this.jobtitleRoute = API.all('jobtitles');
        let that = this

        this.table = $('#job-table')
        this.editModal = $('#editJobtitleModal')
        this.editRewardForm = null;
        this.addTable_obj = null;
        this.formSubmitted = false;
        this.modalType = "Add";
        this.updateJobtitleItem = {
            id    : null,
            title  : '',
            desc  : ''
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
        this.jobtitles = [];

        $scope.$on('initDataTable', function(ngRepeatFinishedEvent) {
            if ($.fn.DataTable.isDataTable('#job-table'))
                that.addTable_obj.fnDestroy()
            that.addTable_obj = that.table.dataTable(that.options)
        });
    }
    InitValues(jobtitle_list) {
        if ($.fn.DataTable.isDataTable('#job-table'))
            this.addTable_obj.fnDestroy()
        this.jobtitles = jobtitle_list;
    }

    getJobTitles() {
        this.jobtitleRoute.get('index').then((response) => {
            var jobtitle_list = response.plain().data;
            this.InitValues(jobtitle_list)
        })
    }
    filter(event) {
        this.table.dataTable().fnFilter($(event.currentTarget).val());
    }

    addJobtitle(){
        this.modalType = "Add"
        this.updateJobtitleItem.id = null;
        this.updateJobtitleItem.title = '';
        this.updateJobtitleItem.desc = '';
        this.showModal();
    }

    editJobtitle(params) {
        this.modalType = "Update"
        this.updateJobtitleItem.id = params.id;
        this.updateJobtitleItem.title = params.title;
        this.updateJobtitleItem.desc = params.desc;
        this.editModal.modal('show')
    }

    updateJobTitle(isValid)
    {
        if(isValid)
        {
            this.jobtitleRoute.all("job-title").post(this.updateJobtitleItem).then((response) => {
                var jobtitle_list = response.plain().data;
                this.InitValues(jobtitle_list)
                this.editModal.modal('hide');
            }).catch(this.postTitleFail.bind(this))
        } else {
            this.formSubmitted = true;
        }
    }

    postTitleFail(response){

    }

    removeJobtitle(params) {
      let id = params.id;
      if(confirm('Are you sure?'))
        this.jobtitleRoute.one('job-title', id).remove().then((response) => {
            var jobtitle_list = response.plain().data;
            this.InitValues(jobtitle_list)
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
        this.getJobTitles()
    }
}

export const JobtitleManagementComponent = {
    templateUrl: './views/app/components/jobtitle-management/jobtitle-management.component.html',
    controller: JobtitleManagementController,
    controllerAs: 'vm',
    bindings: {}
}
