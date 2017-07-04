class ProjectCommentController {
    constructor(API, $scope, $rootScope,  $stateParams, AclService, ContextService, $anchorScroll) {
        'ngInject'
        let that = this
        this.API = API
        this.ContextService = ContextService

        this.projectId = parseInt($stateParams.projectId)
        this.commentList  = []
        this.comment = ''
        this.projectRoute = API.all('projects');

        this.ContextService.me(function(data){
            if(data != null)
            {
                that.userInfo = data
                //Subscribe to this.projectId channel we specified in our Laravel Event
                console.log('project-channel-' + that.projectId)
                let channel = pusher.subscribe('project-channel-' + that.projectId)
                //Bind a function to a Event (the full Laravel class)
                channel.bind('App\\Events\\CommentPostEvent', function(commentData) {
                    console.log(1)
                    if (commentData.project_id == that.projectId && commentData.user.id != that.userInfo.id) {
                        console.log(2)
                        that.addComment({
                            comment: commentData.comment,
                            project_id: commentData.project_id,
                            user: commentData.user,
                            created_at : commentData.created_at.date
                        })
                        $scope.$apply()
                    }
                })
            }
        })
    }

    $onInit() {
        this.getCommentList();
    }
    getCommentList(){
        this.projectRoute.get('comment-list',{'id':this.projectId}).then((response) => {
            this.commentList = response.plain().data
        })
    }
    addComment(comment) {
        this.commentList.push(comment)
    }

    postComment(comment) {
        if (comment == '')
            return
        this.comment = ''
        let newComment = {
            project_id: this.projectId,
            comment: comment
        }

        this.addComment({
            comment: comment,
            project_id: this.projectId,
            user: this.userInfo,
            created_at : new Date().getTime()
        })
        this.projectRoute.all('comment').post(newComment).then(() => {

        })
    }
}

export const ProjectCommentComponent = {
    templateUrl: './views/app/components/project-comment/project-comment.component.html',
    controller: ProjectCommentController,
    controllerAs: 'vm',
    bindings: {}
}
