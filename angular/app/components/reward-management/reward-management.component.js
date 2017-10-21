class RewardManagementController {
    constructor(API, $scope, $sce, $compile, $filter) {
        'ngInject'
        this.$sce = $sce;
        this.$scope = $scope;
        this.$compile = $compile;
        this.$filter = $filter;
        this.API = API;
        this.rewardRoute = API.all('rewards');
        let that = this

        this.table = $('#tableDepartments')
        this.editTable = $('#editRewardModal')
        this.editRewardForm = null;
        this.addTable_obj = null;
        this.formSubmitted = false;
        this.updateRewardItem = {
            id    : null,
            point : 0
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
        this.rewards = [];

        $scope.$on('initDataTable', function(ngRepeatFinishedEvent) {
            if ($.fn.DataTable.isDataTable('#tableDepartments'))
                that.addTable_obj.fnDestroy()
            that.addTable_obj = that.table.dataTable(that.options)
        });
    }
    InitValues(reward_list) {
        if ($.fn.DataTable.isDataTable('#tableDepartments'))
            this.addTable_obj.fnDestroy()
        this.rewards = reward_list;
    }

    getRewards() {
        this.rewardRoute.get('index').then((response) => {
            var reward_list = response.plain().data;
            this.InitValues(reward_list)
        })
    }
    filter(event) {
        this.table.dataTable().fnFilter($(event.currentTarget).val());
    }

    editDepartment(params) {
        this.updateRewardItem.id = params.id;
        this.updateRewardItem.point = params.point;
        this.showModal();
    }

    updateDepartment(isValid)
    {
        if(isValid)
        {
            this.rewardRoute.all("reward").post(this.updateRewardItem).then((response) => {
                var reward_list = response.plain().data;
                this.InitValues(reward_list)
                this.editTable.modal('hide');
            }).catch(this.addNewDepartmentFail.bind(this))
        } else {
            this.formSubmitted = true;
        }
    }

    removeDepartment(params) {
      let id = params.id;
      if(confirm('Are you sure?'))
        this.departmentRoute.one('department', id).remove().then((response) => {
            this.getRewards()
        })
    }
    // Modal Functions
    showModal() {
        this.editTable.modal('show')
    }
    hideModal() {
        this.editTable.modal('hide');
    }

    trustAsHtml(value) {
        return this.$sce.trustAsHtml(value);
    }

    $onInit() {
        this.getRewards()
    }
}

export const RewardManagementComponent = {
    templateUrl: './views/app/components/reward-management/reward-management.component.html',
    controller: RewardManagementController,
    controllerAs: 'vm',
    bindings: {}
}
