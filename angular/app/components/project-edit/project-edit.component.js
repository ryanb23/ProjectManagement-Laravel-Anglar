class ProjectEditController {
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

        this.projectId = parseInt($stateParams.projectId);

        this.errors = []
        this.newFile = [];
        this.currentFile = [];
        this.editProject = {
            id: null,
            title: '',
            labels: [],
            departments: [],
            objective: '',
            contributors: [],
            newfiles: {},
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
        this.departments.sel = null;

        this.contributors = {}
        this.contributors.list = []
        this.contributors.sel = []
        this.contributors.setting = {
            smartButtonMaxItems: 4,
            smartButtonTextConverter: function(itemText, originalItem) { return itemText;}
        }

        this.projectDetail = null;
        console.log(this.projectDetail);

        that.dropzoneObj = null;

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

        this.editProjectForm = null;
        this.imageTypeArr = [
            'image/gif',
            'image/png',
            'image/jpeg',
            'image/bmp',
            'image/webp'
        ]

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

    removeCurrentFile(file){
        var index = this.currentFile.findIndex(function(item){ return item.id == file.id});
        this.currentFile.splice(index,1);
    }
    trustAsHtml(value) {
        return this.$sce.trustAsHtml(value);
    };

    setImageUrls(params) {
        for (var i = 0; i < params.length; i++) {
            this.currentFile.push({
                'id': params[i]['id'],
                'url': 'pro_imgs/' + this.projectId + '/' + params[i]['filename'],
                'thumbUrl': 'pro_imgs/' + this.projectId + '/' + params[i]['filename'],
                'caption': params[i]['org_filename'],
                'filetype': params[i]['filetype'],
            });
        }
        console.log(this.currentFile)
    }

    getProject(){
        var param = { 'id': this.projectId }
        this.projectRoute.get('project', param).then((response) => {
            var result = response.plain().data
            this.projectDetail = result;
            this.editProject.id = this.projectDetail.id;
            this.editProject.title = this.projectDetail.title;
            this.labels.sel = this.projectDetail.label.map(function(item){ return {id: item.id}});
            this.departments.sel = this.departments.list.find(function(item){ return item.id == result.department_id});
            this.editProject.objective = this.projectDetail.objective;
            this.contributors.sel = this.projectDetail.contributor.map(function(item){ return {id: item.id}});
            this.editProject.description = this.projectDetail.description;
            this.setImageUrls(this.projectDetail.file);
            console.log(this.projectDetail)
        })
    }
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
            this.editProject.labels = this.labels.sel;
            this.editProject.departments = this.departments.sel;
            this.editProject.contributors = this.contributors.sel;
            this.editProject.newfiles = {
                newFiles: this.newFile,
                oldFiles: this.currentFile
            }
            this.projectRoute.all('update').post(this.editProject).then(() => {
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
        this.getProject();
    }
}

export const ProjectEditComponent = {
    templateUrl: './views/app/components/project-edit/project-edit.component.html',
    controller: ProjectEditController,
    controllerAs: 'vm',
    bindings: {}
}
