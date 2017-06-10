class QuickViewController {
  constructor (API, ContextService) {
    'ngInject'
  }
  $onInit () {}
}

export const QuickViewComponent = {
  templateUrl: './views/app/components/quick-view/quick-view.component.html',
  controller: QuickViewController,
  controllerAs: 'vm',
  bindings: {}
}
