class ContactsController {
  constructor ($scope) {
    'ngInject'

  }
}

export const ContactsComponent = {
  templateUrl: './views/app/components/contacts/contacts.component.html',
  controller: ContactsController,
  controllerAs: 'vmc',
  bindings: {}
}
