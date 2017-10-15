class ProjectCommentController {
    constructor(API, $scope, $state, $rootScope,  $stateParams, AclService, ContextService, $anchorScroll) {
        'ngInject'
        let that = this
        this.API = API
        this.ContextService = ContextService
        this.$state = $state

        this.projectId = parseInt($stateParams.projectId)
        this.commentList  = [];
        this.comment = ''
        this.projectRoute = API.all('projects');

        this.pagination ={
            'lastID'  : null,
            'count' : 10,
            'busy'  : true,
            'end'   : false
        }

        this.ContextService.me(function(data){
            if(data != null)
            {
                that.userInfo = data
                //Subscribe to this.projectId channel we specified in our Laravel Event
                console.log('project-channel-' + that.projectId)
                let channel = pusher.subscribe('project-channel-' + that.projectId)
                //Bind a function to a Event (the full Laravel class)
                channel.bind('App\\Events\\CommentPostEvent', function(commentData) {
                    if (commentData.project_id == that.projectId && commentData.user.id != that.userInfo.id) {
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

    viewProfile(user)
    {
        let $state = this.$state
        $state.go('app.user.other-profile',{userId:user.id})
    }

    $onInit() {
        console.log(this.commentCount)
        this.getCommentList();
    }
    getCommentList(){

        this.pagination ={
            'lastID'  : null,
            'count' : 10,
            'busy'  : true,
            'end'   : false
        }
        this.commentList = [];
        this.loadCommments();
    }
    loadCommments(){
        let param = {
            'id' : this.projectId,
            'pagination' : this.pagination
        }

        if(!this.pagination['end'])
          this.pagination['busy'] = true;

        this.projectRoute.get('comment-list',param).then((response) => {
            let result = response.plain().data;
            if(result.length)
            {
                this.commentList = this.commentList.concat(result);
                this.pagination['lastID'] = result[result.length - 1]['id'];
            }else{
                this.pagination['end'] = true;
            }
            this.pagination['busy'] = false;
        })

    }
    addComment(comment) {
        this.commentList.unshift(comment);
        this.commentcount++;
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
    bindings: {
        commentcount: '<'
    }
}
