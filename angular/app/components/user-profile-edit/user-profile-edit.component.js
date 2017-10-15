class UserProfileEditController {
    constructor(API, $state, $scope, $rootScope, ContextService, $sce) {
        'ngInject'

        let that = this
        this.API = API
        this.$scope = $scope
        this.$rootScope = $rootScope
        this.$sce = $sce
        this.$state = $state
        this.ContextService = ContextService
        this.userInfo = [];
        this.passwordInfo = [];
        this.newUserInfo = [];

        this.userRoute = API.all('users');

        this.profileModal = $('#profileImgModal')
        this.$scope.uploadedImage='';
        this.$scope.userProfileImg='';

        this.department_sel = [];
        this.departments = [];

        this.handleFileSelect=function(evt) {
          var file=evt.currentTarget.files[0];
          var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.uploadedImage=evt.target.result;
            });
          };
          reader.readAsDataURL(file);
        };
    }

    trustAsHtml(value) {
        return this.$sce.trustAsHtml(value);
    }

    openFileSelector(){
        angular.element(document.querySelector('#fileInput')).click()
    }

    saveAvatar(avatar){
        let $state = this.$state
        let that = this
        this.userRoute.all('update-avatar').post({'data':avatar}).then((response) => {
            that.ContextService.getContext()
              .then((response) => {
                response = response.plain()
                that.$rootScope.me = response.data
              })
            $state.go($state.current)
        });
        this.hideModal()
    }

    editProfile(isValid){
        let $state = this.$state
        let that = this
        if (isValid && this.department_sel.length) {

            this.newUserInfo = {
                'name': this.userInfo['name'],
                'firstname': this.userInfo['firstname'],
                'lastname': this.userInfo['lastname'],
                'about_me': this.userInfo['about_me'],
                'email': this.userInfo['email'],
                'department': this.department_sel
            };

            this.userRoute.all('update-me').post(this.newUserInfo).then((response) => {
                that.ContextService.getContext()
                  .then((response) => {
                    response = response.plain()
                    that.$rootScope.me = response.data
                  })
                $state.go('app.user.profile')
            })
        } else {
            this.formSubmitted = true
        }
    }

    editProfileFail(response){

    }

    setUserDepartment(){
        let userDepArr = []
        this.department_sel = []
        for(var i=0; i<this.userInfo.departments.length; i++)
            userDepArr.push(this.userInfo.departments[i].id);

        for(var i=0; i<this.departments.length; i++ )
        {
            let tmp_id = this.departments[i].id;

            if(userDepArr.indexOf(tmp_id) >= 0)
                this.department_sel.push(this.departments[i]);
        }
    }
    getDepartment() {
        this.API.all('departments').get('index').then((response) => {
            var dep_list = response.plain().data
            this.departments = dep_list;
            this.setUserDepartment();
        })
    }
    // Modal Functions
    showModal() {
        this.profileModal.modal('show')
    }
    hideModal() {
        this.profileModal.modal('hide');
    }

    backToprofile(){
        this.$state.go('app.user.profile');
    }
    $onInit() {
        angular.element(document.querySelector('#fileInput')).on('change',this.handleFileSelect);
        let that = this
        this.ContextService.me(function(data){
            if(data != null)
            {
                that.userInfo = that.API.copy(data)
                that.getDepartment();
            }
        })
    }
}

export const UserProfileEditComponent = {
    templateUrl: './views/app/components/user-profile-edit/user-profile-edit.component.html',
    controller: UserProfileEditController,
    controllerAs: 'vm',
    bindings: {}
}
