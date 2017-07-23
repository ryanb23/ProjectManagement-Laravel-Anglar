class DashboardController {
  constructor (API, $state, $stateParams, $timeout, $scope, $rootScope, $sce, $filter, ContextService) {
    'ngInject'
    this.projectRoute = API.all('projects')
    this.$state = $state
    this.myProjects = []
    this.myContributedProjects = []
    this.userInfo = null
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
  $onInit () {
      this.getMyProject()
      this.getMyContributedProject()
  }
}

export const DashboardComponent = {
  templateUrl: './views/app/components/dashboard/dashboard.component.html',
  controller: DashboardController,
  controllerAs: 'vm',
  bindings: {}
}
