class UserPasswordEditController {
    constructor(API, $scope, $state, ContextService) {
        'ngInject'

        this.$state = $state
        this.passwordInfo = {
            'current_password': '',
            'password': '',
            'password_confirmation': ''
        }
        this.passwordUpdateForm = []
        this.userRoute = API.all('users');
        this.errors = []
        this.passwordUpdateForm  = null;
    }

    updatePassword(isValid)
    {
        if (isValid) {

            console.log(this.passwordInfo)

            this.userRoute.all('update-password').post(this.passwordInfo).then(() => {
                this.$state.go('app.user.profile')
            }).catch(this.failedUpdatePassword.bind(this))
        } else {
            this.formSubmitted = true
        }
    }

    failedUpdatePassword(response){
        if (response.status === 400) {
            this.errors['current_password'] = 'Password is incorrect'
            this.passwordUpdateForm['current_password'].$invalid = true
        }
    }

    backToprofile(){
        this.$state.go('app.user.profile');
    }

    $onInit() {

    }
}

export const UserPasswordEditComponent = {
    templateUrl: './views/app/components/user-password-edit/user-password-edit.component.html',
    controller: UserPasswordEditController,
    controllerAs: 'vm',
    bindings: {}
}
