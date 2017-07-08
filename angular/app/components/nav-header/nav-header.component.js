class NavHeaderController {
  constructor ($rootScope, $scope, ContextService) {
    'ngInject'

    let navHeader = this
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.unreadMessage = [];
    this.unreadMessageTotal = 0;

    this.notificationRoute = API.all('users');

    function  updateUnreadMessage(event, args) {
        navHeader.unreadMessageTotal ++;
        navHeader.$scope.$apply()
    }

    this.$rootScope.$on("newNotification", updateUnreadMessage);
    var eventFunc = {
        updateUnreadMessage: updateUnreadMessage
    }

    angular.extend(navHeader, eventFunc);

    ContextService.me(function (data) {
        if(data != null)
            navHeader.userData = data
    })
  }

  showSearchOverlay(){
    this.$rootscope.$broadcast('toggleSearchOverlay', {
        show: true
    })
  }
  $onInit () {}
}

export const NavHeaderComponent = {
  templateUrl: './views/app/components/nav-header/nav-header.component.html',
  controller: NavHeaderController,
  controllerAs: 'vm',
  bindings: {}
}
