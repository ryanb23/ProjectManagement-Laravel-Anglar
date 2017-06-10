class NavHeaderController {
  constructor ($rootScope, ContextService) {
    'ngInject'

    let navHeader = this
    this.$rootscope = $rootScope;
    ContextService.me(function (data) {
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
