class ContactsController {
  constructor ($scope) {
    'ngInject'
    $scope.test = 'test';
  }
}

export const ContactsComponent = {
  templateUrl: './views/app/components/contacts/contacts.component.html',
  controller: ContactsController,
  controllerAs: 'vm',
  bindings: {}
}
