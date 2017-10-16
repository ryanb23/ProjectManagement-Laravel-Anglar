class QuickViewController {
  constructor (API, $state, $stateParams, $timeout, $scope, $rootScope, $sce, $filter, ContextService) {
    'ngInject'

    let that = this
    this.API = API
    this.$scope = $scope
    this.$rootScope = $rootScope
    this.ContextService = ContextService

    this.userRoute = API.all('users');
    this.notificationRoute = API.all('notifications');

    this.message = ''
    this.openChanelId = null
    this.unreadMessage = {};

    this.userRoute.get('all-chat-user').then((response) => {
        this.chatUsers = response.plain().data
    })

    ContextService.me(function(data){
        if(data != null)
        {
            that.userInfo = data
            //Subscribe to the channel we specified in our Laravel Event
            console.log('chat-channel-' + data.id)
            let channel = pusher.subscribe('chat-channel-' + data.id)
            //Bind a function to a Event (the full Laravel class)
            channel.bind('App\\Events\\MessagePostEvent', function(messageData) {
                if (messageData.user.id == that.openChanelId) {
                    that.addMessage(messageData)
                }else{
                    that.$rootScope.$emit("MessageUpdate",{messageData})
                    let from_id = messageData.user.id
                    if(typeof that.unreadMessage[from_id] == 'undefined'){
                        that.unreadMessage[from_id] = 1
                    }
                    else {
                        that.unreadMessage[from_id] ++
                    }
                }
                $scope.$apply()
            })
        }
    })
  }

  addMessage(message) {
      this.messageList.push(message)
  }
  openChanel(userInfo) {
      this.openChanelId = userInfo.id
      this.API.one('message', 'message-with').get({
          with_id: this.openChanelId
      }).then((response) => {
          this.messageList = response.plain().data
          if(this.unreadMessage[userInfo.id])
          {
            this.unreadMessage[userInfo.id] = 0;
            this.$rootScope.$emit("MessageUpdate",this.unreadMessage[userInfo.id])
          }
      })
  }
  leftChannel(){
      this.openChanelId = null;
  }

  sendMessage(message) {
      if (message == '')
          return
      this.message = ''
      let newMessage = {
          to_id: this.openChanelId,
          message: message
      }

      this.API.all('message/create').post(newMessage).then((response) => {
          this.addMessage({
              message: message,
              to_id: this.openChanelId,
              user: this.userInfo
          })
      })
  }

  getChatNotificationList(){
      this.notificationRoute.get('chat-notification-list').then((response) => {
          this.unreadMessage = response.plain().data
      })
  }
  $onInit () {
      this.getChatNotificationList()
  }
}

export const QuickViewComponent = {
  templateUrl: './views/app/components/quick-view/quick-view.component.html',
  controller: QuickViewController,
  controllerAs: 'vm',
  bindings: {}
}
