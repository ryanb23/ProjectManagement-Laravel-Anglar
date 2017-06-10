class QuickSearchController {
  constructor (API, ContextService) {
    'ngInject'
  }
  liveSearch(){
    console.log("Live search for: " + $scope.search.query);
  }
  $onInit () {}
}

export const QuickSearchComponent = {
  templateUrl: './views/app/components/quick-search/quick-search.component.html',
  controller: QuickSearchController,
  controllerAs: 'vm',
  bindings: {}
}
