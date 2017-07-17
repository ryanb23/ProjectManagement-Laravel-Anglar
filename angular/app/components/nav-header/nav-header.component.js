class NavHeaderController {
  constructor ($rootScope, $scope, ContextService, API) {
    'ngInject'

    let navHeader = this
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.notificationTotal = 0;

    this.notificationRoute = API.all('notifications');

    function  updateNotification(event, args) {
        navHeader.notificationTotal ++;
        navHeader.$scope.$apply()
    }

    this.$rootScope.$on("newNotification", updateNotification);
    var eventFunc = {
        updateNotification: updateNotification
    }

    angular.extend(navHeader, eventFunc);

    ContextService.me(function (data) {
        if(data != null)
            navHeader.userData = data
    })
  }
  updateNotificationNumber(){
      this.notificationRoute.get('all-number').then((response)=>{
          this.notificationTotal = response.plain().data
      })
  }
  showSearchOverlay(){
    this.$rootscope.$broadcast('toggleSearchOverlay', {
        show: true
    })
  }
  $onInit () {
      this.updateNotificationNumber()
  }
}

export const NavHeaderComponent = {
  templateUrl: './views/app/components/nav-header/nav-header.component.html',
  controller: NavHeaderController,
  controllerAs: 'vm',
  bindings: {}
}
