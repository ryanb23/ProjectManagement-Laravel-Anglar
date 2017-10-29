class UserProfileController {
    constructor(API, $scope, $state, ContextService, $anchorScroll) {
        'ngInject'

        let that = this

        console.log(this.userId)
        this.userInfo = null
        this.projects = []
        this.$state = $state
        this.ContextService = ContextService

        this.projectRoute = API.all('projects')
        this.userRoute = API.all('users')

        this.userActivities = [];
        this.imageTypeArr = [
            'image/gif',
            'image/png',
            'image/jpeg',
            'image/bmp',
            'image/webp'
        ]
    }

    detailView(project){
        this.$state.go('app.projects.view', {projectId: project.id})
    }

    viewProfile(user)
    {
        let $state = this.$state
        $state.go('app.user.other-profile',{userId:user.id})
    }

    editProfile(){
        this.$state.go('app.user.profile-edit')
    }

    getProjectList(){
        this.projectRoute.get('user-projects',{'id':this.userInfo.id}).then((response) => {
            this.projects = response.plain().data
        })
    }

    getUserActivities(){
        this.userRoute.get('user-activities',{'id':this.userInfo.id}).then((response) => {
            this.userActivities = response.plain().data
        })
    }

    getUserPoint(){
        this.userRoute.get('user-point',{'id':this.userInfo.id}).then((response) => {
            this.userInfo['point'] = response.plain().data;
        })
    }

    getImageUrl(project_id, filename){
        return 'pro_imgs/' + project_id+ '/' + filename
    }

    $onInit() {
        let that = this
        this.ContextService.me(function(data){
            if(data != null)
            {
                that.userInfo = data
                that.getProjectList();
                that.getUserActivities();
                that.getUserPoint();
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
