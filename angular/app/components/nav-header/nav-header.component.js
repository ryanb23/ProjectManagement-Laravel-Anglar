class NavHeaderController {
  constructor ($rootScope, $state, $scope, AclService, ContextService, API) {
    'ngInject'

    let navHeader = this
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.chatNotificationTotal = 0;
    this.notificaitonList = [];

    this.notificationRoute = API.all('notifications');

    function  updateChatNotification(event, args) {
        navHeader.updateNotificationNumber()
    }

    this.$rootScope.$on("MessageUpdate", updateChatNotification);

    var eventFunc = {
        updateChatNotification: updateChatNotification
    }

    angular.extend(navHeader, eventFunc);

    this.can = AclService.can
    this.hasAnyRole = AclService.hasAnyRole
    ContextService.me(function (data) {
        navHeader.userData = data
        if(data != null)
        {
            navHeader.userInfo = data
            //Subscribe to notification channel we specified in our Laravel Event
            let channel = pusher.subscribe('notification-channel')
            //Bind a function to a Event (the full Laravel class)
            channel.bind('App\\Events\\NotificationEvent', function(notification) {
                navHeader.addNotificaiton(notification);
                $scope.$apply()
            })
        }
    })
  }

  addNotificaiton(notification){
      let user_id = this.userInfo['id'];
      let to_ids = notification['to_ids'];
      let is_new = !this.notificaitonList.find(function(item){
          return item['type'] == notification['data']['type'] && item['resource_id'] == notification['data']['resource_id']
      })
      if(to_ids.indexOf(user_id) > -1 && is_new)
      {
          let data = notification['data'];
          this.notificaitonList.unshift(data);
      }
  }

  redirectNotifciation(data){
      this.notificationRoute.all('update-notifications').post(data).then((response)=>{
          this.notificaitonList = response.plain().data;
          this.$state.go('app.projects.view', {projectId: data['resource_id']});
      })
  }

  getNotifications()
  {
      this.notificationRoute.get('notifications').then((response)=>{
          this.notificaitonList = response.plain().data
      })
  }
  updateNotificationNumber(){
      this.notificationRoute.get('all-number').then((response)=>{
          this.chatNotificationTotal = response.plain().data
      })
  }

  readAllNotification(){
      this.notificationRoute.all('read-all').post().then((response)=>{
          this.notificaitonList = []
      })
  }

  showSearchOverlay(){
    this.$rootscope.$broadcast('toggleSearchOverlay', {
        show: true
    })
  }

  $onInit () {
    this.notificaitonList = [];
    this.getNotifications();
    this.updateNotificationNumber();
  }
}

export const NavHeaderComponent = {
  templateUrl: './views/app/components/nav-header/nav-header.component.html',
  controller: NavHeaderController,
  controllerAs: 'vm',
  bindings: {}
}
