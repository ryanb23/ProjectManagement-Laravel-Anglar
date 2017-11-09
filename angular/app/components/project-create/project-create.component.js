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
            newfiles: [],
            description: ''
        }

        this.labels = {}
        this.labels.list = []
        this.labels.sel = []
        this.labels.setting = {
            smartButtonMaxItems: 4,
            smartButtonTextConverter: function(itemText, originalItem) { return itemText;}
        }

        this.departments = {}
        this.departments.list = []
        this.departments.sel = null

        this.contributors = {}
        this.contributors.list = []
        this.contributors.sel = []
        this.contributors.setting = {
            smartButtonMaxItems: 4,
            smartButtonTextConverter: function(itemText, originalItem) { return itemText;}
        }

        that.dropzoneObj = null

        this.dzOptions = {
            url: '/api/images/upload',
            paramName: 'file',
            maxFilesize: '10',
            // acceptedFiles: 'image/jpeg, images/jpg, image/png',
            addRemoveLinks: true,
            init : function(){
                that.dropzoneObj = this;
            }
        };

        this.dzCallbacks = {
            'addedfile': function(file) {
                // console.log(file);
            },
            'removedfile':function(file){
                that.removeFile(file);
            },
            'success': function(file, xhr) {
                // console.log(file, xhr);
                that.newFile.push(xhr.data);
            }
        };

        this.dzMethods = {};

        this.createProjectForm = null;

    }
    removeFile(file){
        for(var i=0; i<this.newFile.length; i++)
        {
            if(this.newFile[i].org_filename == file.name)
            {
                var filename = this.newFile[i].filename
                this.projectRoute.all('remove-tmp').post({'filename':filename}).then((response)=>{
                    this.newFile = this.newFile.splice(i,1);
                });
            }
        }
    }

    trustAsHtml(value) {
        return this.$sce.trustAsHtml(value);
    };

    getLabels(){
        this.labelRoute.get('index').then((response) => {
            var result = response.plain().data;
            this.labels.list = result.map(function(item){ return {id: item.id, label: item.name};});
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
            this.contributors.list = result.map(function(item){ return {id: item.id, label: item.name};});
        })
    }
    createProject(isValid) {
        if (isValid && this.labels.sel.length) {
            this.newProject.labels = this.labels.sel;
            this.newProject.departments = this.departments.sel;
            this.newProject.contributors = this.contributors.sel;
            this.newProject.newfiles = this.newFile;
            this.projectRoute.all('store').post(this.newProject).then(() => {
                this.$state.go('app.projects');
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
