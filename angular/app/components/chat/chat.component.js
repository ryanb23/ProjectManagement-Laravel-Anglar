class ChatController {
  constructor ($scope) {
    'ngInject'
    $scope.test = 'test';
  }
}

export const ChatComponent = {
  templateUrl: './views/app/components/chat/chat.component.html',
  controller: ChatController,
  controllerAs: 'vm',
  bindings: {}
}
