class DashboardController {
  constructor (API, $state, $stateParams, $timeout, $scope, $rootScope, $sce, $filter, ContextService) {
    'ngInject'
    this.projectRoute = API.all('projects')
    this.userRoute = API.all('users')
    this.$state = $state
    this.myProjects = []
    this.myContributedProjects = []
    this.userInfo = null
    this.feed = ''
    this.feed_list = []
    this.upvote = 0;
    let that = this

    ContextService.me(function (data) {
        if(data != null)
            that.userInfo = data
    })
  }

  getMyProject(){
      this.projectRoute.get('my-projects').then((response) => {
          this.myProjects = response.plain().data
      })
  }
  getMyContributedProject(){
      this.projectRoute.get('my-contributed-projects').then((response) => {
          this.myContributedProjects = response.plain().data
      })
  }
  detailView(project){
      this.$state.go('app.projects.view', {projectId: project.id})
  }

  postFeed(feed){
      if(feed == '')
        return;
      this.userRoute.all('feed').post({'feed':feed}).then((response) => {
          this.feed = ''
          this.getFeeds()
      })
  }

  getFeeds(){
      this.userRoute.get('feeds').then((response) => {
          this.feed_list = response.plain().data
      })
  }

  getUpvotes(){
      this.userRoute.get('upvote').then((response) => {
          this.upvote = response.plain().data
      })
  }
  $onInit () {
      this.getMyProject()
      this.getMyContributedProject()
      this.getFeeds()
      this.getUpvotes()
  }
}

export const DashboardComponent = {
  templateUrl: './views/app/components/dashboard/dashboard.component.html',
  controller: DashboardController,
  controllerAs: 'vm',
  bindings: {}
}
