class UserProfileController {
    constructor(API, $scope, $state, ContextService, $anchorScroll) {
        'ngInject'

        let that = this
        this.userInfo = null
        this.projects = []
        this.$state = $state

        this.projectRoute = API.all('projects')

        ContextService.me(function(data){
            if(data != null)
            {
                that.userInfo = data
                that.getProjectList();
            }
        })
    }

    detailView(project){
        this.$state.go('app.projects.view', {projectId: project.id})
    }

    getProjectList(){
        this.projectRoute.get('user-projects',{'id':this.userInfo.id}).then((response) => {
            this.projects = response.plain().data
        })
    }

    $onInit() {

    }
}

export const UserProfileComponent = {
    templateUrl: './views/app/components/user-profile/user-profile.component.html',
    controller: UserProfileController,
    controllerAs: 'vm',
    bindings: {}
}
