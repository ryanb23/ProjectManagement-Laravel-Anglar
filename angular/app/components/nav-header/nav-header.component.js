class NavHeaderController {
  constructor ($rootScope, $state, $scope, ContextService, API) {
    'ngInject'

    let navHeader = this
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.chatNotificationTotal = 0;
    this.notificaitonList = [];

    this.notificationRoute = API.all('notifications');

    function  updateChatNotification(event, args) {
        navHeader.chatNotificationTotal ++;
        navHeader.$scope.$apply()
    }

    function  readChatNotification(event, args) {
        navHeader.chatNotificationTotal -= args;
    }

    this.$rootScope.$on("MessageEmit", updateChatNotification);
    this.$rootScope.$on("MessageRead", readChatNotification);

    var eventFunc = {
        updateChatNotification: updateChatNotification,
        readChatNotification: readChatNotification,
    }

    angular.extend(navHeader, eventFunc);

    ContextService.me(function (data) {
        console.log('n-cha')
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
      if(to_ids.indexOf(user_id) > -1)
      {
          let data = notification['data'];
          this.notificaitonList.push(data);
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
