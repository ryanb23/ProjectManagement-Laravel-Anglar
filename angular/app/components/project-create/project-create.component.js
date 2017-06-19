class ProjectCreateController {
    constructor(API, $scope, $state, $stateParams, $sce, $compile, $filter, $rootScope,  ContextService) {
        'ngInject'

        this.$sce = $sce;
        this.$scope = $scope;
        this.$compile = $compile;
        this.$filter = $filter;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.API = API;
        this.projectRoute = API.all('projects');
        this.userRoute = API.all('users');
        this.departmentRoute = API.all('departments');
        this.labelRoute = API.all('labels');
        this.userRoute = API.all('users');
        let that = this

        this.errors = []
        this.newFile = [];
        this.newProject = {
            title: '',
            labels: [],
            departments: [],
            objective: '',
            contributors: [],
            files: [],
            description: ''
        }

        this.labels = {}
        this.labels.list = []
        this.labels.sel = []

        this.departments = {}
        this.departments.list = []
        this.departments.sel = null

        this.contributors = {}
        this.contributors.list = []
        this.contributors.sel = []

        this.dzOptions = {
            url: '/api/images/upload',
            paramName: 'photo',
            maxFilesize: '10',
            // acceptedFiles: 'image/jpeg, images/jpg, image/png',
            addRemoveLinks: true
        };

        this.dzCallbacks = {
            'addedfile': function(file) {
                // console.log(file);
            },
            'success': function(file, xhr) {
                // console.log(file, xhr);
                that.newFile.push(xhr.data);
            }
        };

        this.dzMethods = {};

        this.createProjectForm = null;

    }
    trustAsHtml(value) {
        return this.$sce.trustAsHtml(value);
    };

    getLabels(){
        this.labelRoute.get('index').then((response) => {
            var result = response.plain().data;
            this.labels.list = result;
        })
    }

    getDepartments(){
        this.departmentRoute.get('index').then((response) => {
            var result = response.plain().data;
            this.departments.list = result;
        })
    }

    getContributors(){
        this.userRoute.get('department-user').then((response) => {
            var result = response.plain().data;
            this.contributors.list = result;
        })
    }
    createProject(isValid) {
        if (isValid && this.labels.sel.length) {
            this.newProject.labels = this.labels.sel;
            this.newProject.departments = this.departments.sel;
            this.newProject.contributors = this.contributors.sel;
            this.newProject.files = this.newFile;
            this.projectRoute.all('store').post(this.newProject).then(() => {
                // this.$state.go('app.projects');
            }).catch(this.createProjectFail.bind(this))
        } else {
            this.formSubmitted = true
        }
    }

    createProjectFail(param){

    }

    removeNewFile() {
        this.dzMethods.removeFile(this.newFile); //We got $scope.newFile from 'addedfile' event callback
    }

    $onInit() {
        this.getLabels();
        this.getDepartments();
        this.getContributors();
    }
}

export const ProjectCreateComponent = {
    templateUrl: './views/app/components/project-create/project-create.component.html',
    controller: ProjectCreateController,
    controllerAs: 'vm',
    bindings: {}
}
