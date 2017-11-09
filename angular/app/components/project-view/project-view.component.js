class ProjectViewController {
    constructor(API, $state, $stateParams, $timeout, $scope, $rootScope, $sce, $compile, $filter, Lightbox, ContextService) {
        'ngInject'
        let that = this

        this.projectId = parseInt($stateParams.projectId);
        this.$sce = $sce;
        this.$scope = $scope;

        this.userInfo = []
        ContextService.me(function(data){
            if(data != null)
                that.userInfo = data
        })

        this.$compile = $compile;
        this.$filter = $filter;
        this.$state = $state;
        this.$timeout = $timeout;
        this.service = ContextService;
        this.API = API;
        this.Lightbox = Lightbox;
        this.datapickerOption = { format: 'yyyy-mm-dd' }

        this.addTodoModal = angular.element('#addTodoModal');
        this.addTaskModal = angular.element('#addTaskModal');
        this.approveTaskModal = angular.element('#approveTaskModal');
        this.submitTaskModal = angular.element('#submitTaskModal');
        this.assignManagerModal = angular.element('#assignManagerModal');

        this.addTodolistForm = null
        this.addTaskForm = null
        this.approveTaskForm = null
        this.assignManagerForm = null
        this.formSubmitted = false
        this.formType = 'add';

        this.departments = {}
        this.departments.list = []
        this.departments.sel = null

        this.managers = {}
        this.managers.list = []
        this.managers.sel = null

        this.projectManagers = {}
        this.projectManagers.list = []
        this.projectManagers.sel = []
        this.projectManagers.setting = {
            smartButtonMaxItems: 4,
            smartButtonTextConverter: function(itemText, originalItem) { return itemText;}
        }

        this.progressDetail = []
        this.progressManagerList = []
        this.todos = {}

        this.newFile = [];

        this.newTodoList = {
            title: '',
            description: '',
            project_id: null,
            pm_id: null
        }

        this.newTask = {
           id: null,
           title: '',
           description: '',
           deadline: '',
           assign_type:0,
           todolist_id: null,
           project_id: this.projectId,
           contributor_id: null,
           department_id:null
        }

        this.newSubmitTask = {
           id: null,
           project_id: this.projectId,
           todo_list_id: null,
           title: '',
           description: '',
           newfiles: []
        }

        this.newApproveTask = {
           id: null,
           userinfo: [],
           is_approved : null,
           todolist_id: null,
           attachFiles: []
        }

        this.newProjectManager={
            id: null,
            project_id: this.projectId,
            project_managers :[]
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
        this.taskRoute = API.all('tasks');

        this.projectDetail = []
        this.images = [];
        this.dropzoneObj = null

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
                    this.newFile.splice(i,1);
                });
            }
        }

    }

    initDropzone(){
        this.dropzoneObj.removeAllFiles();
        this.newFile = [];
    }
    trustAsHtml(value) {
        return this.$sce.trustAsHtml(value);
    };
    openLightboxModal(index) {
        this.Lightbox.openModal(this.images, index);
    }

    setImageUrls(params) {
        this.images = [];
        for (var i = 0; i < params.length; i++) {
            this.images.push({
                'url': 'pro_imgs/' + this.projectId + '/' + params[i]['filename'],
                'thumbUrl': 'pro_imgs/' + this.projectId + '/' + params[i]['filename'],
                'caption': params[i]['org_filename']
            });
        }
    }
    toggleVote(){
        if(this.projectDetail['is_upvote'])
        {
            this.projectRoute.all('downvote').post({'project_id':this.projectId}).then((response) => {
                this.projectDetail['is_upvote'] = false;
                this.projectDetail.vote_count --;
            })
        }else{
            this.projectRoute.all('upvote').post({'project_id':this.projectId}).then((response) => {
                this.projectDetail['is_upvote'] = true;
                this.projectDetail.vote_count ++;
            })
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

    getProgress(){
        var param = { 'id': this.projectId }
        this.projectRoute.get('progress', param).then((response) => {
            var result = response.plain().data
            this.progressDetail = result;
        })
    }
    getProgressColor(value){
        var type = 'primary';
        if(value == 100)
            type = 'primary';
        else if(value > 75)
            type = 'success';
        else if(value > 30)
            type = 'warning';
        else
            type = 'danger';
        return type;
    }
    openAssignManagerModal(){
        this.showModal(this.assignManagerModal)
    }

    assignManager(isValid){
        if (this.projectManagers.sel.length != 0) {
            this.hideModal(5);
            this.newProjectManager.project_id = this.projectId;
            this.newProjectManager.project_managers = this.projectManagers.sel;
            this.projectRoute.all('update-project-managers').post(this.newProjectManager).then(() => {
                this.getProjectManagers();
            }).catch(this.addAssignManagerFail.bind(this))
        } else {
            this.formSubmitted = true
        }
    }

    addAssignManagerFail(){

    }
    addTodoListModal(){
         this.newTodoList = {
            title: '',
            description: '',
            project_id: null,
            pm_id: null
         }
         this.managers.sel = null;
         this.formType = 'add'
          this.showModal(this.addTodoModal)
    }

    addTodoList(isValid){
        if (isValid && this.managers.sel != null) {
            this.hideModal(1);
            this.newTodoList.project_id = this.projectId;
            this.newTodoList.pm_id = this.managers.sel.id;
            this.todosRoute.all('store').post(this.newTodoList).then(() => {
                this.getTodos()
            }).catch(this.addTodosFail.bind(this))
        } else {
            this.formSubmitted = true
        }
    }
    addTodosFail(){

    }

    deleteTodoList(param){
        let id = param;
        if (confirm('Are you sure?'))
        {
            this.todosRoute.one('todos', id).remove().then(() => {
                this.getTodos()
            })
        }
    }
    openTaskModal(todoId){
        this.newTask.id = null;
        this.newTask.title = '';
        this.newTask.description = '';
        this.newTask.deadline = '';
        this.newTask.assign_type = 0;
        this.newTask.todolist_id = todoId;
        this.newTask.contributor_id = null;
        this.managers.sel = null;
        this.newTask.department_id = null;
        this.departments.sel = null;
        this.formType = 'add'
        this.showModal(this.addTaskModal)
    }

    editTaskModal(item){
        this.newTask.id = item.id;
        this.newTask.title = item.title;
        this.newTask.description = item.description;
        this.newTask.deadline = item.deadline;
        this.newTask.assign_type = item.assign_type;
        this.newTask.todolist_id = item.todo_list_id;
        this.newTask.contributor_id = item.contributor_id;
        this.managers.sel = item.contributor;
        this.newTask.department_id = item.department_id;
        this.departments.sel = item.department
        this.formType = 'edit'
        this.showModal(this.addTaskModal)
    }

    openApproveTaskModal(item){
        this.newApproveTask.id = item.id;
        this.newApproveTask.title = item.submit_title;
        this.newApproveTask.description = item.submit_description;
        this.newApproveTask.todolist_id = item.todo_list_id;
        this.newApproveTask.userinfo = item.contributor;
        this.newApproveTask.attachFiles = [];

        for(var i=0; i<item.file.length; i++)
        {
            this.newApproveTask.attachFiles.push({
                'url': 'pro_imgs/' + this.projectId + '/' + item.file[i]['filename'],
                'thumbUrl': 'pro_imgs/' + this.projectId + '/' + item.file[i]['filename'],
                'caption': item.file[i]['org_filename']
            });
        }

        this.showModal(this.approveTaskModal)
    }

    openSubmitTaskModal(item){
        this.initDropzone()
        this.newSubmitTask.id = item.id
        this.newSubmitTask.todo_list_id = item.todo_list_id;
        this.newSubmitTask.title = item.submit_title;
        this.newSubmitTask.description = item.submit_description;
        this.showModal(this.submitTaskModal)
    }

    addTask(isValid){
        if (isValid && (this.managers.sel != null || this.departments.sel != null)) {
            this.hideModal(2);
            if(this.newTask.assign_type == 0)
                this.newTask.contributor_id = this.managers.sel.id;
            else if(this.newTask.assign_type == 1)
                this.newTask.department_id = this.departments.sel.id;
            this.taskRoute.all('store').post(this.newTask).then(() => {
                this.getTasks(this.newTask.todolist_id)
            }).catch(this.addTaskFail.bind(this))
        } else {
            this.formSubmitted = true
        }
    }
    addTaskFail(){

    }
    deleteTask(item){
        if (confirm('Are you sure?')){
            this.taskRoute.one('task', item.id).remove().then((response) => {
                this.getTasks(item.todo_list_id)
            })
        }
    }

    submitTask(isValid)
    {
        if (isValid) {
            this.hideModal(3);
            this.newSubmitTask.newfiles = this.newFile
            this.taskRoute.all('submit').post(this.newSubmitTask).then(() => {
                this.getTasks(this.newSubmitTask.todo_list_id)
            }).catch(this.addSubmitTaskFail.bind(this))
        } else {
            this.formSubmitted = true
        }
    }
    addSubmitTaskFail(){

    }

    approveTask(status)
    {
        this.hideModal(4);
        var param = {
            'id': this.newApproveTask.id,
            'is_approved': status
        }
        this.taskRoute.all('approve').post(param).then(() => {
            this.getProgress();
            this.getTasks(this.newApproveTask.todolist_id)
        }).catch(this.approveTaskFail.bind(this))
    }
    approveTaskFail(){

    }

    getTodos(){
        var param = { 'id': this.projectId }
        this.todosRoute.get('index',param).then((response) => {
            var result = response.plain().data;
            this.todos = result;
            this.getProgress()
        })
    }
    getTasks(id){
        var param = { 'id': id}
        this.taskRoute.get('list',param).then((response) => {
            var result = response.plain().data;
            var index = 0;
            for(var i=0; i<this.todos.length; i++)
            {
                if(this.todos[i].id == id)
                {
                    index = i;break;
                }
            }
            this.todos[index].tasks = result;
            console.log(result);
            this.getProgress();
        })
    }
    getDepartments(){
        this.departmentRoute.get('index').then((response) => {
            var result = response.plain().data;
            this.departments.list = result;
        })
    }
    getProjectManagers(){
        this.projectRoute.get('project-managers',{'id':this.projectId}).then((response) => {
            var result = response.plain().data;
            this.progressManagerList = result[0].manager;
            this.projectManagers.sel = this.progressManagerList.map(function(item){ return {id: item['id']};});
        })
    }
    getManagers(){
        this.userRoute.get('project-managers').then((response) => {
            var result = response.plain().data;
            this.managers.list = result;
            this.projectManagers.list = result.map(function(item){ return {id: item.id, label: item.name};});
        })
    }

    showModal(modalObj) {
        modalObj.modal('show')
    }
    hideModal(type) {
        if(type == 1)
          this.addTodoModal.modal('hide')
        else if(type == 2)
          this.addTaskModal.modal('hide')
        else if(type == 3)
          this.submitTaskModal.modal('hide')
        else if(type == 4)
          this.approveTaskModal.modal('hide')
        else if(type == 5)
          this.assignManagerModal.modal('hide')
    }

    refreshEnd(portlet) {
        this.$timeout(function() {
            angular.element(portlet).portlet({
                refresh: false
            });
        }, 1000);

    }

    viewProfile(user)
    {
        let $state = this.$state
        $state.go('app.user.other-profile',{userId:user.id})
    }

    init()
    {   this.getProjectDetail()
        this.getProjectManagers()
        this.getDepartments()
        this.getManagers()
        this.getTodos()
    }
    $onInit() {
        this.init()
    }
}

export const ProjectViewComponent = {
    templateUrl: './views/app/components/project-view/project-view.component.html',
    controller: ProjectViewController,
    controllerAs: 'vm',
    bindings: {}
}
