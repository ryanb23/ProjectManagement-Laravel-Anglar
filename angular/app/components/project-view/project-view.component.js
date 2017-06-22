class ProjectViewController {
    constructor(API, $state, $stateParams, $timeout, $scope, $sce, $compile, $filter, Lightbox) {
        'ngInject'

        let that = this

        this.projectId = $stateParams.projectId;
        this.$sce = $sce;
        this.$scope = $scope;
        this.$compile = $compile;
        this.$filter = $filter;
        this.$state = $state;
        this.$timeout = $timeout;
        this.API = API;
        this.Lightbox = Lightbox;
        this.test = ["1", "2"]

        this.addTodoModal = angular.element('#addTodoModal');
        this.addTodolistForm = null
        this.formSubmitted = false
        this.formType = 'add';

        this.departments = {}
        this.departments.list = []
        this.departments.sel = null

        this.managers = {}
        this.managers.list = []
        this.managers.sel = null

        this.newTodoList = {
            title: '',
            description: '',
            pm_id: ''
        }

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

        this.projectRoute = API.all('projects');
        this.departmentRoute = API.all('departments');
        this.userRoute = API.all('users');
        this.todosRoute = API.all('todos');

        this.projectDetail = []
        this.images = [];
    }

    trustAsHtml(value) {
        return this.$sce.trustAsHtml(value);
    };
    openLightboxModal(index) {
        this.Lightbox.openModal(this.images, index);
    }

    setImageUrls(params) {
        for (var i = 0; i < params.length; i++) {
            this.images.push({
                'url': 'pro_imgs/' + this.projectId + '/' + params[i]['filename'],
                'thumbUrl': 'pro_imgs/' + this.projectId + '/' + params[i]['filename'],
                'caption': params[i]['org_filename']
            });
        }
    }

    getProjectDetail() {
        var param = { 'id': this.projectId }
        this.projectRoute.get('project', param).then((response) => {
            var result = response.plain().data
            this.projectDetail = result;
            this.setImageUrls(result.file);
        })
    }

    postProjectStatusUpdate(params) {
        this.projectRoute.all('status-update').post(params).then((response) => {
            this.$state.go('app.projects', { status: params.status });
        })
    }

    addTodoListModal(){
      this.showModal(this.addTodoModal)
    }

    addTodoList(isValid){
        if (isValid && this.managers.sel != null) {
            this.newTodoList.pm_id = this.managers.sel;
            console.log(this.newTodoList);
            
            this.projectRoute.all('store').post(this.newProject).then(() => {
                this.$state.go('app.projects');
            }).catch(this.createProjectFail.bind(this))
        } else {
            this.formSubmitted = true
        }
    }

    getTodos(){
        this.todosRoute.get('index').then((response) => {
            var result = response.plain().data;
            this.departments.list = result;
        })
    }

    getDepartments(){
        this.departmentRoute.get('index').then((response) => {
            var result = response.plain().data;
            this.departments.list = result;
        })
    }

    getManagers(){
        this.userRoute.get('project-managers').then((response) => {
            var result = response.plain().data;
            this.managers.list = result;
        })
    }

    showModal(modalObj) {
        modalObj.modal('show')
    }
    hideModal(type) {
        if(type == 1)
          this.addTodoModal.modal('hide')
    }

    refreshTest(portlet) {
        console.log("Refreshing...");
        // Timeout to simulate AJAX response delay
        this.$timeout(function() {
            angular.element(portlet).portlet({
                refresh: false
            });
        }, 2000);

    }
    $onInit() {
        this.getProjectDetail();
        this.getDepartments()
        this.getManagers()
    }
}

export const ProjectViewComponent = {
    templateUrl: './views/app/components/project-view/project-view.component.html',
    controller: ProjectViewController,
    controllerAs: 'vm',
    bindings: {}
}
