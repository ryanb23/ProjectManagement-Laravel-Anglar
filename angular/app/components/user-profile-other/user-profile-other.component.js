class UserProfileOtherController {
    constructor(API, $scope, $state, $stateParams, ContextService, $anchorScroll) {
        'ngInject'

        let that = this
        this.userId = parseInt($stateParams.userId)

        this.userInfo = null
        this.projects = []
        this.$state = $state
        this.ContextService = ContextService

        this.projectRoute = API.all('projects')
        this.userRoute = API.all('users')
        this.isFavorite = false;
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

    getProjectList(){
        this.projectRoute.get('user-projects',{'id':this.userInfo.id}).then((response) => {
            this.projects = response.plain().data
        })
    }

    getUserPoint(){
        this.userRoute.get('user-point',{'id':this.userInfo.id}).then((response) => {
            this.userInfo['point'] = response.plain().data;
        })
    }

    getUserActivities(){
        this.userRoute.get('user-activities',{'id':this.userInfo.id}).then((response) => {
            this.userActivities = response.plain().data
        })
    }

    getImageUrl(project_id, filename){
        return 'pro_imgs/' + project_id+ '/' + filename
    }

    toggleProfileLike(){
        this.userRoute.all('user-like').post({'id':this.userInfo.id}).then((response) => {
            this.userInfo['is_favorite'] = response.plain().data;
        })
    }

    $onInit() {
        this.userRoute.get('show',{'id':this.userId}).then((response) => {
            this.userInfo = response.plain().data
            this.getProjectList();
            this.getUserActivities();
            this.getUserPoint();
        })
    }

}

export const UserProfileOtherComponent = {
    templateUrl: './views/app/components/user-profile-other/user-profile-other.component.html',
    controller: UserProfileOtherController,
    controllerAs: 'vm',
    bindings: {}
}
