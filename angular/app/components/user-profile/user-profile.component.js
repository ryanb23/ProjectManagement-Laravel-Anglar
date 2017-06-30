class UserProfileController {
    constructor(API, $scope, $state, ContextService, $anchorScroll) {
        'ngInject'

        let that = this
        this.userInfo = null
        this.projects = []
        this.$state = $state
        this.ContextService = ContextService

        this.projectRoute = API.all('projects')
    }

    detailView(project){
        this.$state.go('app.projects.view', {projectId: project.id})
    }

    editProfile(){
        this.$state.go('app.user.profile-edit')
    }

    getProjectList(){
        this.projectRoute.get('user-projects',{'id':this.userInfo.id}).then((response) => {
            this.projects = response.plain().data
        })
    }

    $onInit() {
        let that = this
        this.ContextService.me(function(data){
            if(data != null)
            {
                that.userInfo = data
                that.getProjectList();
            }
        })
    }
}

export const UserProfileComponent = {
    templateUrl: './views/app/components/user-profile/user-profile.component.html',
    controller: UserProfileController,
    controllerAs: 'vm',
    bindings: {}
}
